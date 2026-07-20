package dev.javiermeza.TrackerParker.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.Ordered;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * Normalizes Neon URLs (postgresql://user:password@host/database) before any
 * datasource, Flyway, or test context is configured.
 */
public class DatabaseUrlEnvironmentPostProcessor implements EnvironmentPostProcessor, Ordered {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        Map<String, Object> properties = normalize(environment.getProperty("DATABASE_URL"));
        if (!properties.isEmpty()) {
            environment.getPropertySources().addFirst(new MapPropertySource("normalizedDatabaseUrl", properties));
        }
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }

    private Map<String, Object> normalize(String databaseUrl) {
        if (databaseUrl == null || databaseUrl.isBlank() || databaseUrl.startsWith("jdbc:")) {
            return Map.of();
        }

        URI uri = URI.create(databaseUrl);
        if (!"postgres".equals(uri.getScheme()) && !"postgresql".equals(uri.getScheme())) {
            throw new IllegalArgumentException("DATABASE_URL must use postgresql://, postgres://, or jdbc:postgresql://");
        }
        if (uri.getHost() == null || uri.getRawPath() == null || uri.getRawPath().isBlank()) {
            throw new IllegalArgumentException("DATABASE_URL must include a PostgreSQL host and database name");
        }

        Map<String, Object> properties = new HashMap<>();
        String host = uri.getHost().contains(":") ? "[" + uri.getHost() + "]" : uri.getHost();
        String port = uri.getPort() == -1 ? "" : ":" + uri.getPort();
        String query = uri.getRawQuery() == null ? "" : "?" + uri.getRawQuery();
        properties.put("spring.datasource.url", "jdbc:postgresql://" + host + port + uri.getRawPath() + query);

        String userInfo = uri.getRawUserInfo();
        if (userInfo != null) {
            int separator = userInfo.indexOf(':');
            String username = separator == -1 ? userInfo : userInfo.substring(0, separator);
            String password = separator == -1 ? "" : userInfo.substring(separator + 1);
            properties.put("spring.datasource.username", URLDecoder.decode(username, StandardCharsets.UTF_8));
            properties.put("spring.datasource.password", URLDecoder.decode(password, StandardCharsets.UTF_8));
        }
        return properties;
    }
}
