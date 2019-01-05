import Module from "./emscripten/ruby-2.6.0/miniruby.js";
import WASM from "./emscripten/ruby-2.6.0/miniruby.wasm";

export let ruby = (snippet, onStdOut) => {
  return Module({
    arguments: ["file.rb"],
    locateFile: function(path) {
      console.log(WASM);
      if (path.endsWith(".wasm")) {
        return WASM;
      }
      return path;
    },
    sigaction: function(signum, act, oldact) {
      // ignore
    },
    stdin: function() {
      return null;
    },
    stdout: function(output) {
      var char = String.fromCharCode(output);

      onStdOut(char);
    }
  }).then(function(Module) {
    Module.FS.writeFile("file.rb", snippet);
  });
};
