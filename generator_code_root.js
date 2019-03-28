const chalk = require("chalk");
const clear = require("clear");
const fs = require("fs");
let { spawn } = require("child_process");
let rails = require("./generator_code_files/rails_style/rails_index");
const ducks = require("./generator_code_files/ducks_style");
const yaml = require("js-yaml");
const create_store = require("./generator_code_files/ducks_style/create_store");
const create_combine_reducers = require("./generator_code_files/ducks_style/create_combine_reducers");
const { makeLock, validateModels } = require('./lock')
const mkdirp = require('mkdirp')

module.exports = () => {

  console.log(chalk.red("your wish is my command"));

  let yams;

  try {
    yams = yaml.safeLoad(fs.readFileSync("./lamp.config.yml", "utf8"));
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit();
  }
  // this is the logic for the initial generate store call
  
  // we make the lock file containing the store declaration
  // at the initial generate call

  let { Structure, Models, Thunks, Logging } = yams;

  // validateModels(Models)
  
  makeLock(yams, null)

  if (!Structure) {
    console.log('Please specify file structure as "Structure".');
    process.exit();
  }

  if (!Models) {
    console.log('Please specify the slices of state as "Models".');
    process.exit();
  }

  // let rootStore = spawn("mkdir store", { shell: true });

  fs.mkdirSync('./store', 0744) 
    
  if (Structure === "Rails") {

    console.log(chalk.red('Generating Rails file structure'))

    fs.mkdirSync('./store/actions', 0744) 
    fs.mkdirSync('./store/constants', 0744) 
    fs.mkdirSync('./store/reducers', 0744)   
    rails(Models, Thunks, Logging);
    
  } // end of rails calls

  
  if (Structure === "Ducks") {

    console.log(chalk.red('Generating Ducks file structure'))

    // create action types, action creators, and reducer

    Models.forEach((model, i) => {

      let modelName = Object.keys(model)[0][0]
                                      .toUpperCase()
                                         .concat(Object.keys(model)[0].slice(1))

      fs.mkdirSync(`./store/${modelName}`, 0744)
      ducks(model, modelName, Thunks);
   
    });


      // create combine reducers
    let modelNames = Models.map(

     Model =>
       (Model = Object.keys(Model)[0][0]
         .toUpperCase()
         .concat(Object.keys(Model)[0].slice(1)))
    )

   fs.writeFile(
        "./store/combine_reducers.js",
        create_combine_reducers(modelNames),
        (err) => {
          if(err) console.log(err)
         console.log(chalk.yellow(`made the combine_reducers.js file`)) 
        }
      );

      // create store
      fs.writeFile(
        "./store/store.js", 
        create_store(Logging), 
        (err) => {
        if(err) console.log(err)
        console.log(chalk.yellow(`made the store.js file`)) 
      });
  } // end of ducks call

}