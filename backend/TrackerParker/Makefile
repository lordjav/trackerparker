SHELL := /bin/sh

STACK_NAME ?= trackerparker-live
AWS_REGION ?= us-east-1
SAM ?= sam
MAVEN ?= sh ./mvnw

.PHONY: build validate deploy smoke db-smoke latency request-certificate

build:
	$(MAVEN) clean package
	rm -rf target/lambda
	mkdir -p target/lambda
	cp target/TrackerParker-*.jar target/lambda/TrackerParker.jar
	cp run.sh target/lambda/run.sh
	chmod +x target/lambda/run.sh

validate:
	$(SAM) validate --template-file template.yaml --region $(AWS_REGION)

deploy: build validate
	$(SAM) deploy --template-file template.yaml --stack-name $(STACK_NAME) --region $(AWS_REGION) --capabilities CAPABILITY_IAM --parameter-overrides $(SAM_PARAMETER_OVERRIDES)

smoke:
	@test -n "$(FUNCTION_URL)" || (echo 'Set FUNCTION_URL=https://…'; exit 2)
	@test -n "$(CLOUDFRONT_URL)" || (echo 'Set CLOUDFRONT_URL=https://api.example.com'; exit 2)
	curl --fail --silent --show-error "$(FUNCTION_URL)/health"
	curl --fail --silent --show-error "$(CLOUDFRONT_URL)/health"

db-smoke:
	@test -n "$(CLOUDFRONT_URL)" || (echo 'Set CLOUDFRONT_URL=https://api.example.com'; exit 2)
	curl --fail --silent --show-error "$(CLOUDFRONT_URL)/membership"

latency:
	@test -n "$(CLOUDFRONT_URL)" || (echo 'Set CLOUDFRONT_URL=https://api.example.com'; exit 2)
	curl --silent --show-error --output /dev/null --write-out 'HTTP %{http_code} total=%{time_total}s connect=%{time_connect}s\n' "$(CLOUDFRONT_URL)/membership"

request-certificate:
	@test -n "$(API_DOMAIN_NAME)" || (echo 'Set API_DOMAIN_NAME=api.example.com'; exit 2)
	aws acm request-certificate --region us-east-1 --domain-name "$(API_DOMAIN_NAME)" --validation-method DNS --query CertificateArn --output text
