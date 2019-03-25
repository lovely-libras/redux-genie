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

//action creators
import actions from "../../store/Campus/actions_for_Campus"; //ducks
// import actions from "../../store/actions/actions_for_Campus"; //rails

//action constants
import action_constants from "../../store/Campus/action_constants_for_Campus"; //for ducks
// import action_constants from "../../store/constants/action_constants_for_Campus"; //for rails

//thunks
import {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne
} from "../../store/Campus/thunks_for_Campus"; // for ducks
// } from "../../store/actions/thunks_for_Campus"; //for rails

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

//////////////////////////////////////////////////////////////////////

const campuses = [
  { Name: "campus1", address: "not here yet" },
  { Name: "campus2" }
];

const newCampus = { Name: "campusNew" };
const oneCampus = {
  Name: "campus1",
  Quacking: true,
  Ducklings: {},
  Fly2Gether: true
};

const oneUpdatedCampus = { Name: "campus1", address: "something" };

//////////////////////////////////////////////////////////////////////
const URL = "/api/Dux";
fetchMock.mock(URL, { data: campuses, status: 200 });

const getOneURL = `/api/Dux/${oneCampus.Name}`;
fetchMock.mock(getOneURL, { data: oneCampus, status: 201 });

const updateOneURL = `/api/Dux/${oneCampus.Name}`;
fetchMock.put(
  updateOneURL,
  { data: "notCampus", status: 203 },
  { overwriteRoutes: false }
);
const { spawn } = require("child_process");

const shell = command => {
  let thisProc = spawn(command, { shell: true, stdio: "inherit" });

  return thisProc;
};

///////////////////////////////////////////////////////////////////////

describe("overall integration test using thunks", () => {
  it("should get all campus in the store", async () => {
    await store.dispatch(getAll());
    const campusList = store.getState().Campus_state.CampusList;
    expect(campusList).to.deep.equal(campuses);
  });

  it("add a campus", async () => {
    await store.dispatch(createOne(newCampus));

    const campusAdded = store.getState().Campus_state.CampusList;
    expect(campusAdded).to.deep.equal(campuses.concat(newCampus));
  });

  it("get a single campus", async () => {
    await store.dispatch(getOne("campus1"));

    const singleCampus = store.getState().Campus_state.SingleCampus;
    expect(singleCampus).to.deep.equal("campus1");
  });

  /////////////////////////////////////////////////////////////////////////
  // it("update campus", async () => {
  //   await store.dispatch(updateOne({ name: "campus1", address: "something" }));

  //   const singleCampus = store.getState().Campus_state.CampusList;
  //   expect(singleCampus).to.deep.equal([
  //     { name: "campus1", address: "something" },
  //     { name: "campus2" },
  //     { name: "campusNew" }
  //   ]);
  // });

  // it("delete newCampus campus", async () => {
  //   await store.dispatch(deleteOne(oneUpdatedCampus));

  //   const deleteOneCampus = store.getState().Campus_state.CampusList;
  //   expect(deleteOneCampus).to.deep.equal([
  //     { name: "campus2" },
  //     { name: "campusNew" }
  //   ]);
  // });
});

describe("tests action creators", () => {
  it("should create an action to get a campus", () => {
    let payload = "other thing";
    const expectedAction = {
      type: action_constants.GET_CAMPUS,
      payload
    };
    expect(actions.getCampus(payload)).to.deep.equal(expectedAction);
  });

  it("should create an action to get all campuses", () => {
    let payload = "something";
    const expectedAction = {
      type: action_constants.GET_ALL_CAMPUS,
      payload
    };
    expect(actions.getAllCampus(payload)).to.deep.equal(expectedAction);
  });

  it("should create an action to add a campus", () => {
    let payload = "another thing";
    const expectedAction = {
      type: action_constants.ADD_CAMPUS,
      payload
    };
    expect(actions.createCampus(payload)).to.deep.equal(expectedAction);
  });
});
