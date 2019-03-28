module.exports = (modelName, model) => {

  let modelNameCaps = modelName.toUpperCase();

  let returnStatement = `import actions from "../actions/actions_for_${modelName}"\n`;

  let exportStatement = `\nexport default {`;

  model.Thunks.forEach(thunk => {

    let thunkName 
    let returnAction 
    let endpoint 

    if(typeof thunk === 'string'){
      thunkName = thunk
      endpoint = null
      returnAction = null
    }
    else if(typeof thunk === 'object'){

      thisThunk = Object.entries(thunk)[0];

      thunkName = thisThunk[0]

      if(!thisThunk[1]){

        endpoint = null
        returnAction = null
      }
      else if(thisThunk[1][1] && thisThunk[1][0]){

        endpoint = thisThunk[1][0]
        returnAction  = thisThunk[1][1]
      }
      else if(thisThunk[1][1]){
        returnAction  = thisThunk[1][1]
      }
      else if(thisThunk[1][0]){
        endpoint = thisThunk[1][0]
      }
    }
    
    returnStatement += `\nexport const ${thunkName} = () => dispatch => {
 
  return fetch('${endpoint}')
      .then((resp) => resp.json()) 
      .then(function( {data} ) {
 
          dispatch(actions.${returnAction}(data))
  });
};\n`;

    exportStatement += "\n\t" + Object.entries(thunk)[0][0] + ','

  });

  return returnStatement + exportStatement + "\n}";
};
