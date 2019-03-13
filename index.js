const inquirer = require("./inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const clear = require("clear");
const fs = require("fs");
let { spawn } = require("child_process");
const { actionFuncs_boiler, actionTypes_boiler } = require("./boiler_index");

clear();
console.log(
  chalk.green(figlet.textSync("ReduxGenie", { horizontalLayout: "full" }))
);

const run = async () => {
  const credentials = await inquirer.addModel();
  let makeDir = spawn("mkdir POC_boiler", { shell: true });

  makeDir.on("exit", () => {
    fs.writeFile(
      "./POC_boiler/action_types.js",
      actionTypes_boiler(credentials.model),
      () => console.log("actionTypes_boiler")
    );
    fs.writeFile(
      "./POC_boiler/action_function_creators.js",
      actionFuncs_boiler(credentials.model),
      () => console.log("actionFuncs_boiler")
    );
  });
  console.log(credentials.model);
};

run();
