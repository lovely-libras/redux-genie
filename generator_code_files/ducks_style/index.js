const chalk = require("chalk");
const fs = require("fs");
const create_action_types = require("./create_action_types");
const create_action_creators = require("./create_action_creators")
const create_reducer = require("./create_reducer")

module.exports = (model, modelName) => {
  try {

    // make action types

    fs.writeFile(
      `./store/${modelName}/${modelName}_action_types.js`,
      create_action_types(modelName.toUpperCase()),
      () => {
        console.log(chalk.yellow(`made action types for ${modelName}`));
      }
    );

    // make action creators

    fs.writeFile(
      `./store/${modelName}/${modelName}_action_creators.js`,
      create_action_creators(modelName),
      () => {
        console.log(chalk.yellow(`made action creators for ${modelName}`));
      }
    );

    // make reducers

    fs.writeFile(
      `./store/${modelName}/${modelName}_reducer.js`,
      create_reducer(model, modelName),
      () => {
        console.log(chalk.yellow(`made reducer for ${modelName}`));
      }
    )

  } catch (error) {
    console.log(error);
  }
};
