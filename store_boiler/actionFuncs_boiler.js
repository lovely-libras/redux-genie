let bodyMaker = modelName => {
  return `const get${modelName
    .charAt(0)
    .toUpperCase()
    .concat(modelName.slice(1))} = ( data ) => {

	return {
		type: actions.GET_${modelName.toUpperCase()},
		data
	}
}

const getAll${modelName
    .charAt(0)
    .toUpperCase()
    .concat(modelName.slice(1))} = ( data ) => {

	return {
		type: actions.GET_ALL_${modelName.toUpperCase()},
		data
	}
}

const create${modelName
    .charAt(0)
    .toUpperCase()
    .concat(modelName.slice(1))} = ( data ) => {

	return {

		type: actions.ADD_${modelName.toUpperCase()},
		data
	}
}

const update${modelName
    .charAt(0)
    .toUpperCase()
    .concat(modelName.slice(1))} = ( data ) => {

	return {

		type: actions.UPDATE_${modelName.toUpperCase()},
		data
	}
}

const delete${modelName
    .charAt(0)
    .toUpperCase()
    .concat(modelName.slice(1))} = ( data ) => {

	return {

		type: actions.DELETE_${modelName.toUpperCase()},
		data
	}
}

`;
};

let exportStatementMaker = modelName => {
  return `
	get${modelName
    .charAt(0)
    .toUpperCase()
    .concat(modelName.slice(1))},
	getAll${modelName
    .charAt(0)
    .toUpperCase()
    .concat(modelName.slice(1))},
	create${modelName
    .charAt(0)
    .toUpperCase()
    .concat(modelName.slice(1))},
	update${modelName
    .charAt(0)
    .toUpperCase()
    .concat(modelName.slice(1))},
	delete${modelName
    .charAt(0)
    .toUpperCase()
    .concat(modelName.slice(1))}`;
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
