miniruby.wasm: Dockerfile *.patch
	docker build -t jasonruby .
	docker run --rm jasonruby tar -c -Cweb miniruby.js miniruby.wasm | tar xv
