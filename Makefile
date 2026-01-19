.PHONY: build deploy clean

build:
	npm run build

deploy: build
	scp -r dist/* root@194.58.66.85:/var/www/inventory-frontend/
	ssh root@194.58.66.85 "docker compose restart nginx"

clean:
	rm -rf dist/

# Использование:
# make deploy  # build → scp → restart nginx
