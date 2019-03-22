
module.exports = (modelName, model) => {

  let modelNameCaps = modelName.toUpperCase();

  let returnStatement = `import actions from "./actions_for_${modelName}"\n`;

  let exportStatement = `\nexport default {`;

  model.Thunks.forEach(thunk => {

    thisThunk = Object.entries(thunk)[0]
  
    returnStatement += `\nexport const ${thisThunk[0]} = () => dispatch => {
  fetch('${thisThunk[1][0]}')
      .then((resp) => resp.json()) 
      .then(function(data) {
          dispatch(actions.${thisThunk[1][1]}(data))
  });
};\n`;

    exportStatement += "\n\t" + Object.entries(thunk)[0][0] + ','

  });

  return returnStatement + exportStatement + "\n}";
};
