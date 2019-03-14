const inquirer = require("./inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const clear = require("clear");
const fs = require("fs");
let { spawn } = require("child_process");
let rails = require("./generator_code_files/rails_style/rails_index") 
const yaml = require('js-yaml');

let yams 

try {
  yams = yaml.safeLoad(fs.readFileSync('./lamp.config.yml', 'utf8'));
} catch (e) {
  console.log(e);
}

// processes yams input

const { File_Structure, Models } = yams;

// console.log(File_Structure, Models)

if(File_Structure === "Rails" || File_Structure === "rails"){

  let makeDir = spawn(
    "mkdir store store/actions store/constants store/reducers",
    { shell: true }
  );

  makeDir.on("exit", () => {

      rails(Models)
  })
}


