module.exports = (modelNames) => {

let axnMaker = (modelName) => {
return `

	// actions for ${modelName}
	GET_${modelName.toUpperCase()} : 'GET_${modelName.toUpperCase()}',
	GET_ALL_${modelName.toUpperCase()} : 'GET_ALL_${modelName.toUpperCase()}',
	ADD_${modelName.toUpperCase()} : 'ADD_${modelName.toUpperCase()}',
	UPDATE_${modelName.toUpperCase()} : 'UPDATE_${modelName.toUpperCase()}',
	DELETE_${modelName.toUpperCase()} : 'DELETE_${modelName.toUpperCase()}'`
}

let axns = modelNames.reduce((a,b) => a += axnMaker(b), '')

return 'export default {' + axns + '\n}'

}