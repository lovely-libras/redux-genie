module.exports = modelNames => {
  let axnMaker = modelName => {
    return `
	GET_${modelName.toUpperCase()} : 'GET_${modelName.toUpperCase()}',
	GET_ALL_${modelName.toUpperCase()} : 'GET_ALL_${modelName.toUpperCase()}',
	ADD_${modelName.toUpperCase()} : 'ADD_${modelName.toUpperCase()}',
	UPDATE_${modelName.toUpperCase()} : 'UPDATE_${modelName.toUpperCase()}',
	DELETE_${modelName.toUpperCase()} : 'DELETE_${modelName.toUpperCase()}'`;
  };

  // let axns = modelNames.reduce((a,b) => a += axnMaker(b), '')
  let newAxns = axnMaker(modelNames);
  console.log(newAxns, "what is newaxns");
  return "export default {" + newAxns + "\n}";
};
