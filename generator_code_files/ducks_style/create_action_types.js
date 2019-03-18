module.exports = modelName => {
	
  let text = 
	`GET_${modelName} : 'GET_${modelName}',
	GET_ALL_${modelName} : 'GET_ALL_${modelName}',
	ADD_${modelName} : 'ADD_${modelName}',
	UPDATE_${modelName} : 'UPDATE_${modelName}',
  DELETE_${modelName} : 'DELETE_${modelName}'`

  return `export default { ${text} }`;
};