// code to generate a rails style structure

const fs = require("fs");

const action_boiler_Rails_model = require('./generator_code_files/rails_style/action_boiler_Rails_model'),
const actionTypes_boiler = require('./generator_code_files/rails_style/constants_boiler'),
const reducer_creator = require('./generator_code_files/rails_style/reducer_creator'),
const combine_reducers = require('./generator_code_files/rails_style/combine_reducers_boiler'),
const store_reducer = require('./generator_code_files/rails_style/store_boiler')

module.exports = (modelNames) => {

    try{ 

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
    catch(err){
      console.log(err)
    }
}