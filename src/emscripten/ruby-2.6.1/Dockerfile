FROM trzeci/emscripten:sdk-tag-1.38.32-64bit
RUN apt-get update && \
  apt-get install -y autoconf bison ruby less vim && \
  apt-get clean

# Clone and patch Ruby
RUN git clone https://github.com/ruby/ruby.git --depth 1 --branch v2_6_1
ADD ruby-2.6.1.patch /src
WORKDIR /src/ruby
RUN patch -p1 < /src/ruby-2.6.1.patch

# Build miniruby bitcode
RUN autoconf
RUN emconfigure ./configure --disable-fiber-coroutine --disable-dln
RUN emmake make miniruby.bc EXEEXT=.bc

# Build miniruby.wasm
RUN mkdir web && emcc -o web/miniruby.js miniruby.bc \
  -s ERROR_ON_UNDEFINED_SYMBOLS=0 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EMULATE_FUNCTION_POINTER_CASTS=1 \
  -s MODULARIZE=1 \
  -s EXTRA_EXPORTED_RUNTIME_METHODS=['FS'] \
  -Oz
