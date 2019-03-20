// this is an action creator boiler plate for the Rail pattern
// separate file for each model

module.exports = (modelName, model, Thunks) => {
  let modelNameCaps = modelName.toUpperCase();

  let returnStatement = `import actions from "../constants/action_constants"\n`;

  let exportStatement = `\nexport default {`;

  model.Thunks.forEach(thunk => {
    console.log(Object.entries(thunk)[0][1], "thunk!!!");
    returnStatement += `
  export const ${Object.entries(thunk)[0][0]} = () => dispatch => {
      fetch('${Object.entries(thunk)[0][1]}')
          .then((resp) => resp.json()) 
          .then(function(data) {
              dispatch(data)
    });
  };\n`;
  });

  return returnStatement + exportStatement + "\n}";
};
