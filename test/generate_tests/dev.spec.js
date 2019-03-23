// this is a test file used only for writing purposes

import { expect } from "chai";
import fetchMock from "fetch-mock";
const { spawn } = require("child_process");

const shell = command => {
  let thisProc = spawn(command, { shell: true, stdio: "inherit" });

  return thisProc;
};
/*
describe("testZero- generate method- Rails", () => {
  beforeEach(done => {
    let storeGenerate = shell("genie sim 0");

    storeGenerate.on("exit", async () => {
      done();
    });
  });

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
