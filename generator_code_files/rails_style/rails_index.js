// code to generate a rails style structure

const fs = require('fs')
const action_boiler_Rails_model = require('./action_boiler_Rails_model')
const actionTypes_boiler = require('./constants_boiler')
const reducer_creator = require('./reducer_creator')
const combine_reducers = require('./combine_reducers_boiler')
const store_reducer = require('./store_boiler')
const chalk = require('chalk')
const thunks_Rails_model = require('./thunks_Rails_model')

module.exports = (Models, Thunks, Logging) => {
  // lets organize the information we'll need in the generator calls
  // below

  // let modelNames = Models.map(Model => (Model = Object.keys(Model)[0]));

  let modelNames = Models.map(
    Model =>
      (Model = Object.keys(Model)[0][0]
        .toUpperCase()
        .concat(Object.keys(Model)[0].slice(1)))
  )

  let crudedModelNames = Models.filter(model => !(model.CRUD === false))

  let userDefinedActions = Models.filter(model => model.Actions)

  // addedActions
  // thunkNames

  try {
    // heres the action creator file:
    // if actions declared separate on yaml
    // added action names to the action constants to be created
    // if no crud, delete crud from action call

    fs.writeFile(
      `./store/constants/action_constants_for_${modelNames}.js`,
      actionTypes_boiler(crudedModelNames, userDefinedActions),
      () => {
        console.log(chalk.yellow(`made action constants for ${modelNames}`))
      }
    )

    // create action types
    // same scenario gamed out like constants re: CRUD
    // and declared actions

    Models.forEach(model => {
      let modelName = Object.keys(model)[0][0]
        .toUpperCase()
        .concat(Object.keys(model)[0].slice(1))

      fs.writeFile(`./store/actions/selectors_for_${modelName}.js`, '', () => {
        console.log(chalk.yellow(`made selector file for ${modelName}`))
      })

      fs.writeFile(
        `./store/actions/actions_for_${modelName}.js`,
        action_boiler_Rails_model(modelName, model, Thunks),
        () => {
          console.log(chalk.yellow(`made action types for ${modelName}`))
        }
      )

      if (!Thunks && model.Thunks) {
        fs.writeFile(
          `./store/actions/thunks_for_${modelName}.js`,
          thunks_Rails_model(modelName, model, Thunks),
          () => {
            console.log(chalk.yellow(`made thunks for ${modelName}`))
          }
        )
      }
    })

    // create combine_reducers.js file

    fs.writeFile(
      './store/reducers/combine_reducers.js',
      combine_reducers(modelNames),
      () => {
        console.log(chalk.yellow('made combine_reducers.js file'))
      }
    )

    // create store.js file

    fs.writeFile('./store/store.js', store_reducer(Logging), () => {
      console.log(chalk.yellow('made store_reducer.js file'))
    })

    // create reducer for each model

    Models.forEach(model => {
      let modelName = Object.keys(model)[0][0]
        .toUpperCase()
        .concat(Object.keys(model)[0].slice(1))

      fs.writeFile(
        `./store/reducers/reducer_for_${modelName}.js`,
        reducer_creator(model, modelName),
        () => {
          console.log(chalk.yellow(`made reducer_creator for ${modelName}`))
        }
      )
    })
  } catch (err) {
    console.log(err)
  }
}
