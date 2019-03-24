// this is a test file used only for writing purposes

import { expect } from "chai";
import fetchMock from "fetch-mock";
const { spawn } = require("child_process");

const shell = command => {
  let thisProc = spawn(command, { shell: true, stdio: "inherit" });

  return thisProc;
};

describe("generate method", () => {

  it("Rails model generates a valid store", (done) => {

    let storeGenerate = shell(`genie simdev 0`);

    storeGenerate.on("exit", async () => {

      const store = require("./../../store/store.js").default; // this is a wonky node -> front end issue

      let {
        countDux
      } = require("./../../store/actions/actions_for_Campus").default;
      
      expect( store.dispatch(countDux("blank"))).to.deep.equal({
        type: "COUNTDUX",
        payload: "blank"
      });
  
      const campusSlice = {
  		    Name: '',
  		      Quacking: true,
  		      Ducklings: {},
  		      Fly2Gether: true,
  		  }

      const URL = "/api/Dux";

      fetchMock.mock(URL, { data: campusSlice, status: 200 });

      const { getAll } = require("./../../store/actions/thunks_for_Campus");

      const campusList = store.getState().Campus_state.SingleCampus;

      // console.log('heres our thunk firing and threading through the entire store: ', await store.dispatch(getAll('blank')))
      // console.log('heres getState() returning something: ', store.getState())
      
      done()
     
    });
  });

  it("Ducks model generates a valid store", (done) => {

    let storeGenerate = shell(`genie simdev 1`);

    storeGenerate.on("exit", () => {

      const store = require("./../../store/store.js").default; // this is a wonky node -> front end issue

        let {
          quackOne
        } = require("./../../store/Campus/actions_for_Campus").default;

        expect( store.dispatch(quackOne("blank"))).to.deep.equal({
          type: "QUACKONE",
          payload: "blank"
        });

      done()

    });
  
  }); 

});




