const chalk = require("chalk");
const clear = require("clear");
const fs = require("fs");
let { spawn } = require("child_process");
let rails = require("./generator_code_files/rails_style/rails_index") 
const ducks = require('./generator_code_files/ducks_style')
const yaml = require('js-yaml');

console.log(chalk.red('your wish is my command'))

let yams 

try {
  yams = yaml.safeLoad(fs.readFileSync('./lamp.config.yml', 'utf8'));
} catch (e) {
  console.log(e);
}

let { File_Structure, Models } = yams;
File_Structure = File_Structure.toLowerCase()


spawn("mkdir store", {shell: true})

if(File_Structure === "rails"){

  let makeDir = spawn(
    "mkdir store/actions store/constants store/reducers",
    { shell: true }
  );

  makeDir.on("exit", () => {

      rails(Models)
  })
}

if(File_Structure === 'ducks'){
  Models.forEach(model => {
    const modelName = Object.keys(model)[0]
    let makeDir = spawn(
      `mkdir store/${modelName}`, {shell: true}
    )

    makeDir.on("exit", () => {
      ducks(model, modelName)
    })

  })
}


