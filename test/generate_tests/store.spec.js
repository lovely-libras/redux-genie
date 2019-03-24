/*

import { expect } from "chai";
import fetchMock from "fetch-mock";
import store from "../../store/store";
import {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne
  //} from "../../store/Campus/thunks_for_Campus";// for ducks
} from "../../store/actions/thunks_for_Campus"; //for rails

const { spawn } = require("child_process");

const shell = command => {
  let thisProc = spawn(command, { shell: true, stdio: "inherit" });

  return thisProc;
};

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

/*

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

describe("campuses", () => {

  it("should get all campus in the store", async () => {

    await store.dispatch(getAll());

    const campusList = store.getState().Campus_state.CampusList;
    
    expect(campusList).to.deep.equal(campuses);
  
  });

  xit("add a campus", async () => {

    let myThunk = await store.dispatch( createOne(newCampus) );
      // 

    console.log('createOne: ', myThunk)

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
*/
