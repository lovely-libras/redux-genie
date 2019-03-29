const fs = require('fs');
const chalk = require('chalk');

const warning =
  'Unable to complete update- genie cannot process current action constants file. Check that the file ends with a "}" bracket.';

module.exports = (updates, Thunks) => {
  updates.forEach(model => {
    let modelName = model[0][0];

    // this is admittedly bad naming: low hanging fruit for refactoring
    // needs to be changing these to something like "newActions" and "newThunks"
    // upperCase Thunks refers to the "Thunks included" option on the base yaml

    let actions = [];
    let thunks = [];

    // because the upstream diff function returned an
    // array of update entries, we need to sort those entries
    // into Action and Thunk updates

    model.forEach(entry => {
      if (entry[1] === 'Actions') actions.push(entry[2][1]);
      if (entry[1] === 'Thunks') thunks.push(entry[2][1]);
    });

    // update action types - if already exit, if don't already exit

    let actionFile = `${process.cwd()}/store/${modelName}/actions_for_${modelName}.js`;

    if (fs.existsSync(actionFile) && actions.length) {
      fs.readFile(actionFile, (err, data) => {
        data = data.toString();

        if (err) {
          throw err;
        }

        if (!data.indexOf('}')) {
          console.log(warning);
          process.exit();
        }

        // plug into the generate file
        let newActions = require('./create_action_creators')(
          modelName,
          { CRUD: false, Actions: actions, Thunks: thunks },
          Thunks
        ).replace(
          `import actions from "./action_constants_for_${modelName}"`,
          ''
        );

        let newConstants = newActions
          .slice(newActions.indexOf('export default {'))
          .replace('export default {', '')
          .replace('}', '')
          .trim();

        newActions = newActions.slice(
          0,
          newActions.indexOf('export default {')
        );

        let top =
          data.slice(0, data.indexOf('export default {')).trim() + newActions;

        let bottom =
          data.slice(data.indexOf('export default {'), data.lastIndexOf('}')) +
          '\t' +
          newConstants +
          '\n}';

        fs.writeFile(
          actionFile,

          top + bottom,

          () => {
            console.log(
              chalk.green(`updated the action creator file for ${modelName}`)
            );
          }
        );
      });
    } else if (!fs.existsSync(actionFile) && actions.length) {
      // no named actions yet- very unlikely scenario, CRUD no and no actions defined
      // just call the writeFile method with the same object

      fs.writeFile(
        `./store/${modelName}/actions_for_${modelName}.js`,
        require('./../action_boiler_Rails_model')(
          modelName,
          { Actions: actions },
          Thunks
        ),
        () => {
          console.log(chalk.yellow(`made action types for ${modelName}`));
        }
      );
    }

    // update action constants - add actions
    // there will always be an action constants file
    let constantsFile = `${process.cwd()}/store/${modelName}/action_constants_for_${modelName}.js`;

    if (actions.length) {
      fs.readFile(constantsFile, (err, data) => {
        if (err) {
          throw err;
        }

        if (!data.indexOf('}')) {
          console.log(warning);
          process.exit();
        }

        let newConstants = actions.reduce(
          (a, b) => (a += `\n\t${b.toUpperCase()} : '${b.toUpperCase()}',`),
          ''
        );

        let updatedConstants =
          data
            .toString()
            .slice(0, data.lastIndexOf('}'))
            .trim() +
          newConstants +
          '\n}';

        fs.writeFile(
          constantsFile,

          updatedConstants,

          () => {
            console.log(
              chalk.yellow(
                `updated the action constants file to add new actions constants for ${modelName}`
              )
            );
          }
        );
      });

      // update reducer - add actions
      // there will always be a reducer file even in weird edge cases

      let reducerFile = `${process.cwd()}/store/${modelName}/reducer_for_${modelName}.js`;

      fs.readFile(reducerFile, (err, data) => {
        data = data.toString();

        if (err) {
          throw err;
        }

        if (!data.indexOf('}')) {
          console.log(warning);
          process.exit();
        }

        // plug back into the generate file
        let newCases = require('./create_reducer')(
          {
            CRUD: false,
            Actions: actions.map(action => action.toUpperCase()),
            Slice: {},
          },
          modelName
        );

        newCases = newCases
          .slice(0, newCases.lastIndexOf('default:'))
          .slice(newCases.indexOf('case'));

        let top = data.slice(0, data.indexOf('default:'));

        let bottom = data.slice(data.indexOf('default:'));

        fs.writeFile(
          reducerFile,

          top + newCases + bottom,

          () => {
            console.log(
              chalk.yellow(`updated the reducer file for ${modelName}`)
            );
          }
        );
      });
    }
    // update external thunks file
    // thunks included would be taken care of above when the thunks are passed
    // into the action generate function

    let originalthunksFile = `${process.cwd()}/store/${modelName}/thunks_for_${modelName}.js`;

    // thunks were already defined on the yaml-
    if (!Thunks && thunks.length && fs.existsSync(originalthunksFile)) {
      // function expects an object with "Thunks" key and list of thunk objects
      let updatedthunks = require('./create_thunks_ducks')(modelName, {
        Thunks: thunks,
      });

      // console.log(updatedthunks)

      fs.readFile(originalthunksFile, (err, data) => {
        data = data.toString();

        if (err) {
          throw err;
        }

        // read the file and splice in the new thunks

        let top = data.slice(0, data.indexOf('export default'));
        let body = updatedthunks.slice(
          updatedthunks.indexOf('export const'),
          updatedthunks.indexOf('export default')
        );
        let bottom = data.slice(data.indexOf('export default'));
        bottom =
          bottom.slice(0, bottom.indexOf('}')) +
          thunks.reduce((a, b) => a + '\t' + Object.keys(b)[0] + ',', '') +
          '\n}';

        let newFile = top + body + bottom;

        fs.writeFile(
          originalthunksFile,
          newFile,

          () => {
            console.log(
              chalk.yellow(`updated the thunks file for ${modelName}`)
            );
          }
        );
      });
    } else if (!Thunks && thunks.length && !fs.existsSync(originalthunksFile)) {
      // function expects an object with "Thunks" key and list of thunk objects
      let updatedthunks = require('./create_thunks_ducks')(modelName, {
        Thunks: thunks,
      });

      fs.writeFile(
        originalthunksFile,
        updatedthunks,

        () => {
          console.log(chalk.yellow(`updated the thunks file for ${modelName}`));
        }
      );
    }
  });
};
