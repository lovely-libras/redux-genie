module.exports = (modelName, model) => {
  let modelNameCaps = modelName.toUpperCase()

  let returnStatement = `import actions from "../constants/action_constants"\n`

  let exportStatement = `\nexport default {`

  model.Thunks.forEach(thunk => {
    returnStatement += `\nexport const ${
      Object.entries(thunk)[0][0]
    } = () => dispatch => {
  fetch('${Object.entries(thunk)[0][1]}')
      .then((resp) => resp.json())
      .then(function(data) {
          dispatch(data)
  });
};\n`

    exportStatement += '\n\t' + Object.entries(thunk)[0][0] + ','
  })

  return returnStatement + exportStatement + '\n}'
}
