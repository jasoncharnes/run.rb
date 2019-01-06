import Worker from "./Ruby.worker.js";

// launch a Ruby worker before we need one
var nextWorker = new Worker();

function ruby(input) {
  const result = {
    output: [],
    exitStatus: null
  };

  // grab the already-launched worker, and launch a replacement in the background
  const worker = nextWorker;
  nextWorker = new Worker();

  // send it our input
  worker.postMessage({ input: input });

  // wrap the worker lifecycle in a Promise
  return new Promise((resolve, reject) => {
    worker.onerror = (event) => {
      console.error("Ruby worker error: ", event);
      reject(event.message);
      worker.terminate();
    }

    worker.addEventListener("message", function (event) {
      const msg = event.data;

      if (msg.error) {
        reject(event.error);
        worker.terminate();

      } else if (msg.complete) {
        if (event.exitStatus) {
          result.exitStatus = event.exitStatus;
        }

        resolve(result);
        worker.terminate();

      } else if (msg.output) {
        result.output.push(msg);
        // continue running the worker

      } else {
        // unhandled
        console.log("unhandled Ruby worker message", event);
      }
    });
  });
}

export default ruby;
