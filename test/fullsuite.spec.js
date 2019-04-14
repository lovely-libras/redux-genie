import fetchMock from "fetch-mock";
const { spawn } = require("child_process");
const fs = require('fs')
import { expect, should, equal } from "chai";
import mockStore from "redux-mock-store";

const shell = command => {

  let thisProc = spawn(command, { shell: true, stdio: 'inherit' });

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

describe("Rails: generates with mulitple models", () => {

  it('generates with mulitple models', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("Campus model generates", (done) => {

    let test = fs.existsSync(`${process.cwd()}/store/reducers/reducer_for_Campus.js`)

    expect(test).to.equal(true)

    done()

  }); 

  it("Terminator model generates", (done) => {

    let test = fs.existsSync(`${process.cwd()}/store/reducers/reducer_for_Terminator.js`)

    expect(test).to.equal(true)

    done()

  }); 

})

}

if(sim === 9){
//  - Ducks: generates with mulitple models 

describe("Ducks: generates with mulitple models", () => {

  it('generates with mulitple models', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("Campus model generates", (done) => {

    let test = fs.existsSync(`${process.cwd()}/store/Campus/reducer_for_Campus.js`)

    expect(test).to.equal(true)

    done()

  }); 

  it("Terminator model generates", (done) => {

    let test = fs.existsSync(`${process.cwd()}/store/Terminator/reducer_for_Terminator.js`)

    expect(test).to.equal(true)

    done()

  }); 

})

}

if(sim === 10){

describe("10  - Rails: generates without defined actions", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("actions file generates", (done) => {

    let test = fs.existsSync(`${process.cwd()}/store/actions/actions_for_Campus.js`)

    expect(test).to.equal(true)

    done()

  }); 

  it("file only contains CRUD ops", (done) => {

    let actions = require(`${process.cwd()}/store/actions/actions_for_Campus.js`).default

    expect(Object.keys(actions).toString()).to.equal('getCampus,getAllCampus,createCampus,updateCampus,deleteCampus')

    done()

  }); 

})

}

if(sim === 11){
// 11  - Ducks: generates without defined actions
describe("11  - Ducks: generates without defined actions", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("actions file generates", (done) => {

    let test = fs.existsSync(`${process.cwd()}/store/Campus/actions_for_Campus.js`)

    expect(test).to.equal(true)

    done()

  }); 

  it("file only contains CRUD ops", (done) => {

    let actions = require(`${process.cwd()}/store/Campus/actions_for_Campus.js`).default

    expect(Object.keys(actions).toString()).to.equal('getCampus,getAllCampus,createCampus,updateCampus,deleteCampus')

    done()

  }); 

})
}

if(sim === 12){
// 12  - Rails: generates without defined thunks

describe("12  - Rails: generates without defined thunks", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("thunks file does not generate", (done) => {

    let test = fs.existsSync(`${process.cwd()}/store/actions/thunks_for_Campus.js`)

    expect(test).to.equal(false)

    done()

  }); 

})

}

if(sim === 13){
// 13  - Ducks: generates without defined thunks
describe("13  - Rails: generates without defined thunks", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("thunks file does not generate", (done) => {

    let test = fs.existsSync(`${process.cwd()}/store/Campus/thunks_for_Campus.js`)

    expect(test).to.equal(false)

    done()

  }); 

})
}  
if(sim === 14){
// 14  - Rails: generates with defined actions
describe("14  - Rails: generates with defined actions", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("action file contain defined actions", (done) => {

    let actions = require(`${process.cwd()}/store/actions/actions_for_Campus.js`).default

    expect(Object.keys(actions)).to.include('countDux')

    done()

  }); 

})
}
if(sim === 15){
// 15  - Ducks: generates with defined actions
describe("15  - Ducks: generates with defined actions", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("action file contain defined actions", (done) => {

    let actions = require(`${process.cwd()}/store/Campus/actions_for_Campus.js`).default

    expect(Object.keys(actions)).to.include('countDux')

    done()

  }); 

})

}

if(sim === 18){
// 18  - Rails: all the properties are defined on state
describe("18  - Rails: slice properties are defined on state", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("initial state contains correct values", (done) => {

    let state = require(`${process.cwd()}/store/store.js`).default.getState().Campus_state.SingleCampus

    expect(typeof state.Name).to.equal('string')
    expect(state.Quacking).to.equal(true)
    expect(typeof state.Ducklings).to.equal('object')
    expect(state.Fly2Gether).to.equal(true)

    done()

  }); 

})


}
if(sim === 19){
// 19  - Ducks: all the properties are defined on state
describe("19  - Ducks: slice properties are defined on state", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("initial state contains correct values", (done) => {

    let state = require(`${process.cwd()}/store/store.js`).default.getState().Campus_state.SingleCampus

    expect(typeof state.Name).to.equal('string')
    expect(state.Quacking).to.equal(true)
    expect(typeof state.Ducklings).to.equal('object')
    expect(state.Fly2Gether).to.equal(true)

    done()

  }); 

})
}




/// update tests



if(sim === 20){
//   - update to new model no actions or thunks defined- Crud True 
// 20    - rails xx 

describe("20  - Rails: update adds new model", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("generates the new files correctly", (done) => {

    let newFilesExit = fs.existsSync(`${process.cwd()}/store/actions/actions_for_Terminator.js`) && fs.existsSync(`${process.cwd()}/store/reducers/reducer_for_Terminator.js`) && fs.existsSync(`${process.cwd()}/store/actions/selectors_for_Terminator.js`)

    expect(newFilesExit).to.equal(true)

    done()

  }); 

})


}

if(sim === 21){
//   - update to new model no actions or thunks defined- Crud True 
// 21    - ducks xx 

describe("21  - Ducks: update adds new model", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("generates the new files correctly", (done) => {

    let newFilesExit = fs.existsSync(`${process.cwd()}/store/Terminator/actions_for_Terminator.js`) && fs.existsSync(`${process.cwd()}/store/Terminator/reducer_for_Terminator.js`) && fs.existsSync(`${process.cwd()}/store/Terminator/selectors_for_Terminator.js`)

    expect(newFilesExit).to.equal(true)

    done()

  }); 

})


}


if(sim === 22){
//   - update to new model no actions or thunks defined- Crud false 
// 22    - rails xx 


describe("22 - Rails: update adds new model without CRUD ops", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("generates actions without CRUD ops", (done) => {

    let newFilesExit = fs.existsSync(`${process.cwd()}/store/actions/actions_for_Terminator.js`) && fs.existsSync(`${process.cwd()}/store/reducers/reducer_for_Terminator.js`) && fs.existsSync(`${process.cwd()}/store/actions/selectors_for_Terminator.js`)

    expect(newFilesExit).to.equal(true)

    let CRUDs = require(`${process.cwd()}/store/actions/actions_for_Terminator.js`).default

    expect(CRUDs.getCampus).to.equal(undefined)
    expect(CRUDs.getAllCampus).to.equal(undefined)

    done()

  }); 

})


}

if(sim === 23){
//   - update to new model no actions or thunks defined- Crud false 

// 23    - ducks xx

describe("23 - Ducks: update adds new model without CRUD ops", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("generates actions without CRUD ops", (done) => {

    let newFilesExit = fs.existsSync(`${process.cwd()}/store/Terminator/actions_for_Terminator.js`) && fs.existsSync(`${process.cwd()}/store/Terminator/reducer_for_Terminator.js`) && fs.existsSync(`${process.cwd()}/store/Terminator/selectors_for_Terminator.js`)

    expect(newFilesExit).to.equal(true)

    let CRUDs = require(`${process.cwd()}/store/Terminator/actions_for_Terminator.js`).default

    expect(CRUDs.getCampus).to.equal(undefined)
    expect(CRUDs.getAllCampus).to.equal(undefined)

    done()

  }); 

})

}

if(sim === 24){
//   - update to new model with actions and thunks defined 
// 24    - rails xx

describe("24 - Rails: update adds new model with actions and thunks defined", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("generates defined actions and thunks", (done) => {

    let newFilesExit = fs.existsSync(`${process.cwd()}/store/actions/actions_for_Terminator.js`) && fs.existsSync(`${process.cwd()}/store/reducers/reducer_for_Terminator.js`) && fs.existsSync(`${process.cwd()}/store/actions/selectors_for_Terminator.js`)

    expect(newFilesExit).to.equal(true)

    let actions = require(`${process.cwd()}/store/actions/actions_for_Terminator.js`).default
    let thunks = require(`${process.cwd()}/store/actions/thunks_for_Terminator.js`).default

    expect(typeof actions.getJohnConnor).to.equal('function')
    expect(typeof actions.hastaLaVista).to.equal('function')

    done()

  }); 

})


}

if(sim === 25){
//   - update to new model with actions and thunks defined 

// 25    - ducks xx

describe("25 - Ducks: update adds new model with actions and thunks defined", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("generates defined actions and thunks", (done) => {

    let actions = require(`${process.cwd()}/store/Terminator/actions_for_Terminator.js`).default
    let thunks = require(`${process.cwd()}/store/Terminator/thunks_for_Terminator.js`).default

    expect(typeof actions.getJohnConnor).to.equal('function')
    expect(typeof actions.hastaLaVista).to.equal('function')

    done()

  }); 

})

}

if(sim === 28){
//   - update new actions on existing model with actions already defined 
//  28- ducks 

describe("28 - Ducks: update new actions on existing model with actions already defined", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("generates new defined actions", (done) => {

    let actions = require(`${process.cwd()}/store/Terminator/actions_for_Terminator.js`).default

    expect(typeof actions.hastaLaVista).to.equal('function')

    done()

  }); 

})
 
}

if(sim === 29){
//   - update new actions on existing model with actions already defined 
// 29 - rails 

describe("29 - Rails: update new actions on existing model with actions already defined", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("generates new defined actions", (done) => {

    let actions = require(`${process.cwd()}/store/actions/actions_for_Terminator.js`).default

    expect(typeof actions.hastaLaVista).to.equal('function')

    done()

  }); 

})


}

if(sim === 30){
 //  - update new actions to model with actions not yet defined 
 // 30 - ducks 
 
describe("30 - Ducks: update new actions on existing model with actions already defined", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("generates new defined actions", (done) => {

    let actions = require(`${process.cwd()}/store/Terminator/actions_for_Terminator.js`).default

    expect(typeof actions.getJohnConnor).to.equal('function')
    expect(typeof actions.hastaLaVista).to.equal('function')

    done()

  }); 

})


}

if(sim === 31){
 //  - update new actions to model with actions not yet defined 
 // 31 - rails 

describe("31 - Rails: update new actions to model with actions not yet defined", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("generates new defined actions", (done) => {

    let actions = require(`${process.cwd()}/store/actions/actions_for_Terminator.js`).default

    expect(typeof actions.getJohnConnor).to.equal('function')
    expect(typeof actions.hastaLaVista).to.equal('function')

    done()

  }); 

})

}

if(sim === 32){
  // - update adds new thunks to model with thunks already defined
  //  32 - ducks 

describe("32 - Ducks: update adds new thunks to model with thunks already defined", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("generates new defined thunks", (done) => {

    let thunks = require(`${process.cwd()}/store/Terminator/thunks_for_Terminator.js`).default

    expect(typeof thunks.getOne).to.equal('function')

    done()

  }); 

})



}

if(sim === 33){
  // - update adds new thunks to model with thunks already defined
  //  33 - rails 

describe("33 - Rails: update adds new thunks to model with thunks already defined", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("generates new defined thunks", (done) => {

    let thunks = require(`${process.cwd()}/store/actions/thunks_for_Terminator.js`).default

    expect(typeof thunks.getOne).to.equal('function')

    done()

  }); 

})


}

if(sim === 34){
  // - update to new thunks to model with thunks not yet defined
  //  34 - ducks 

describe("34 - Ducks: update adds new thunks to model with thunks not yet defined", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("generates new defined thunks", (done) => {

    let thunks = require(`${process.cwd()}/store/Terminator/thunks_for_Terminator.js`).default

    expect(typeof thunks.getOne).to.equal('function')
    expect(typeof thunks.getAll).to.equal('function')

    done()

  }); 

})


}
if(sim === 35){
  // - update to new thunks to model with thunks not yet defined
  //  35 - rails 
describe("35 - Rails: update adds new thunks to model with thunks not yet defined", () => {

  it('', (done)=>{

    let storeGenerate = shell(simCommand);

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("generates new defined thunks", (done) => {

    let thunks = require(`${process.cwd()}/store/actions/thunks_for_Terminator.js`).default

    expect(typeof thunks.getOne).to.equal('function')
    expect(typeof thunks.getAll).to.equal('function')

    done()

  }); 

})

}

if(sim === 36){
 // - update - prevents adding duplicate models
 //   36 - ducks 

describe("36 - Ducks: prevents adding duplicate models", () => {

  let childConsoleLogs = ''

  it('', (done)=>{

    let storeGenerate = spawn('genie sim 36', { shell: true });

    storeGenerate.stdout.on('data', (data)=>{

      childConsoleLogs += data
    })

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("throws an error if user defines the same model twice", (done) => {

    let test = childConsoleLogs.includes("Update failed, duplicate Model detected:  [ 'Campus', null ]")

    expect(test).to.equal(true)

    done()

  }); 

})



}

if(sim === 37){
 // - update -prevents adding duplicate models
 //   37 - rails 

 describe("37 - Rails: prevents adding duplicate models", () => {

  let childConsoleLogs = ''

  it('', (done)=>{

    let storeGenerate = spawn('genie sim 37', { shell: true });

    storeGenerate.stdout.on('data', (data)=>{

      childConsoleLogs += data
    })

    storeGenerate.on("exit", () => {

      done()
    })
  })

  it("throws an error if user defines the same model twice", (done) => {

    let test = childConsoleLogs.includes("Update failed, duplicate Model detected:  [ 'Campus', null ]")

    expect(test).to.equal(true)

    done()

  }); 

})


}

if(sim === 38){
  // - update- prevents adding duplicate actions
  //  38 - ducks 

  describe("38 - Ducks: prevents adding duplicate actions", () => {

    let childConsoleLogs = ''

    it('', (done)=>{

      let storeGenerate = spawn('genie sim 38', { shell: true });

      storeGenerate.stdout.on('data', (data)=>{

        childConsoleLogs += data
      })

      storeGenerate.stderr.on('data', (data)=>{

        childConsoleLogs += data
      })

      storeGenerate.on("exit", () => {

        done()
      })
    })

    it("throws an error if user defines the same model twice", (done) => {

      let test = childConsoleLogs.includes("You updated the model Campus by adding Actions: countDux")

      expect(test).to.equal(false)

      done()

  }); 
})

}

if(sim === 39){

  describe("39 - Rails: prevents adding duplicate actions", () => {

    let childConsoleLogs = ''

    it('', (done)=>{

      let storeGenerate = spawn('genie sim 39', { shell: true });

      storeGenerate.stdout.on('data', (data)=>{

        childConsoleLogs += data
      })

      storeGenerate.stderr.on('data', (data)=>{

        childConsoleLogs += data
      })

      storeGenerate.on("exit", () => {

        done()
      })
    })

    it("throws an error if user defines the same model twice", (done) => {

      let test = childConsoleLogs.includes("You updated the model Campus by adding Actions: countDux")

      expect(test).to.equal(false)

      done()

    }); 
  })


}


if(sim === 42){

  // - update- adds subsequent new models
  //  42 - ducks 
  describe("42 - Ducks: update adds subsequent models", () => {

    it('', (done)=>{

      let storeGenerate = shell(simCommand);

      storeGenerate.on("exit", () => {

        done()
      })
    })

    it("lamp lock tracks updated models", (done) => {

      let theLock = require('./../.lamp-lock.json')
      expect(Object.keys(theLock.Models[1])[0]).to.equal('terminator')
      expect(Object.keys(theLock.Models[2])[0]).to.equal('DucklingTerminator')
      done()
    
    });

    it("subsequent models created", (done) => {

      let storeDir = []

      fs.readdirSync(`${process.cwd()}/store`).forEach(file => {
        
        storeDir.push(file)
      });

      expect(storeDir.includes('Campus')).to.equal(true)
      expect(storeDir.includes('Terminator')).to.equal(true)
      expect(storeDir.includes('DucklingTerminator')).to.equal(true)
      
      done()
    
    });
    it("subsequent models contain correct files", (done) => {

      let terminatorFile = []

      fs.readdirSync(`${process.cwd()}/store/Terminator`).forEach(file => {
        
        terminatorFile.push(file)
      });

      let ducklingFile = []

      fs.readdirSync(`${process.cwd()}/store/DucklingTerminator`).forEach(file => {
        
        ducklingFile.push(file)
      });

      expect(terminatorFile.includes('action_constants_for_Terminator.js')).to.equal(true)
      expect(terminatorFile.includes('actions_for_Terminator.js')).to.equal(true)
      expect(terminatorFile.includes('reducer_for_Terminator.js')).to.equal(true)    
      expect(ducklingFile.includes('action_constants_for_DucklingTerminator.js')).to.equal(true)
      expect(ducklingFile.includes('actions_for_DucklingTerminator.js')).to.equal(true)
      expect(ducklingFile.includes('reducer_for_DucklingTerminator.js')).to.equal(true)
  
      done()
    
    });

  })


}

if(sim === 43){
  
  // - update- adds subsequent new models
  //  43 - rails 

  describe("43 - Rails: update adds subsequent models", () => {

    it('', (done)=>{

      let storeGenerate = shell(simCommand);

      storeGenerate.on("exit", () => {

        done()
      })
    })

    it("lamp lock tracks updated models", (done) => {

      let theLock = require('./../.lamp-lock.json')
      expect(Object.keys(theLock.Models[1])[0]).to.equal('terminator')
      expect(Object.keys(theLock.Models[2])[0]).to.equal('DucklingTerminator')
      done()
    
    });


    it("subsequent models created", (done) => {

      let actionFolder = []

      fs.readdirSync(`${process.cwd()}/store/actions`).forEach(file => {
        
        actionFolder.push(file)
      });

      let reducerFolder = []

      fs.readdirSync(`${process.cwd()}/store/reducers`).forEach(file => {
        
        reducerFolder.push(file)
      });

      expect(actionFolder.includes('actions_for_Terminator.js')).to.equal(true)
      expect(actionFolder.includes('actions_for_DucklingTerminator.js')).to.equal(true)
      expect(reducerFolder.includes('reducer_for_Terminator.js')).to.equal(true)    
      expect(reducerFolder.includes('reducer_for_DucklingTerminator.js')).to.equal(true)
  
      done()
    
    });

  })

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
