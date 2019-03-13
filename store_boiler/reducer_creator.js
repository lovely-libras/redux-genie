module.exports = (modelName, initialState) => {
  return `import actions from "./../constants/action_constants"


const initialState = {
	${modelName}List : [],
	Single${modelName}: {}
}

export default function ${modelName}_reducer (state = initialState, action) {
	
	switch (action.type) {

		case actions.GET_${modelName.toUpperCase()}: {
			return { ...state, Single${modelName}: action.payload }
		}

		case actions.GET_ALL_${modelName.toUpperCase()}: {
			
			return { ...state, ${modelName}List: [...action.payload]}
		}

		case actions.ADD_${modelName.toUpperCase()}: {
			return { ...state, ${modelName}List: [...state.${modelName}List, action.payload ] }
		}

		case actions.UPDATE_${modelName.toUpperCase()}: {
			const updated${modelName} = state.${modelName}List.filter(item => item.id === action.payload.it)

			return {...state, Single${modelName}: updated${modelName}}
		}

		case actions.DELETE_${modelName.toUpperCase()}: {
			const updated${modelName} = state.${modelName}List.filter(item => item.id !== action.payload.it)

			return {...state, Single${modelName}: updated${modelName}}
		}

		default:
		  return state
	}
}`;
};
