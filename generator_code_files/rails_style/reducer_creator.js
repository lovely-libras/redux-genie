module.exports = (Model, name) => {
  const inputConversion = arg => {
    arg = arg.toLowerCase();
    if (arg === "string") {
      return `''`;
    } else if (arg === "boolean") {
      return true;
    } else if (arg === "array") {
      return `[]`;
    } else if (arg === "object") {
      return `{}`;
    } else if (arg === "number") {
      return `0`;
    }
  };

  return `import actions from "./../actions/action_types_for_${name.toUpperCase()}"

const initialState = {
	${name}List : [],
	isLoading: false,
	Single${name}: {
		${Model[name]
      .map(trait => {
        const key = Object.keys(trait)[0];
        let value = Object.values(trait)[0];
        value = inputConversion(value);
        return `${key}: ${value}, \n        `;
      })
      .join("")
      .trim()}
	}
}

export default function ${name}_reducer (state = initialState, action) {
	
	switch (action.type) {

		case actions.GET_${name.toUpperCase()}: {
			
			return { ...state, Single${name}: action.payload }
		}

		case actions.GET_ALL_${name.toUpperCase()}: {
			
			return { ...state, ${name}List: [...action.payload]}
		}

		case actions.ADD_${name.toUpperCase()}: {

			return { ...state, ${name}List: [...state.${name}List, action.payload ] }
		}

		case actions.UPDATE_${name.toUpperCase()}: {
			const updated${name} = state.${name}List.filter(item => item.id === action.payload.id)

			return {...state, Single${name}: updated${name}}
		}

		case actions.DELETE_${name.toUpperCase()}: {
			const updated${name} = state.${name}List.filter(item => item.id !== action.payload.id)

			return {...state, Single${name}: updated${name}}
		}

		default:
		  return state
	}
}`;
};
