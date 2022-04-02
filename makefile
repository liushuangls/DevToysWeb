deploy-first:
	pnpm run build
	cd dist && git init && git checkout -b main && git add -A && git commit -m 'deploy' && git push -f git@github.com:liushuangls/DevToysWeb.git main:gh-pages

deploy:
	pnpm run build
	cd dist && git add -A && git commit -m 'deploy' && git push -f git@github.com:liushuangls/DevToysWeb.git main:gh-pages
