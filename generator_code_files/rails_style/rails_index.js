// code to generate a rails style structure

const fs = require("fs");
const action_boiler_Rails_model = require('./action_boiler_Rails_model')
const actionTypes_boiler = require('./constants_boiler')
const reducer_creator = require('./reducer_creator')
const combine_reducers = require('./combine_reducers_boiler')
const store_reducer = require('./store_boiler')

module.exports = (Models) => {

    let modelNames = Models.map( Model => Model = Object.keys(Model)[0] )

    try{ 

      fs.writeFile(
        "./store/constants/action_constants.js",
        actionTypes_boiler(modelNames),
        () => {
          console.log("actionTypes_boiler");
        }
      );

      // create action types

      modelNames.forEach(modelName=> {

        fs.writeFile(
          `./store/actions/action_types_for_${modelName}.js`,
          action_boiler_Rails_model(modelName),
          () => {
            console.log(`made action types for ${modelName}`);
          }
        )
        })

      // create combine_reducers.js file

      fs.writeFile(
        "./store/reducers/combine_reducers.js",
        combine_reducers(modelNames),
        () => {
          console.log("made the combine_reducers.js file");
        }
      );


      // create store.js file

      fs.writeFile(
        "./store/store.js",
        store_reducer(),
        () => {
          console.log("made the store_reducer.js file");
        }
      );

      // create reducer for each model

      Models.forEach(model => {

        let name = Object.keys(model)[0]

        fs.writeFile(
          `./store/reducers/${name}_reducer.js`,
          reducer_creator(model, name),
          () => {
            console.log(`made reducer_creator for ${name}`);
          }

      );
      
      });
    }
    catch(err){
      console.log(err)
    }
}