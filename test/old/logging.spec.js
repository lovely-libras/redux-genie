import { expect, equal } from "chai";

import nock from "nock";
import todosReducer, {
  initialState
  // } from "../../store/reducers/reducer_for_Campus";//rails
} from "../../store/Campus/reducer_for_Campus"; //ducks

// import { getCampus } from "../../store/actions/actions_for_Campus"; //rails
// import { createOne } from "../../store/actions/thunks_for_Campus"; //rails

import { getCampus } from "../../store/Campus/actions_for_Campus"; //ducks
import { getAll } from "../../store/Campus/thunks_for_Campus"; //ducks

import createStore from "../../store/store";

const campuses = [
  { name: "campus1", address: "not here yet" },
  { name: "campus2" }
];

// describe("testing middleware with add a new campus", () => {
//   let store;
//   beforeEach(() => {
//     // create a new store instance for each test

//     store = createStore; //from store.js file
//   });

//   it("should get campuses from the store", () => {
//     store.dispatch(getAll());
//     // console.log("STORE!!", store.getState());

//     return store.dispatch(getAll()).then(() => {
//       expect(store.getState().Campus_state).to.equal({
//         CampusList: campuses,
//         isLoading: false,
//         SingleCampus: {
//           Name: "",
//           Quacking: true,
//           Ducklings: {},
//           Fly2Gether: true
//         }
//       });
//     });
//   });
// });
