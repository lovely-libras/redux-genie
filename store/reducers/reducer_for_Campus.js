import {
  GET_ALL_CAMPUS,
  ADD_CAMPUS
} from "../constants/action_constants_for_Campus";

export const initialState = {
  CampusList: [],
  isLoading: false,
  SingleCampus: {
    Name: "",
    Quacking: true,
    Ducklings: {},
    Fly2Gether: true
  }
};

export default function Campus_reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CAMPUS: {
      console.log("hitting get_all_campus");
      return { ...state, CampusList: action.payload };
    }

    case ADD_CAMPUS:
      console.log("hitting add_campus reducer");
      return { ...state, CampusList: [...state.CampusList, action.payload] };

    // case actions.countDux: {
    //   return { ...state };
    // }

    // case actions.migrateDux: {
    //   return { ...state };
    // }

    // case actions.quackOne: {
    //   return { ...state };
    // }

    default:
      return state;
  }
}
