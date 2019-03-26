import fetchMock from "fetch-mock";
const { spawn } = require("child_process");
const config = require('./config.dev')
const fs = require('fs')
import { expect, should, equal } from "chai";
// import { createSpy, spyOn, isSpy } from "expect";
import sinon from "sinon";
import sinonChai from "sinon-chai";
// import assert from "assert";
import mockStore from "redux-mock-store";
// import { logger } from "../../store/store";
import nock from "../nockSetup";
import chai from "chai";

const shell = command => {
  let thisProc = spawn(command, { shell: true, stdio: "inherit" });

  return thisProc;
};


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


describe("TWO FIRST SET OF TEST FOR Ducks", () => {

	before((done)=>{

		let storeGenerate = shell(`genie sim 1`);

		storeGenerate.on("exit", () => {
			
			console.log('exited')

		  done()
		})
	})

	it('Ducks store generates', (done)=>{


		done()
	})
})

describe("THESE ARE THE DUCKS TESTS THAT SHOULD FAIL- Ducks", () => {

	let actions, action_constants, store, reducer

	it("Generated Ducks model is a valid Redux store", (done) => {

		actions = require("../../store/Campus/actions_for_Campus").default; 

		action_constants = require("../../store/Campus/action_constants_for_Campus").default; 

		store = require("../../store/store").default;

		reducer = require("../../store/Campus/reducer_for_Campus").default; //for rails

	  done()	  

	}); 

	it("should create an action to get a campus", (done) => {

		let payload = "other thing";

		const expectedAction = {
		  type: action_constants.GET_CAMPUS,
		  payload
		};

		expect(actions.getCampus(payload)).to.deep.equal(expectedAction);
		done()
	});

	it("should create an action to get all campuses", (done) => {

		let payload = "something";
		
		const expectedAction = {
		  type: action_constants.GET_ALL_CAMPUS,
		  payload
		};
		
		expect(actions.getAllCampus(payload)).to.deep.equal(expectedAction);
		done()
	});

	it("should create an action to add a campus", (done) => {

		let payload = "another thing";
		
		const expectedAction = {
		  type: action_constants.ADD_CAMPUS,
		  payload
		};

		expect(actions.createCampus(payload)).to.deep.equal(expectedAction);

		done()
	});

	it("should handle GET_ALL_CAMPUS", (done) => {

		const { GET_ALL_CAMPUS } = action_constants

	    
	    const beforeState = {
	      CampusList: []
	    };

	    const action = { type: GET_ALL_CAMPUS, payload: [{ name: "campus1" }] };

	    const afterState = reducer(beforeState, action);
	    
	    expect(afterState).to.deep.equal({
	      CampusList: [{ name: "campus1" }]
	    });
	  
	  	done()
	});

	it("should handle GET_CAMPUS", (done) => {

		const { GET_CAMPUS } = action_constants

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
	
		done()
	});

});

describe("ONE generate method- Ducks", () => {

	it('Ducks store generates', (done)=>{

		let storeGenerate = shell(`genie sim 1`);

		storeGenerate.on("exit", () => {

		  done()
		})
	})

	it("should get all campus in the store", async () => {

		let {
		  getAll
		} = require("../../store/Campus/thunks_for_Campus").default; 

		const store = require("../../store/store").default;

		await store.dispatch(getAll());

	    const campusList = store.getState().Campus_state.CampusList;
	    
	    expect(campusList).to.deep.equal(campuses);

	});	

	it("should return the initial state", async () => {

		const reducer = require("../../store/Campus/reducer_for_Campus").default

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

	// it("should call the logger", async () => {

	// 	const { logger } = require("../../store/store")
	// 	const store = require("../../store/store").default
	// 	const { getAll } = require("../../store/Campus/thunks_for_Campus").default; 
	// 	chai.use(sinonChai);

	// 	const spy = sinon.spy();
	// 	spy(store);
	  	
	//     await store.dispatch(getAll());

	//     expect(spy).to.have.been.called;
	// });
})
