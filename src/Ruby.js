import Module from "./emscripten/ruby-2.6.0/miniruby.js";
import WASM from "./emscripten/ruby-2.6.0/miniruby.wasm";

function ruby(input) {
  const result = {
    output: [],
  };
  
  return new Promise(function(resolve, reject) {
    Module({
      arguments: ["playground.rb"],
      locateFile: function(path) {
        if (path.endsWith(".wasm")) {
          return WASM;
        }
        return path;
      },
      postRun: [
        () => {
          resolve(result);
        }
      ],
      sigaction: function(signum, act, oldact) {
        // ignore
      },
      
      stdin: function() {
        return null;
      },
      stdout: function(output) {
        var char = String.fromCharCode(output);
        result.output.push({ fd: 1, data: char });
      },
      stderr: function(output) {
        var char = String.fromCharCode(output);
        result.output.push({ fd: 2, data: char });
      }
    }).then(function(Module) {
      Module.FS.writeFile("playground.rb", input);
    }).then(function(Module) {
      // `ruby` is about to run
    }, function(error) {
      reject(error);
    });
  });
}

export default ruby;
