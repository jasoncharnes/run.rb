# Build a patched version of wasm-opt
FROM trzeci/emscripten AS wasmopt
RUN git clone https://github.com/WebAssembly/binaryen.git --depth 1 --branch version_63
ADD binaryen.patch /src
WORKDIR /src/binaryen
RUN patch -p1 </src/binaryen.patch
RUN cmake . && make

FROM trzeci/emscripten
RUN apt-get update && \
  apt-get install -y autoconf bison ruby less vim && \
  apt-get clean

# Clone and patch Ruby
RUN git clone https://github.com/ruby/ruby.git --depth 1 --branch v2_6_0
ADD ruby-2.6.0.patch /src
WORKDIR /src/ruby
RUN patch -p1 < /src/ruby-2.6.0.patch

# Build miniruby bitcode
RUN autoconf
RUN emconfigure ./configure --disable-fiber-coroutine --disable-dln
RUN emmake make miniruby.bc EXEEXT=.bc

# Build miniruby.wasm with the patched version of wasm-opt
COPY --from=wasmopt /src/binaryen/bin/wasm-opt /usr/local/bin/wasm-opt
RUN mkdir web && emcc -o web/miniruby.js miniruby.bc \
  -s ERROR_ON_UNDEFINED_SYMBOLS=0 \
  -s TOTAL_MEMORY=67108864 \
  -s EMULATE_FUNCTION_POINTER_CASTS=1 \
  -s MODULARIZE=1 \
  -s EXTRA_EXPORTED_RUNTIME_METHODS=['FS']
