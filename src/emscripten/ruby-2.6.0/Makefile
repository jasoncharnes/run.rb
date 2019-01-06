miniruby.wasm: Dockerfile Makefile *.patch
	docker build -t jasonruby .
	docker run --rm jasonruby tar -c -Cweb miniruby.js miniruby.wasm | tar xv
	mv miniruby.js miniruby.js.original
	( echo '/* eslint-disable */'; cat miniruby.js.original ) > miniruby.js
	rm miniruby.js.original
