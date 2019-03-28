import fetchMock from "fetch-mock";
const { spawn } = require("child_process");
const fs = require('fs')
import { expect, should, equal } from "chai";
// import { createSpy, spyOn, isSpy } from "expect";
import sinon from "sinon";
import sinonChai from "sinon-chai";
// import assert from "assert";
import mockStore from "redux-mock-store";
// import { logger } from "../../store/store";
import nock from "./nockSetup";
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

let sim = Number(process.env.sim)
const simCommand = `mode=testing genie sim ${sim}`

if(sim === 0){

describe("Rails Integration Tests", () => {

	let actions, action_constants, store, reducer

	it('Rails store generates', (done)=>{

		let storeGenerate = shell(simCommand

		storeGenerate.on("exit", () => {

		  done()
		})

	})	

	it("Generated Rails model is a valid Redux store", (done) => {

		actions = require("../store/actions/actions_for_Campus").default; 

		action_constants = require("../store/constants/action_constants").default; 

		store = require("../store/store").default;

		reducer = require("../store/reducers/reducer_for_Campus").default; //for rails

		expect(typeof actions).to.equal('object')

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


describe("Rails Integration Tests", () => {

	it("should get all campus in the store", async () => {

		let {
		  getAll
		} = require("../store/actions/thunks_for_Campus").default; 

		const store = require("../store/store").default;

		await store.dispatch(getAll());

	    const campusList = store.getState().Campus_state.CampusList;
	    
	    expect(campusList).to.deep.equal(campuses);

	});	

	it("should return the initial state", async () => {

		const reducer = require("../store/reducers/reducer_for_Campus").default

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
})
}


if(sim === 1){

describe("Integration tests- Ducks", () => {

	before((done)=>{

		let storeGenerate = shell(simCommand);

		storeGenerate.on("exit", () => {
			
		  done()
		})
	})

	it('Ducks store generates', (done)=>{


		done()
	})
})

describe("Integration tests- Ducks", () => {

	let actions, action_constants, store, reducer

	it("Generated Ducks model is a valid Redux store", (done) => {

		actions = require("../store/Campus/actions_for_Campus").default; 

		action_constants = require("../store/Campus/action_constants_for_Campus").default; 

		store = require("../store/store").default;

		reducer = require("../store/Campus/reducer_for_Campus").default; //for rails

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

describe("Ducks integration tests- Thunks", () => {

	it("should get all campus in the store", async () => {

		let {
		  getAll
		} = require("../store/Campus/thunks_for_Campus").default; 

		const store = require("../store/store").default;

		await store.dispatch(getAll());

	    const campusList = store.getState().Campus_state.CampusList;
	    
	    expect(campusList).to.deep.equal(campuses);

	});	

	it("should return the initial state", async () => {

		const reducer = require("../store/Campus/reducer_for_Campus").default

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
})
}

if(sim === 2){

describe("Rails model generates with thunks separated", () => {

	it('Rails model generates with thunks separated', (done)=>{

		let storeGenerate = shell(simCommand);

		storeGenerate.on("exit", () => {

		  done()
		})
	})


	it("Generates thunks in a separate file", (done) => {

		let thunksFileExists = fs.existsSync(`${process.cwd()}/store/actions/thunks_for_Campus.js`)

		expect(thunksFileExists).to.equal(true)

		done()

	});	

	it('Contains valid thunks', (done)=> {

		let thunks = require(`${process.cwd()}/store/actions/thunks_for_Campus.js`)

		expect(typeof thunks.getAll).to.equal('function')
		expect(typeof thunks.getOne).to.equal('function')

		done()
	})


})

}

if(sim === 3){

describe("Ducks model generates with thunks separated", () => {

	it('Ducks model generates with thunks separated', (done)=>{

		let storeGenerate = shell(simCommand);

		storeGenerate.on("exit", () => {

		  done()
		})
	})


	it("Generates thunks in a separate file", (done) => {

		let thunksFileExists = fs.existsSync(`${process.cwd()}/store/Campus/thunks_for_Campus.js`)

		expect(thunksFileExists).to.equal(true)

		done()

	});	

	it('Contains valid thunks', (done)=> {

		let thunks = require(`${process.cwd()}/store/Campus/thunks_for_Campus.js`)

		expect(typeof thunks.getAll).to.equal('function')
		expect(typeof thunks.getOne).to.equal('function')

		done()
	})


})

}

if(sim === 4){

describe("Rails model generates with thunks included in action file", () => {

	it('Rails model generates with thunks included in action file', (done)=>{

		let storeGenerate = shell(simCommand);

		storeGenerate.on("exit", () => {

		  done()
		})
	})


	it("Generates actions file", (done) => {

		let thunksFileExists = fs.existsSync(`${process.cwd()}/store/actions/actions_for_Campus.js`)

		expect(thunksFileExists).to.equal(true)

		done()

	});	

	it('Contains valid thunks', (done)=> {

		let thunks = require(`${process.cwd()}/store/actions/actions_for_Campus.js`)

		expect(typeof thunks.getAll).to.equal('function')
		expect(typeof thunks.getOne).to.equal('function')


		done()
	})
})




}



if(sim === 5){

describe("Ducks model generates with thunks included in action file", () => {

	it('Ducks model generates with thunks included in action file', (done)=>{

		let storeGenerate = shell(simCommand);

		storeGenerate.on("exit", () => {

		  done()
		})
	})


	it("Generates actions file", (done) => {

		let thunksFileExists = fs.existsSync(`${process.cwd()}/store/Campus/actions_for_Campus.js`)

		expect(thunksFileExists).to.equal(true)

		done()

	});	

	it('Contains valid thunks', (done)=> {

		let thunks = require(`${process.cwd()}/store/Campus/actions_for_Campus.js`)

		expect(typeof thunks.getAll).to.equal('function')
		expect(typeof thunks.getOne).to.equal('function')
		

		done()
	})
})


}



if(sim === 6){

describe("Rails model generates properly when CRUD false selected on model", () => {

	it('Rails model generates with CRUD ops exlcuded from action file', (done)=>{

		let storeGenerate = shell(simCommand);

		storeGenerate.on("exit", () => {

		  done()
		})
	})


	it("Generates actions file", (done) => {

		let thunksFileExists = fs.existsSync(`${process.cwd()}/store/actions/actions_for_Campus.js`)

		expect(thunksFileExists).to.equal(true)

		done()

	});	

	it('Action file does not include CRUD ops', (done)=> {

		let CRUDs = require(`${process.cwd()}/store/actions/actions_for_Campus.js`).default

		expect(CRUDs.getCampus).to.equal(undefined)
		expect(CRUDs.getAllCampus).to.equal(undefined)

		done()
	})
})


}


if(sim === 7){

describe("Ducks model generates properly when CRUD false selected on model", () => {

	it('Ducks model generates with CRUD ops exlcuded from action file', (done)=>{

		let storeGenerate = shell(simCommand);

		storeGenerate.on("exit", () => {

		  done()
		})
	})


	it("Generates actions file", (done) => {

		let thunksFileExists = fs.existsSync(`${process.cwd()}/store/Campus/actions_for_Campus.js`)

		expect(thunksFileExists).to.equal(true)

		done()

	});	

	it('Action file does not include CRUD ops', (done)=> {

		let CRUDs = require(`${process.cwd()}/store/Campus/actions_for_Campus.js`).default

		expect(CRUDs.getCampus).to.equal(undefined)
		expect(CRUDs.getAllCampus).to.equal(undefined)

		done()
	})
})

}








if(sim === 9){

describe("DUMMY DESCRIBE TO TEST ADD FUNCTIONALITY", () => {

	it('dummy store generated', (done)=>{

		let storeGenerate = shell(`genie sim 9`);

		storeGenerate.on("exit", () => {

		  done()
		})
	})

	it('heres some tests we can use here', (done)=>{

		done()
	})
})




}













if(sim === 9){}
if(sim === 10){}
if(sim === 11){}
if(sim === 12){}
if(sim === 13){}	
if(sim === 14){}
if(sim === 15){}
if(sim === 16){}	
if(sim === 17){}
if(sim === 18){}
if(sim === 19){}
if(sim === 20){}
if(sim === 21){}
if(sim === 22){}





