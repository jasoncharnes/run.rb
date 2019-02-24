import run from "./emscripten/ruby-2.6.1/miniruby.js";
import WASM from "./emscripten/ruby-2.6.1/miniruby.wasm";

const input = new Promise((resolve, reject) => {
  self.addEventListener('message', (msg) => {
    resolve(msg.data.input);
  });
});

// Configure the emscripten Module
const Module = {
  locateFile: function(path) {
    if (path.endsWith(".wasm")) {
      return WASM;
    }
    return path;
  },
  onExit: ((status) => {
    // exit() system call
    self.postMessage({complete: true, exitStatus: status.status});
  }),
  noInitialRun: true,
  noExitRuntime: false,

  stdin: function() {
    return null;
  },
  print: function(output) {
    self.postMessage({ fd: 1, output: output + "\n" });
  },
  printErr: function(output) {
    switch (output) {
    case "Calling stub instead of sigaction()":
      // ignore
      break;
      
    default:
      self.postMessage({ fd: 2, output: output + "\n" });
    }
  }
};

// Initialize the module
run(Module).then(function() {
  // Module is ready to run
  // Wait until we have input
  input.then(function(input) {
    // Write the input file
    Module.FS.writeFile("playground.rb", input);

    // Run main()
    Module.callMain(["playground.rb"]);

    // Indicate completion
    self.postMessage({complete: true});
  });
});
