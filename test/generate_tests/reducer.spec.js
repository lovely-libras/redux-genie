/*use strict*/
import { expect, should, equal } from "chai";
import { createSpy, spyOn, isSpy } from "expect";
import sinon from "sinon";
import sinonchai from "sinon-chai";
import fetchMock from "fetch-mock";
import store from "../../store/store";
import assert from "assert";
import mockStore from "redux-mock-store";
import { logger } from "../../store/store";

import nock from "../nockSetup";

//reducers
import reducer from "../../store/Campus/reducer_for_Campus"; //for ducks
// import reducer from "../../store/reducers/reducer_for_Campus"; //for rails

import {
  getAllCampus,
  createCampus
} from "../../store/Campus/actions_for_Campus"; //for ducks
// } from "../../store/actions/actions_for_Campus"; //for rails
import {
  GET_ALL_CAMPUS,
  GET_CAMPUS,
  ADD_CAMPUS
} from "../../store/Campus/action_constants_for_Campus"; //for ducks

// } from "../../store/constants/action_constants_for_Campus"; //for rails

describe("tests reducers. A reducer should return the new state after applying the action to the previous state, and that's the behavior tested below.", () => {
  it("should return the initial state", async () => {
    await expect(reducer(undefined, {})).to.deep.equal({
      CampusList: [],
      isLoading: false,
      SingleCampus: {
        Name: "",
        Quacking: true,
        Ducklings: {},
        Fly2Gether: true
      }
    });
  });

  it("should handle GET_ALL_CAMPUS", () => {
    const beforeState = {
      CampusList: [{ name: "campus1" }, { name: "campus2" }]
    };
    const action = { type: GET_ALL_CAMPUS };
    const afterState = reducer(beforeState, action);
    expect(afterState).to.deep.equal({
      CampusList: [{ name: "campus1" }, { name: "campus2" }]
    });
  });

  it("should handle GET_CAMPUS", () => {
    const beforeState = {
      CampusList: [{ name: "campus1!" }, { name: "campus2" }],
      SingleCampus: {}
    };
    const action = { type: GET_CAMPUS, payload: { name: "campus1!" } };
    const afterState = reducer(beforeState, action);
    console.log("REDUCERRRR", reducer);
    console.log("AFTERSTATE", afterState);
    expect(afterState).to.deep.equal({
      CampusList: [{ name: "campus1!" }, { name: "campus2" }],
      SingleCampus: { name: "campus1!" }
    });
  });
});
