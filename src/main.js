const getJoke = require("./joke");
let core;
try {
  core = require("@actions/core");
} catch (e) {
  core = {
    setOutput: (name, value) => {
      const outputFile = process.env.GITHUB_OUTPUT;
      if (outputFile) {
        const fs = require('fs');
        try {
          fs.appendFileSync(outputFile, `${name}<<EOF\n${String(value).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A')}\nEOF\n`);
        } catch (err) {
          console.log(`output ${name}: ${value}`);
        }
      } else {
        console.log(`output ${name}: ${value}`);
      }
    },
    setFailed: (msg) => { console.error(msg); process.exitCode = 1; }
  };
}

async function run() {
  const joke = await getJoke();
  console.log(joke);
  core.setOutput("joke", joke);
}

run().catch(error => core.setFailed(error.message));