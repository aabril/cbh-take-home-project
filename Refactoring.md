# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The implementation for the exercise has been as it follows:

#### 1. Checked dpk.js and dpk-test.js to understand what the function was doing

In order to understand, I refactored a little bit for myself to disassembly each step. 
However, I kept the original fail since I didn't want to break the source until I made any test.


The outcome looked like this:

```js
const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function deterministicPartitionKey(event) {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate;

  if (event && event.partitionKey) candidate = event.partitionKey;
  if (event && !event.partitionKey) {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  if(candidate && typeof candidate !== "string" ) candidate = JSON.stringify(candidate);
  if(!candidate) candidate = TRIVIAL_PARTITION_KEY;

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};

module.exports = {
  deterministicPartitionKey,
  TRIVIAL_PARTITION_KEY,
  MAX_PARTITION_KEY_LENGTH
}
```


#### 2. Extended tests, without touching the original function

There, I spend some time extending the tests. 
Having my doubts, but as I was writing tests I was understanding better the insights of the logic.
Once I felt confident enough I stop adding more tests, keeping in mind the 90-120minutes.


#### 3. Refactor 

Once I stopped with the tests, I started to refactor `dpk.js`, the main code. To make it more readable, and trying to follow bests practises.
Ideally with more time, I should install on dev dependencies: eslint or prettier in order to follow conventions, but didn't want to spend much time on this since it was not prior at the moment.


After everything, I reviewed and pushed to github. 
And now I'm writing this docs.