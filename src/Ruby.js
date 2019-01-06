import Module from "./emscripten/ruby-2.6.0/miniruby.js";
import WASM from "./emscripten/ruby-2.6.0/miniruby.wasm";

let error = [];
let result = [];

export let ruby = (input, onStdOut, onStdErr) => {
  return Module({
    arguments: ["file.rb"],
    locateFile: function(path) {
      if (path.endsWith(".wasm")) {
        return WASM;
      }
      return path;
    },
    postRun: [
      () => {
        if (result) onStdOut(result);
        if (error) console.log(error.join("")); // onStdErr(error);

        error = [];
        result = [];
      }
    ],
    sigaction: function(signum, act, oldact) {
      // ignore
    },
    stderr: function(output) {
      var char = String.fromCharCode(output);

      error.push(char);
    },
    stdin: function() {
      return null;
    },
    stdout: function(output) {
      var char = String.fromCharCode(output);

      result.push(char);
    }
  }).then(function(Module) {
    Module.FS.writeFile("file.rb", input);
  });
};
