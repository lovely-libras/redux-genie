// this is an action creator boiler plate for putting multiple model files
// into one big file- the Rail pattern option will create separate action creator
// files for each model

let bodyMaker = modelName => {
  return `const get${modelName} = ( payload ) => {

	return {
		type: actions.GET_${modelName},
		payload
	}
}

const getAll${modelName} = ( payload ) => {

	return {
		type: actions.GET_ALL_${modelName},
		payload
	}
}

const create${modelName} = ( payload ) => {

	return {

		type: actions.ADD_${modelName},
		payload
	}
}

const update${modelName} = ( payload ) => {

	return {

		type: actions.UPDATE_${modelName},
		payload
	}
}

const delete${modelName} = ( payload ) => {

	return {

		type: actions.DELETE_${modelName},
		payload
	}
}

`;
};

let exportStatementMaker = modelName => {
  return `
	get${modelName},
	getAll${modelName},
	create${modelName},
	update${modelName},
	delete${modelName}`;
};

module.exports = modelNames => {
  let body = modelNames.reduce((a, b) => (a += bodyMaker(b)), "");

  let exportStatement = modelNames.reduce(
    (a, b) => (a += exportStatementMaker(b)),
    ""
  );

  return (
    `import actions from "./actions"` +
    "\n\n" +
    body +
    `export default {\n` +
    exportStatement +
    `\n}`
  );
};
