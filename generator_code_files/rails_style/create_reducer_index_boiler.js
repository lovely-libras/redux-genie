let makeImportStatement = (modelName) => {

	return `import ${modelName}_state from 'reducer_for_${modelName}'\n`
}

module.exports = (modelNames) => {

let importStatements = modelNames.reduce((a,b) => a += makeImportStatement(b), '')

return `import { combineReducers } from 'redux'\n` +
		importStatements + '\n' +
		`export default combineReducers({\n` +
		modelNames.reduce((a,b)=> a += `	${b}_state,\n`, '') +
		'});'
}
