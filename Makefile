# --- jstools-mask

build: test
	@node run build

test: install.npm
	@node run test
	@./node_modules/.bin/karma start

install.npm:
	@npm install

echo:
	@echo "make options: build test"

.DEFAULT_GOAL := echo
