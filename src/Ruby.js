import Worker from "./Ruby.worker.js";

function ruby(input) {
  const result = {
    output: [],
    exitStatus: null
  };

  // launch a new Ruby worker
  const worker = new Worker();

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
