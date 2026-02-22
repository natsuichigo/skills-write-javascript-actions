const getJoke = require("./joke");
let core;
try {
  core = require("@actions/core");
} catch (e) {
  core = {
    setOutput: (name, value) => console.log(`output ${name}: ${value}`),
    setFailed: (msg) => { console.error(msg); process.exitCode = 1; }
  };
}

async function run() {
  const joke = await getJoke();
  console.log(joke);
  core.setOutput("joke", joke);
}

run().catch(error => core.setFailed(error.message));