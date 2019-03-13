module.exports = (modelName, initialState) => {

return `import action_constants as actions from "./../constants/action_constants"

_ = require('lodash')

const initialState = {
	...initialState,
	${modelName}List : {}
}

export default function ${modelName}_reducer (state = initialState, action) {
	
	switch (action.type) {

		case actions.GET_${modelName.toUpperCase()}: {

			let key = Object.keys(action.data)[0]

			return {...state, ${modelName}List : { key  } }
		}

		case actions.GET_ALL_${modelName.toUpperCase()}: {
			
			return {...state, ${modelName}List : action.data }
		}

		case actions.ADD_${modelName.toUpperCase()}: {

			let key = Object.keys(action.data)[0]
			let value = Object.keys(action.data)[1]
			
			return {...state, ${modelName}List : { key : value } }
		}

		case actions.UPDATE_${modelName.toUpperCase()}: {

			let key = Object.keys(action.data)[0]
			let value = Object.keys(action.data)[1]
			
			return {...state, ${modelName}List : { key : value } }
		}

		case actions.DELETE_${modelName.toUpperCase()}: {

			let key = Object.keys(action.data)[0]
	
			return { _.omit(state, [ key ] ) }
		}

		default:
		  return state
	}
}`


}
