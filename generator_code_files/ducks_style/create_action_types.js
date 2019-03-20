module.exports = modelName => {
	
  let text = `
\tGET_${modelName} : 'GET_${modelName}',
\tGET_ALL_${modelName} : 'GET_ALL_${modelName}',
\tADD_${modelName} : 'ADD_${modelName}',
\tUPDATE_${modelName} : 'UPDATE_${modelName}',
\tDELETE_${modelName} : 'DELETE_${modelName}'`

  return `export default {\n ${text} \n}`;
};