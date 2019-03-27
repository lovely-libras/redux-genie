module.exports = (crudedModelNames, userDefinedActions) => {

  let crudMaker = modelName => {

  	modelName = Object.keys(modelName)[0].toUpperCase()

    return `
    GET_${modelName} : 'GET_${modelName}',
	GET_ALL_${modelName} : 'GET_ALL_${modelName}',
	ADD_${modelName} : 'ADD_${modelName}',
	UPDATE_${modelName} : 'UPDATE_${modelName}',
	DELETE_${modelName} : 'DELETE_${modelName}',`;
  };

  let actionMaker = model => {

  	return model.Actions.reduce((a,b)=> (a += `\t${b.toUpperCase()} : '${b.toUpperCase()}',` + '\n'), "")
  }

	return ( "export default {\n" 
			+ crudedModelNames.reduce((a, b) => (a += crudMaker(b)), "") 
			+ '\n'
			+ userDefinedActions.reduce((a,b)=> (a += actionMaker(b)), "") 
			+ "}"
			)
};
