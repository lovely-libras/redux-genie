import { expect, equal } from "chai";

import nock from "nock";
import todosReducer, {
  initialState
} from "../../store/reducers/reducer_for_Campus";
import { getCampus } from "../../store/actions/actions_for_Campus";
import { createOne } from "../../store/actions/thunks_for_Campus";

import createStore from "../../store/store";

describe("testing middleware with add a new campus", () => {
  let store;
  beforeEach(() => {
    // create a new store instance for each test
    store = createStore; //from store.js file
  });

  it("should get campuses from the store", () => {
    store.dispatch(createOne({ payload: { name: "campus1" } }));
    // console.log("STORE!!", store.getState());

    return store.dispatch(createOne({ name: "campus1" })).then(() => {
      expect(store.getState()).to.equal([
        {
          CampusList: [],
          isLoading: false,
          SingleCampus: {
            Name: "",
            Quacking: true,
            Ducklings: {},
            Fly2Gether: true
          }
        }
      ]);
    });
  });
});
