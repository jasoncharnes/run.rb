import Module from "./emscripten/ruby-2.6.0/miniruby.js";
import WASM from "./emscripten/ruby-2.6.0/miniruby.wasm";

export let ruby = () => {
  Module({
    arguments: ["file.rb"],
    locateFile: function(path) {
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
      document.getElementById("output").textContent += char;
    }
  }).then(function(Module) {
    var snippet = document.getElementById("snippet").value;
    Module.FS.writeFile("file.rb", snippet);
  });
};
