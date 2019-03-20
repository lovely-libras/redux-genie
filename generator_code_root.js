const chalk = require("chalk");
const clear = require("clear");
const fs = require("fs");
let { spawn } = require("child_process");
let rails = require("./generator_code_files/rails_style/rails_index");
const ducks = require("./generator_code_files/ducks_style");
const yaml = require("js-yaml");
const create_store = require("./generator_code_files/ducks_style/create_store");
const create_combine_reducers = require("./generator_code_files/ducks_style/create_combine_reducers");

console.log(chalk.red("your wish is my command"));

let yams;

try {
  yams = yaml.safeLoad(fs.readFileSync("./lamp.config.yml", "utf8"));
} catch (e) {
  console.log(chalk.red(e.message));
  process.exit();
}

let { Structure, Models, Thunks } = yams;

if (!Structure) {
  console.log('Please specify file structure as "Structure".');
  process.exit();
}

if (!Models) {
  console.log('Please specify the slices of state as "Models".');
  process.exit();
}

spawn("mkdir store", { shell: true });

if (Structure === "Rails") {
  let makeDir = spawn("mkdir store/actions store/constants store/reducers", {
    shell: true
  });

  makeDir.on("exit", () => {
    rails(Models, Thunks);
  });
}

if (Structure === "Ducks") {
  // create action types, action creators, and reducer
  Models.forEach(model => {
    const modelName = Object.keys(model)[0];
    let makeDir = spawn(`mkdir store/${modelName}`, { shell: true });

    makeDir.on("exit", () => {
      ducks(model, modelName);
    });
  });

  // create combine reducers
  const modelNames = Models.map(model => Object.keys(model)[0]);
  fs.writeFile(
    "./store/combine_reducers.js",
    create_combine_reducers(modelNames),
    () => {
      console.log(chalk.yellow(`made the combine_reducers.js file`));
    }
  );

  // create store
  fs.writeFile("./store/store.js", create_store(), () => {
    console.log(chalk.yellow(`made the store.js file`));
  });
}
