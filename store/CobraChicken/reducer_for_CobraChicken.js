import actions from "./action_constants_for_COBRACHICKEN"

const initialState = {
  CobraChickenList : [],
  isLoading: false,
  SingleCobraChicken: {
    feathers: '', 
      confirmedKills: 0, 
      isHunting: true, 
      targets: [], 
      flockMembers: {},
  }
}

export default function CobraChicken_reducer (state = initialState, action) {
  
  switch (action.type) {

    case actions.FLYTOGETHER: {

      return { ...state }
    }
    
    case actions.HUNTTOGETHER: {

      return { ...state }
    }
    
    case actions.SLAYTOGETHER: {

      return { ...state }
    }
    
    default:
      return state
  }
}