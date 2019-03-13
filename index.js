const inquirer = require("./inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const clear = require("clear");
const fs = require("fs");
let { spawn } = require("child_process");
const {
  action_boiler_Rails_model,
  actionTypes_boiler,
  reducer_creator
} = require("./boiler_index");

clear();
console.log(
  chalk.green(
    figlet.textSync("ReduxGenie", {
      horizontalLayout: "full",
      font: "Ghost"
    })
  )
);

const capitalizeFirst = str => {
  return str
    .charAt(0)
    .toUpperCase()
    .concat(str.slice(1));
};

const run = async () => {
  let credentials = await inquirer.addModel();
  // console.log(capitalizeFirst("hello"), "testing");
  let modelNames = credentials.model
    .split(" ")
    .filter(item => {
      if (item.length) {
        return item;
      }
    })
    .map(item => item.toUpperCase());

  let makeDir = spawn(
    "mkdir POC_boiler POC_boiler/store POC_boiler/store/actions POC_boiler/store/constants POC_boiler/store/reducers",
    { shell: true }
  );

  if (modelNames.length) {
    makeDir.on("exit", () => {
      fs.writeFile(
        "./POC_boiler/store/constants/action_constants.js",
        actionTypes_boiler(modelNames),
        () => {
          console.log("actionTypes_boiler");
        }
      );

      modelNames.forEach(model => {
        fs.writeFile(
          `./POC_boiler/store/actions/action_types_for_${model}.js`,
          action_boiler_Rails_model(model),
          () => {
            console.log(`made action types for ${model}`);
          }
        );

        fs.writeFile(
          `./POC_boiler/store/reducers/${model}_reducer.js`,
          reducer_creator(model),
          () => {
            console.log(`made reducer_creator for ${model}`);
          }
        );
      });
    });
  } else {
    console.log(chalk.red("You did not enter a model name!"));
  }
};

run();
