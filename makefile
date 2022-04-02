deploy:
	pnpm run build
	git push -f git@github.com:<liushuangls>/<DevToysWeb>.git main:gh-pages
