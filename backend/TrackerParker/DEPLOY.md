# Despliegue de TrackerParker

La API se empaqueta como ZIP: un JAR ejecutable de Spring Boot y `run.sh`. El runtime administrado `java21` ejecuta el script como handler; el Lambda Web Adapter layer intercepta el runtime mediante `AWS_LAMBDA_EXEC_WRAPPER=/opt/bootstrap` y expone el servidor HTTP de Spring en el puerto 8080. No hay handler ni dependencia de Lambda en el código Java.

## 1. Prerrequisitos locales

- Java 21, Maven Wrapper y AWS SAM CLI.
- AWS CLI autenticado en `us-east-1`.
- Un dominio ya gestionado en Namecheap.

El wrapper Maven debe ser ejecutable si el sistema lo exige:

```sh
chmod +x mvnw
```

## 2. Neon y `DATABASE_URL`

1. Cree un proyecto PostgreSQL en Neon con el plan gratuito.
2. En **Connect**, copie el connection string del endpoint **pooled** (PgBouncer). Normalmente tiene la forma `postgresql://usuario:contraseña@ep-…-pooler…/neondb?sslmode=require`.
3. Guárdelo sin cambiarlo. La aplicación acepta `postgresql://…`, `postgres://…` y `jdbc:postgresql://…`; al recibir la URI de Neon la transforma internamente a JDBC y extrae usuario y contraseña.
4. Páselo al despliegue como el parámetro SAM `DatabaseUrl`. Es `NoEcho`, por lo que CloudFormation no lo muestra en sus eventos ni outputs. Las referencias dinámicas `ssm-secure` no son compatibles con variables de entorno de Lambda; esta es la alternativa segura y soportada sin añadir permisos SSM al rol de ejecución.

Use el endpoint pooled en Lambda. Neon puede detenerse tras inactividad: la primera consulta posterior puede tardar aproximadamente 0.5–2 s mientras despierta y abre una conexión nueva. Hikari usa una sola conexión, no mantiene keepalives y valida al prestar una conexión; una conexión obsoleta se reemplaza en ese momento.

La dependencia `org.crac` activa el soporte de checkpoint/restore de Spring Boot 3.4. Con `spring.datasource.hikari.allow-pool-suspension=true`, el ciclo de vida nativo `HikariCheckpointRestoreLifecycle` suspende el pool, evacúa sus conexiones antes de SnapStart y lo reanuda tras restaurar. No se congela una conexión TCP de Neon dentro del snapshot.

Flyway usa conexiones JDBC efímeras separadas del pool Hikari de una sola conexión, porque durante el arranque puede consultar metadatos y ejecutar la migración a la vez. Si el PgBouncer pooled de Neon está configurado en modo `transaction` y Flyway presenta un problema, ejecute las migraciones una vez contra el endpoint **directo** antes de desplegar, y conserve el endpoint pooled para la Lambda. No ejecute la aplicación contra ambos endpoints de forma concurrente.

Para mover los pocos datos de desarrollo, use `pgloader` o un dump transformado manualmente. Tras insertar IDs explícitos en PostgreSQL, ajuste las secuencias con `setval` antes de escribir nuevos registros. No hay script automático de migración de datos.

## 3. Certificado y DNS de Namecheap

CloudFront exige un certificado ACM emitido en `us-east-1`. Solicítelo antes del stack:

```sh
make request-certificate API_DOMAIN_NAME=api.midominio.com
```

Con el ARN devuelto, obtenga el CNAME de validación:

```sh
aws acm describe-certificate --region us-east-1 --certificate-arn "$CERTIFICATE_ARN" \
  --query 'Certificate.DomainValidationOptions[0].ResourceRecord' --output table
```

En Namecheap cree ese CNAME de validación y espere que ACM muestre **Issued**. Luego del despliegue cree el CNAME `api` hacia el output `CloudFrontDomainName` (`d…cloudfront.net`). No cree un CNAME directo hacia la Function URL: no sirve el certificado del dominio propio y evita CloudFront.

El ARN de certificado es un parámetro del stack porque CloudFormation no puede exponer de forma útil el CNAME de una validación DNS externa mientras espera que se emita. El comando anterior es el output operativo de validación.

## 4. Desplegar

Genere un secreto aleatorio de al menos 32 caracteres y no lo guarde en el repositorio. Ejemplo:

```sh
ORIGIN_SECRET=$(openssl rand -hex 32)
make deploy STACK_NAME=trackerparker-live SAM_PARAMETER_OVERRIDES="\
Project=TrackerParker \
Environment=live \
ApiDomainName=api.midominio.com \
CertificateArn=$CERTIFICATE_ARN \
AllowedOrigins=https://app.midominio.com \
    DatabaseUrl='postgresql://…' \
OriginSecret=$ORIGIN_SECRET"
```

Cada `make deploy` empaqueta un JAR nuevo, publica una versión, actualiza el alias `live` y crea un snapshot nuevo de SnapStart. El primer arranque durante la publicación paga la inicialización; las restauraciones posteriores usan el snapshot.

`JAVA_TOOL_OPTIONS=-XX:+TieredCompilation -XX:TieredStopAtLevel=1` no está fijado en la plantilla: puede mejorar el init previo al snapshot, pero debe compararse con y sin esa variable en esta aplicación antes de conservarlo. Registre ambos resultados con una versión recién publicada; no modifique otras variables entre mediciones.

Rote `DATABASE_URL` redesplegando con un valor nuevo de `DatabaseUrl`. Rote `ORIGIN_SECRET` redesplegando con un valor nuevo; CloudFront y Lambda se actualizan juntos.

## 5. Verificación y latencia

```sh
make smoke FUNCTION_URL='https://…lambda-url…on.aws' CLOUDFRONT_URL='https://api.midominio.com'
make db-smoke CLOUDFRONT_URL='https://api.midominio.com'
make latency CLOUDFRONT_URL='https://api.midominio.com'
```

`/health` no consulta PostgreSQL y queda sin filtro para la readiness local del adapter. Las rutas de negocio requieren el header privado que sólo CloudFront inyecta. No publique ese secreto. Para medir, registre: primera llamada tras desplegar (SnapStart), primera llamada después de una pausa prolongada (SnapStart + Neon resume) y una llamada caliente. Objetivo orientativo: 1–2 s de restore, más 0.5–2 s cuando Neon deba reanudarse.

## Costos y plan CloudFront

La plantilla usa los límites solicitados: Lambda de 1024 MB, timeout de 30 s, SnapStart, sin VPC, sin concurrencia reservada, sin provisioned concurrency, SSM Standard y logs por 14 días. En bajo uso, Lambda (1 M invocaciones y 400,000 GB-s/mes), SnapStart Java y Neon free pueden permanecer en $0.

La suscripción al plan **CloudFront Free** no se expresa en CloudFormation: seleccione el plan Free en la consola CloudFront después de crear la distribución. La plantilla crea y asocia una Web ACL mínima porque el plan la exige. Actualmente el plan incluye 1 M requests y 100 GB/mes, pero no está disponible para cuentas que aún estén en AWS Free Tier. Si la cuenta no cumple esos requisitos, la distribución y la Web ACL quedarán en precio por uso; confirme esta condición antes de considerar el total garantizado como $0/mes.
