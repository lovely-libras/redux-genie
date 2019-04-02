const chalk = require('chalk');
const fs = require('fs');
let { spawn } = require('child_process');
let rails = require('./generator_code_files/rails_style/rails_index');
const ducks = require('./generator_code_files/ducks_style');
const yaml = require('js-yaml');
const createStore = require('./generator_code_files/ducks_style/create_store');
const createCombineReducers = require('./generator_code_files/ducks_style/create_combine_reducers');
const { makeLock } = require('./lock');

console.log('HEYYEYYEYEYEE');

if (fs.existsSync('./.lamp-lock.json')) {
  console.log(
    chalk.red(
      `\nThe store has already been initialized! \nPlease use the 'genie update' or 'genie add' methods to alter your existing store.\n`
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
        `You do not have a 'lamp.config.yml' configuration file!\nUse 'genie sample' to create a file that you can work from.\nFor more in-depth help creating the 'lamp.config.yml', please visit us at ${chalk.cyan(
          'https://redux-genie.herokuapp.com'
        )}`
      )
    );
    process.exit();
  }
  makeLock(yams, null);
  let { Structure, Models, Thunks, Logging } = yams;

  if (!Structure) {
    console.log(chalk.red("Please specify file structure as 'Structure'."));
    process.exit();
  }
  if (!Models) {
    console.log(chalk.red("Please specify the slices of state as 'Models'."));
    process.exit();
  }
  let rootStore = spawn('mkdir store', { shell: true });
  if (Structure === 'Rails') {
    console.log(chalk.yellow("Generating store using 'Rails' file structure"));
    let makeDir = spawn('mkdir store/actions store/constants store/reducers', {
      shell: true,
    });
    makeDir.on('exit', () => {
      rails(Models, Thunks, Logging);
    });
  }
  if (Structure === 'Ducks') {
    console.log(chalk.yellow("Generating store using 'Ducks' file structure."));

    // create action types, action creators, and reducer

    Models.forEach((model, i) => {
      let modelName = Object.keys(model)[0][0]
        .toUpperCase()
        .concat(Object.keys(model)[0].slice(1));

      let makeDir = spawn(`mkdir store/${modelName}`, { shell: true });

      makeDir.on('exit', () => {
        ducks(model, modelName, Thunks);
      });
    });

    rootStore.on('exit', () => {
      // create combine reducers
      let modelNames = Models.map(
        Model =>
          (Model = Object.keys(Model)[0][0]
            .toUpperCase()
            .concat(Object.keys(Model)[0].slgice(1)))
      );

      fs.writeFile(
        './store/combine_reducers.js',
        createCombineReducers(modelNames),
        err => {
          if (err) console.error(err);
          console.log(
            chalk.green(
              "Successfully generated the 'combine_reducers.js' file."
            )
          );
        }
      );

      // create store
      fs.writeFile('./store/store.js', createStore(Logging), err => {
        if (err) console.error(err);
        console.log(chalk.green("Successfully generated the 'store.js' file."));
      });
    });
  }
}
