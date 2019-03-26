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

///DUCKS////////////////////////////////////////////////////////////////////////
// import reducer from "../../store/Campus/reducer_for_Campus"; //for ducks
// import {
//   getAllCampus,
//   createCampus
// } from "../../store/Campus/actions_for_Campus"; //for ducks
// const {
//   GET_ALL_CAMPUS,
//   GET_CAMPUS,
//   ADD_CAMPUS
// } = require("../../store/Campus/action_constants_for_Campus").default; //for ducks

///RAILS//////////////////////////////////////////////////////////////////////////

import reducer from "../../store/reducers/reducer_for_Campus"; //for rails

import {
  getAllCampus,
  createCampus
} from "../../store/actions/actions_for_Campus"; //for rails
const {
  GET_ALL_CAMPUS,
  GET_CAMPUS,
  ADD_CAMPUS
} = require("../../store/constants/action_constants").default; //for rails

//////////////////////////////////////////////////////////////////////////////////

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
      CampusList: []
    };
    const action = { type: GET_ALL_CAMPUS, payload: [{ name: "campus1" }] };
    const afterState = reducer(beforeState, action);
    expect(afterState).to.deep.equal({
      CampusList: [{ name: "campus1" }]
    });
  });

  it("should handle GET_CAMPUS", () => {
    const beforeState = {
      CampusList: [{ name: "campus1!" }, { name: "campus2" }],
      SingleCampus: {}
    };
    const actionTwo = { type: GET_CAMPUS, payload: { name: "campus1!" } };
    const afterState = reducer(beforeState, actionTwo);
    expect(afterState).to.deep.equal({
      CampusList: [{ name: "campus1!" }, { name: "campus2" }],
      SingleCampus: { name: "campus1!" }
    });
  });
});
