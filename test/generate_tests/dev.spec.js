// this is a test file used only for writing purposes

import { expect } from "chai";
import fetchMock from "fetch-mock";
const { spawn } = require("child_process");

const shell = command => {
  let thisProc = spawn(command, { shell: true, stdio: "inherit" });

  return thisProc;
};


describe("generate method- Rails", () => {

  // this is the way the "xit" block is structured
  // to guarantee the store will generate before
  // the store's tests are run- the key is mocha's "done" method- 

                                        // "done" is mocha's
                                        // way of handling async
  xit('Rails folder structure generates', (done)=>{

                              // this is the corresponding
                              // test simulation- this kills the 
                              // previous store and generates 
                              // the corresponding yaml defined
                              // in "config.dev.js"
    let storeGenerate = shell(`genie simdev 0`);

    // this method is called when the shell process exits
    storeGenerate.on("exit", () => {

      // the done method instructs mocha to proceed 
      // to the next "xit" block 
      done() 
    })

  })

  // this is this store's suite of tests- 

  xit("Generated Rails folder structure is a valid Redux store", (done) => {
    
      const store = require("./../../store/store.js").default; // this is a wonky node -> front end issue

      let {
        countDux
      } = require("./../../store/actions/actions_for_Campus").default;
      
      expect( store.dispatch(countDux("blank"))).to.deep.equal({
        type: "COUNTDUX",
        payload: "blank"
      });


      // this guarantees that this "xit" block will execute before 
      // moving on to the next describe block- if this isn't here,
      // there may be async issues with the next simulated store
      done()
  });
});

describe("generate method- Ducks", () => {

  xit('Ducks store generates', (done)=>{

    let storeGenerate = shell(`genie simdev 1`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  xit("Generated Ducks model is a valid Redux store", (done) => {

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


describe("generate method- Rails - no logging", () => {

  xit('Rails store generates with logging false', (done)=>{

    let storeGenerate = shell(`genie simdev 2`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  xit(" ", (done) => {

      const store = require("./../../store/store.js").default; 

        // complete "xit" block
        
        // expect( ).to.deep.equal({});

      done()
      
  }); 

});

describe("generate method- Ducks - thunks separated", () => {

  xit('Ducks store generates with thunks separated', (done)=>{

    let storeGenerate = shell(`genie simdev 3`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  xit(" ", (done) => {

      const store = require("./../../store/store.js").default; 

        // complete "xit" block
        
        // expect( ).to.deep.equal({});

      done()
      
  }); 

});

describe("generate method- Ducks - thunks not separted", () => {

  xit('Ducks store generates with thunks not separated', (done)=>{

    let storeGenerate = shell(`genie simdev 4`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  xit(" ", (done) => {

      const store = require("./../../store/store.js").default; 

        // complete "xit" block
        
        // expect( ).to.deep.equal({});

      done()
      
  }); 

});

describe("generate method- Ducks - thunks not separted", () => {

  xit('Ducks store generates with thunks not separated', (done)=>{

    let storeGenerate = shell(`genie simdev 5`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  xit(" ", (done) => {

      const store = require("./../../store/store.js").default; 

        // complete "xit" block
        
        // expect( ).to.deep.equal({});

      done()
      
  }); 
});

// describe blocks for the update method

describe("update creates one new model in Rails structure with no thunks or actions, CRUD ops included", () => {

  it('update call for this test- Rails', (done)=>{

    let storeGenerate = shell(`genie simdev 8`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  xit(" ", (done) => {

      const store = require("./../../store/store.js").default; 

        // complete "xit" block
        
                /*
            export default {

              GET_DUX : 'GET_DUX',
              GET_ALL_DUX : 'GET_ALL_DUX',
              ADD_DUX : 'ADD_DUX',
              UPDATE_DUX : 'UPDATE_DUX',
              DELETE_DUX : 'DELETE_DUX',
              COUNTDUX : 'COUNTDUX',
              MIGRATEDUX : 'MIGRATEDUX',
              QUACKONE : 'QUACKONE',
              GET_TERMINATOR : 'GET_TERMINATOR',
              GET_ALL_TERMINATOR : 'GET_ALL_TERMINATOR',
              ADD_TERMINATOR : 'ADD_TERMINATOR',
              UPDATE_TERMINATOR : 'UPDATE_TERMINATOR',
              DELETE_TERMINATOR : 'DELETE_TERMINATOR',
            }
        */

        // expect( ).to.deep.equal({});

      done()
      
  }); 
});

