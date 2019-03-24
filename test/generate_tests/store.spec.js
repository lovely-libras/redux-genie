import { expect } from "chai";
import fetchMock from "fetch-mock";
import store from "../../store/store";
import assert from "assert";
import mockStore from "redux-mock-store";

import nock from "../nockSetup";

/*
describe("Rails model", () => {
  // beforeEach(done => {
  //   let storeGenerate = shell("genie sim 0");

  //   storeGenerate.on("exit", async () => {
  //     done();
  //   });
  // });

  it("generates a valid store", async () => {
    const store = require("./../../store/store.js").default; // this is a wonky node -> front end issue

    try {
      //    const campusSlice = {
      // 		    Name: '',
      // 		      Quacking: true,
      // 		      Ducklings: {},
      // 		      Fly2Gether: true,
      // 		  }

      // const URL = "/api/Dux";

      // fetchMock.mock(URL, { data: campusSlice, status: 200 });

      const {
        countDux
      } = require("./../../store/actions/actions_for_Campus").default;
      // const { getAll } = require("./../../store/Campus/thunks_for_Campus");

      // const campusList = await store.getState().Campus_state.SingleCampus;

      expect(store.dispatch(countDux("blank"))).to.deep.equal({
        type: "COUNTDUX",
        payload: "blank"
      });

      expect();
    } catch (err) {
      console.log(err);
    }

    // store.dispatch(actions.getAllCampus(campuses));

    // const data = await fetch(URL).then(res => res.json());
    // console.log(data, "data!!!!!!!!");
  });

  /*


		it dispatches actions to update the store
		it 

  	*/
// });

//action creators
import actions from "../../store/actions/actions_for_Campus"; //rails
// import actions from "../../store/Campus/actions_for_Campus" //ducks

//action constants
import action_constants from "../../store/constants/action_constants_for_Campus";

import {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne
  //} from "../../store/Campus/thunks_for_Campus";// for ducks
} from "../../store/actions/thunks_for_Campus"; //for rails

const campuses = [
  { name: "campus1", address: "not here yet" },
  { name: "campus2" }
];
const newCampus = { name: "campusNew" };
const oneCampus = { name: "campus1" };
const oneUpdatedCampus = { name: "campus1", address: "something" };

const URL = "/api/Dux";
fetchMock.mock(URL, { data: campuses, status: 200 });

const getOneURL = `/api/Dux/${oneCampus}`;
fetchMock.mock(getOneURL, { data: campuses, status: 201 });

const updateOneURL = `/api/Dux/${oneUpdatedCampus}`;
fetchMock.mock(
  updateOneURL,
  { data: campuses, status: 203 },
  { overwriteRoutes: false }
);
const { spawn } = require("child_process");

const shell = command => {
  let thisProc = spawn(command, { shell: true, stdio: "inherit" });

  return thisProc;
};

describe("overall integration test using thunks", () => {
  it("should get all campus in the store", async () => {
    await store.dispatch(getAll());
    const campusList = store.getState().Campus_state.CampusList;
    console.log(campusList, "campusList!!!!!");
    expect(campusList).to.deep.equal(campuses);
  });

  it("add a campus", async () => {
    await store.dispatch(createOne(newCampus));

    const campusAdded = store.getState().Campus_state.CampusList;
    expect(campusAdded).to.deep.equal(campuses.concat(newCampus));
  });

  it("get a single campus", async () => {
    await store.dispatch(getOne(oneCampus));

    const singleCampus = store.getState().Campus_state.CampusList;
    expect(singleCampus).to.deep.equal(singleCampus);
  });

  it("update campus", async () => {
    await store.dispatch(updateOne(oneUpdatedCampus));

    const singleCampus = store.getState().Campus_state.CampusList;
    expect(singleCampus).to.deep.equal([
      { name: "campus1", address: "something" },
      { name: "campus2" },
      { name: "campusNew" }
    ]);
  });

  it("delete newCampus campus", async () => {
    await store.dispatch(deleteOne(oneUpdatedCampus));

    const deleteOneCampus = store.getState().Campus_state.CampusList;
    expect(deleteOneCampus).to.deep.equal([
      { name: "campus2" },
      { name: "campusNew" }
    ]);
  });
});

import {
  getAllCampus,
  createCampus
} from "../../store/actions/actions_for_Campus"; //rails
import {
  GET_ALL_CAMPUS,
  ADD_CAMPUS
} from "../../store/constants/action_constants_for_Campus";

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

describe("thunk returns a function", () => {});

describe("tests reducers. A reducer should return the new state after applying the action to the previous state, and that's the behavior tested below.", () => {});

describe("tests logging middleware", () => {});
