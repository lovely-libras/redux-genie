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

    let storeGenerate = shell(simCommand)

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

if(sim === 8){

// - Rails: generates with mulitple models



}

if(sim === 9){
//  - Ducks: generates with mulitple models 



}

if(sim === 10){

// 10  - Rails: generates without defined actions

}



if(sim === 11){
// 11  - Ducks: generates without defined actions

}
if(sim === 12){
// 12  - Rails: generates without defined thunks

}
if(sim === 13){
// 13  - Ducks: generates without defined thunks

}  
if(sim === 14){
// 14  - Rails: generates with defined actions

}
if(sim === 15){
// 15  - Ducks: generates with defined actions

}
if(sim === 16){
// 16  - Rails: generates with defined thunks

}  
if(sim === 17){
// 17  - Ducks: generates with defined thunks

}
if(sim === 18){
// 18  - Rails: all the properties are defined on state

}
if(sim === 19){
// 19  - Ducks: all the properties are defined on state

}

 

if(sim === 20){
//   - update to new model no actions or thunks defined- Crud True 
// 20    - rails xx 

}

if(sim === 21){
//   - update to new model no actions or thunks defined- Crud True 
// 21    - ducks xx 

}


if(sim === 22){
//   - update to new model no actions or thunks defined- Crud false 
// 22    - rails xx 

}

if(sim === 23){
//   - update to new model no actions or thunks defined- Crud false 

// 23    - ducks xx
}

if(sim === 24){
//   - update to new model with actions and thunks defined - CRUD true
// 24    - rails xx

}

if(sim === 25){
//   - update to new model with actions and thunks defined - CRUD true

// 25    - ducks xx
}

if(sim === 26){
//   - update to new model with actions and thunks defined - CRUD false
// 26    - rails - xx

}

if(sim === 27){
//   - update to new model with actions and thunks defined - CRUD false

// 27    - ducks - xx
}

if(sim === 28){
//   - update new actions on existing model with actions already defined 
//     CRUD true
//  28- ducks 
// 29 - rails 
}

if(sim === 29){
//   - update new actions on existing model with actions already defined 
//     CRUD true
//  28- ducks 
// 29 - rails 
}

if(sim === 30){
 //  - update new actions to model with actions not yet defined 
 // 30 - ducks 
 // 31 - rails 
}

if(sim === 31){
 //  - update new actions to model with actions not yet defined 
 // 30 - ducks 
 // 31 - rails 
}

if(sim === 32){
  // - update to new thunks to model with thunks already defined
  //  32 - ducks 
  //  33 - rails 
}

if(sim === 33){
  // - update to new thunks to model with thunks already defined
  //  32 - ducks 
  //  33 - rails 
}

if(sim === 34){
  // - update to new thunks to model with thunks not yet defined
  //  34 - ducks 
  //  35 - rails 
}
if(sim === 35){
  // - update to new thunks to model with thunks not yet defined
  //  34 - ducks 
  //  35 - rails 
}
if(sim === 36){
 // - update - prevents adding duplicate models
 //   36 - ducks 
 //   37 - rails 
}

if(sim === 37){
 // - update -prevents adding duplicate models
 //   36 - ducks 
 //   37 - rails 
}

if(sim === 38){

}

if(sim === 39){

}

if(sim === 40){

}

if(sim === 41){

}

if(sim === 42){

}

if(sim === 43){

}

if(sim === 44){

}

if(sim === 45){

}

if(sim === 46){

}

if(sim === 47){

}

if(sim === 48){

}

if(sim === 49){

}

if(sim === 50){

}

if(sim === 51){

}

if(sim === 52){

}

if(sim === 53){

}

if(sim === 54){

}

if(sim === 55){

}

if(sim === 56){

}

if(sim === 57){

}

if(sim === 58){

}

if(sim === 59){

}




/*

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

*/

/*




  - prevents adding duplicate models
   36 - ducks 
   37 - rails 

  - update- prevents adding duplicate actions
   38 - ducks 
   39 - rails 

  - update- prevents adding duplicate thunks
   40 - ducks 
   41 - rails 

  - update- adds subsequent new models
   42 - ducks 
   43 - rails 


    Thunks:
      - getAll:
          - "/api/Dux"
          - getAllCampus
      - getOne:
          - "/api/Dux/:dux"
          - getCampus

 - terminator:

    CRUD: false
    
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number

    Actions:
      - getJohnConnor
      - hastaLaVista

    Thunks:
      - getAll:
          - "/api/terminator"
          - getJohnConnor
      - getOne:
          - "/api/terminator/:terminator"
          - getJohnConnor


issues:

1. RESOLVED adding thunks changes action files
2. RESOLVED multiple action constants 
3. RESOLVED adding actions to model with no actions at all 
4. RESOLVED adding thunks to model wtih no thunks yet (Ducks only)


add

- add new model with actions and thunks defined 
 44 - ducks 
 45  - rails 

  
- add new model with and without defined actions, CRUD false 
 46 - ducks
 47 - rails


- add new actions to model with actions already defined 
 48 - ducks 
 49 - rails 


- add new actions to model with actions not yet defined 
 50 - ducks 
 51 - rails 

  
- add new thunks to model with thunks already defined
 52 - rails
 53 - ducks 

- add new thunks to model with thunks not yet defined
 54 - rails 
 55 - ducks 

- prevents adding duplicate models
 56 - ducks 
 57 - rails 

- prevents adding duplicate actions
 58 - ducks
 59 - rails 

- prevents adding duplicate thunks
 60 - ducks
 61 - rails 


*/
