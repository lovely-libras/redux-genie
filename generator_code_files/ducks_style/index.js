const chalk = require('chalk')
const fs = require("fs");
const create_action_types = require('./create_action_types')


module.exports = (model, modelName) => {

  try {
    fs.writeFile(`./store/${modelName}/${modelName}_action_types.js`,
      create_action_types(modelName.toUpperCase()),
      () => {
        console.log(chalk.yellow(`made action types for ${modelName}`));
      }
    )
  } catch (error) {
    console.log(error)
  }

}