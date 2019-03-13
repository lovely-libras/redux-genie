const inquirer = require("./inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const clear = require("clear");
const fs = require("fs");
let { spawn } = require("child_process");
const { actionFuncs_boiler, actionTypes_boiler } = require("./boiler_index");

clear();
console.log(
  chalk.green(
    figlet.textSync("ReduxGenie", {
      horizontalLayout: "full",
      font: "Dancing Font"
    })
  )
);

const run = async () => {
  let credentials = await inquirer.addModel();
  let modelNames = credentials.model.split(" ").filter(item => {
    if (item.length) {
      return item;
    }
  });

  if (modelNames.length) {
    let makeDir = spawn("mkdir POC_boiler", { shell: true });

    makeDir.on("exit", () => {
      fs.writeFile(
        "./POC_boiler/action_types.js",
        actionTypes_boiler(modelNames),
        () => console.log("actionTypes_boiler")
      );
      fs.writeFile(
        "./POC_boiler/action_function_creators.js",
        actionFuncs_boiler(modelNames),
        () => console.log("actionFuncs_boiler")
      );
    });
  } else {
    console.log(chalk.red("You did not enter a model name!"));
  }
};

run();
