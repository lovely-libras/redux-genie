const chalk = require('chalk')
const fs = require('fs')
const create_action_types = require('./create_action_types')
const create_action_creators = require('./create_action_creators')
const create_reducer = require('./create_reducer')
const thunk_creator = require('./create_thunks_ducks')

module.exports = (model, modelName, Thunks, Logging) => {
  modelName = modelName[0].toUpperCase().concat(modelName.slice(1))

  try {
    // make action types

    fs.writeFile(
      `./store/${modelName}/action_constants_for_${modelName}.js`,
      create_action_types(modelName.toUpperCase()),
      () => {
        console.log(chalk.yellow(`made action types for ${modelName}`))
      }
    )

    fs.writeFile(
      `./store/${modelName}/selectors_for_${modelName}.js`,
      '',
      () => {
        console.log(chalk.yellow(`made selector file for ${modelName}`))
      }
    )

    // make action creators

    fs.writeFile(
      `./store/${modelName}/actions_for_${modelName}.js`,
      create_action_creators(modelName, model, Thunks),
      () => {
        console.log(chalk.yellow(`made action creators for ${modelName}`))
      }
    )

    // make thunks if not included

    if (!Thunks && model.Thunks) {
      fs.writeFile(
        `./store/${modelName}/thunks_for_${modelName}.js`,
        thunk_creator(modelName, model),
        () => {
          console.log(chalk.yellow(`made thunks for ${modelName}`))
        }
      )
    }

    // make reducers

    fs.writeFile(
      `./store/${modelName}/reducer_for_${modelName}.js`,
      create_reducer(model, modelName),
      () => {
        console.log(chalk.yellow(`made reducer for ${modelName}`))
      }
    )
  } catch (error) {
    console.log(error)
  }
}
