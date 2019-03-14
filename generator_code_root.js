const inquirer = require("./inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const clear = require("clear");
const fs = require("fs");
let { spawn } = require("child_process");
let rails = require("./generator_code_files/rails_style/rails_index") 

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

  let structure = await inquirer.specifyStructure();
  
  let credentials = await inquirer.addModel();

  let modelNames = credentials.model
    .split(" ")
    .filter(item => {
      if (item.length) {
        return item;
      }
    })
    .map(item => item.toUpperCase());


  let validated = !!modelNames.length && structure && credentials

  if (validated) {

    let makeDir = spawn(
      "mkdir POC_boiler POC_boiler/store POC_boiler/store/actions POC_boiler/store/constants POC_boiler/store/reducers",
      { shell: true }
    );

    makeDir.on("exit", () => {

      if(structure === 'rails'){

        // rails(modelNames)

      }

    
    
    }); // makeDir on exit

  } else {

    throw new Error(chalk.red('please try again'))
    // console.log(chalk.red("You did not enter a model name!"));
  }
  

};

run();

