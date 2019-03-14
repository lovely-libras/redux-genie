// code to generate a rails style structure

const fs = require("fs");
const {
  action_boiler_Rails_model,
  actionTypes_boiler,
  reducer_creator,
  combine_reducers,
  store_reducer
} = require("./../../boiler_index").rails;

module.exports = (modelNames) => {

    console.log('hitting rails index')

      fs.writeFile(
        "./POC_boiler/store/constants/action_constants.js",
        actionTypes_boiler(modelNames),
        () => {
          console.log("actionTypes_boiler");
        }
      );

      // create combine_reducers.js file

      fs.writeFile(
        "./POC_boiler/store/reducers/combine_reducers.js",
        combine_reducers(modelNames),
        () => {
          console.log("made the combine_reducers.js file");
        }
      );

      // create store.js file

      fs.writeFile(
        "./POC_boiler/store/store.js",
        store_reducer(),
        () => {
          console.log("made the store_reducer.js file");
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
}