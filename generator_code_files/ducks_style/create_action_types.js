// module.exports = modelName => {
	
//   let text = `
// \tGET_${modelName} : 'GET_${modelName}',
// \tGET_ALL_${modelName} : 'GET_ALL_${modelName}',
// \tADD_${modelName} : 'ADD_${modelName}',
// \tUPDATE_${modelName} : 'UPDATE_${modelName}',
// \tDELETE_${modelName} : 'DELETE_${modelName}'`

//   return `export default {\n ${text} \n}`;
// };



module.exports = (crudedModel, userDefinedActions, modelName) => {

	// create separate conditional branch if crud == true
	// model names can still exist if crud is false, because
	// user could declare separate action names

	// is CRUD true and are there named actions

  let crudMaker = modelName => {

  	modelName = modelName.toUpperCase()

    return `

	GET_${modelName} : 'GET_${modelName}',
	GET_ALL_${modelName} : 'GET_ALL_${modelName}',
	ADD_${modelName} : 'ADD_${modelName}',
	UPDATE_${modelName} : 'UPDATE_${modelName}',
	DELETE_${modelName} : 'DELETE_${modelName}',`;
  
  };

  let actionMaker = action => {
  	// console.log(action)

  	return `\t${action.toUpperCase()} : '${action.toUpperCase()}',\n`
  	// return model.Actions.reduce((a,b)=> (a += `\t${b.toUpperCase()} : '${b.toUpperCase()}',\n`), "")
  }

  let returnStatement = ''

  if(crudedModel){
  	returnStatement += crudMaker(modelName)

  }

  if(userDefinedActions){
  	returnStatement += userDefinedActions.reduce((a,b)=> (a += actionMaker(b)), "")
  }

	return "export default {" + returnStatement + "}"
			
};

