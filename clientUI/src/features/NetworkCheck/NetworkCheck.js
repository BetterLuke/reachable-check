import axios from "axios";
import * as rax from "retry-axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setReachable } from "./networkCheckSlice";

// eslint-disable-next-line no-unused-vars
const interceptorId = rax.attach();

const range = {
  from: 1,
  to: Infinity,

  [Symbol.asyncIterator]() {
    return {
      current: this.from,
      last: this.to,

      async next() {
        console.log("wait 2000");
        await new Promise((resolve) => setTimeout(resolve, 2000)); // (3)

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};

function NetWorkCheck() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkReachable() {
      for await (let value of range) {
        console.log("value", value);
        try {
          const res = await axios({
            url: "/reachableCheck",
            raxConfig: {
              // Retry 3 times on requests that return a response (500, etc) before giving up.  Defaults to 3.
              retry: 2,

              // Retry twice on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
              noResponseRetries: 2,

              // Milliseconds to delay at first.  Defaults to 100. Only considered when backoffType is 'static'
              retryDelay: 200,

              // HTTP methods to automatically retry.  Defaults to:
              // ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT']
              httpMethodsToRetry: ["GET", "HEAD", "OPTIONS", "DELETE", "PUT"],

              // The response status codes to retry.  Supports a double
              // array with a list of ranges.  Defaults to:
              // [[100, 199], [429, 429], [500, 599]]
              statusCodesToRetry: [
                [100, 199],
                [429, 429],
                [500, 599],
              ],

              // If you are using a non static instance of Axios you need
              // to pass that instance here (const ax = axios.create())
              // instance: ax,

              // You can set the backoff type.
              // options are 'exponential' (default), 'static' or 'linear'
              backoffType: "static",

              // You can detect when a retry is happening, and figure out how many
              // retry attempts have been made
              onRetryAttempt: (err) => {
                const cfg = rax.getConfig(err);
                console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
              },
            },
          });
          if (res.headers) {
            dispatch(setReachable(true));
          }
        } catch (err) {
          dispatch(setReachable(false));
          console.log(err);
        }
      }
    }
    checkReachable();
  });

  return null;
}

export default NetWorkCheck;
