const chalk = require('chalk');
const fs = require('fs');
let { spawn } = require('child_process');
let rails = require('./../generator_code_files/rails_style/rails_index');
const ducks = require('./../generator_code_files/ducks_style');
const yaml = require('js-yaml');
const createStore = require('./../generator_code_files/ducks_style/create_store');
const createCombineReducers = require('./../generator_code_files/ducks_style/create_combine_reducers');
const { makeLock } = require('./lock');

module.exports = () => { 

if (fs.existsSync('./.lamp-lock.json')) {
  console.log(
    chalk.red(
      `\nThe store has already been initialized! \nPlease use the ${chalk.white(
        '[genie update]'
      )} or ${chalk.white(
        '[genie add]'
      )} methods to alter your existing store.\n`
    )
  );
} else {
  console.log(chalk.hex('#764abc')('Your wish is my command!\n'));

  let yams;

  try {
    yams = yaml.safeLoad(fs.readFileSync('./lamp.config.yml', 'utf8'));
  } catch (e) {
    console.log(
      chalk.red(
        `No lamp.config file found.`
      )
    );
    process.exit();
  }

  makeLock(yams, null);

  let { Structure, Models, Thunks, Logging } = yams;

  if (!Structure) {
    console.log(
      chalk.red(`Please specify file structure as ${chalk.white('Structure')}.`)
    );
    process.exit();
  }

  if (!Models) {
    console.log(
      chalk.red(
        `Please specify the slices of state as ${chalk.white('Models')}.`
      )
    );
    process.exit();
  }

  let rootStore = spawn('mkdir store', { shell: true });

  if (Structure === 'Rails') {
    console.log(
      chalk.yellow(
        `Generating store using ${chalk.white('Rails')} file structure`
      )
    );
    let makeDir = spawn('mkdir store/actions store/constants store/reducers', {
      shell: true,
    });

    makeDir.on('exit', () => {

      setTimeout(()=>{

        rails(Models, Thunks, Logging);
      }, 2000)
    });
  }

  if (Structure === 'Ducks') {
    console.log(
      chalk.yellow(
        `Generating store using ${chalk.white('Ducks')} file structure`
      )
    );

    // create action types, action creators, and reducer

    rootStore.on('exit', () => {
      // create combine reducers
      let modelNames = Models.map(
        Model =>
          (Model = Object.keys(Model)[0][0]
            .toUpperCase()
            .concat(Object.keys(Model)[0].slice(1)))
      );

      fs.writeFile(
        './store/combine_reducers.js',
        createCombineReducers(modelNames),
        err => {
          if (err) console.error(err);
          console.log(
            chalk.green(
              `Successfully generated the ${chalk.white(
                'combine_reducers.js'
              )} file.`
            )
          );
        }
      );

      // create store
      fs.writeFile('./store/store.js', createStore(Logging), err => {
        if (err) console.error(err);
        console.log(
          chalk.green(
            `Successfully generated the ${chalk.white('store.js')} file`
          )
        );
      });

      /*
      to guarantee that the files will be written after the folder
      directories are created, wait til the end of all the mkdir calls
      */

      let modelFiles = []

      Models.forEach((model, i) => {
        let modelName = Object.keys(model)[0][0]
          .toUpperCase()
          .concat(Object.keys(model)[0].slice(1));

        let makeDir = spawn(`mkdir store/${modelName}`, { shell: true });

        makeDir.on('exit', () => {
          modelFiles.push([model, modelName, Thunks])
          if( i === Models.length - 1 ){

            setTimeout(()=>{

              makeModelFiles()
            }, 2000) //  ¯\_(ツ)_/¯
          } // better safe than sorry
        });
      });

      function makeModelFiles(){

        modelFiles.forEach((array)=>{
          ducks(...array)
        })
      }
    });
  }
}

}