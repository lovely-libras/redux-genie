// this is a test file used only for writing purposes

import { expect } from "chai";
import fetchMock from "fetch-mock";
const { spawn } = require("child_process");
const config = require('./../config.dev')
const fs = require('fs')

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
  xit("Rails folder structure generates", done => {
    // this is the corresponding
    // test simulation- this kills the
    // previous store and generates
    // the corresponding yaml defined
    // in "config.dev.js"
// async function genTest(yamlFunc, nextCall){

//   // delete current store

//   const firstCall = shell('genie delete all')

//   firstCall.on('exit', () =>{

//     // print config file

//     fs.writeFile(
//         "./lamp.config.yml",
//         yamlFunc(),
//         () => { });
    
//     // run genie generate (after deleting and rewriting config)

//     const genCall = shell('genie generate')
    
//     genCall.on('exit', ()=>{

//         // run the next call passed in
//         return nextCall()

//     })

//     return genCall

//   })

//   return firstCall
// }

describe("ZERO generate method- Rails", () => {

  // this is the way the "it" block is structured
  // to guarantee the store will generate before
  // the store's tests are run- the key is mocha's "done" method- 

                                        // "done" is mocha's
                                        // way of handling async
  it('Rails folder structure generates', (done)=>{

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
      done();
    });
  });

  // this is this store's suite of tests-

  xit("Generated Rails folder structure is a valid Redux store", done => {
    const store = require("./../../store/store.js").default; // this is a wonky node -> front end issue
      // the done method instructs mocha to proceed 
      // to the next "it" block 
      done() 
    })

  })

  // this is this store's suite of tests- 

  it("Generated Rails folder structure is a valid Redux store", (done) => {
    
      const store = require("./../../store/store.js").default; // this is a wonky node -> front end issue

    let {
      countDux
    } = require("./../../store/actions/actions_for_Campus").default;

    expect(store.dispatch(countDux("blank"))).to.deep.equal({
      type: "COUNTDUX",
      payload: "blank"
    });

    // this guarantees that this "xit" block will execute before
    // moving on to the next describe block- if this isn't here,
    // there may be async issues with the next simulated store
    done();
  });
});

describe("generate method- Ducks", () => {
  xit("Ducks store generates", done => {
      // this guarantees that this "it" block will execute before 
      // moving on to the next describe block- if this isn't here,
      // there may be async issues with the next simulated store
      
      done()


  });
});


describe("ONE generate method- Ducks", () => {

  it('Ducks store generates', (done)=>{

    let storeGenerate = shell(`genie simdev 1`);

    storeGenerate.on("exit", () => {
      done();
    });
  });

      done()
    })

  })

  it("Generated Ducks model is a valid Redux store", (done) => {

      const store = require("./../../store/store.js").default; // this is a wonky node -> front end issue

        let {
          quackOne
        } = require("./../../store/Campus/actions_for_Campus").default;

    let {
      quackOne
    } = require("./../../store/Campus/actions_for_Campus").default;

    expect(store.dispatch(quackOne("blank"))).to.deep.equal({
      type: "QUACKONE",
      payload: "blank"
    });

    done();
  });
});



describe("TWO generate method- Rails - no logging", () => {

  it('Rails store generates with logging false', (done)=>{

    let storeGenerate = shell(`genie simdev 2`);

    storeGenerate.on("exit", () => {
      done();
    });
  });

  xit(" ", done => {
    const store = require("./../../store/store.js").default;

    // complete "xit" block
      done()
    })

  })

  it(" ", (done) => {

      const store = require("./../../store/store.js").default; 

        // complete "it" block
        
        // expect( ).to.deep.equal({});

    // expect( ).to.deep.equal({});

    done();
  });
});

describe("THREE generate method- Ducks - thunks separated", () => {

  it('Ducks store generates with thunks separated', (done)=>{

    let storeGenerate = shell(`genie simdev 3`);

    storeGenerate.on("exit", () => {
      done();
    });
  });

  xit(" ", done => {
    const store = require("./../../store/store.js").default;

    // complete "xit" block
      done()
    })

  })

  it(" ", (done) => {

      const store = require("./../../store/store.js").default; 

        // complete "it" block
        
        // expect( ).to.deep.equal({});

    // expect( ).to.deep.equal({});

    done();
  });
});

describe("FOUR generate method- Ducks - thunks not separted", () => {

  it('Ducks store generates with thunks not separated', (done)=>{

    let storeGenerate = shell(`genie simdev 4`);

    storeGenerate.on("exit", () => {
      done();
    });
  });

  xit(" ", done => {
    const store = require("./../../store/store.js").default;

    // complete "xit" block
      done()
    })

  })

  it(" ", (done) => {

      const store = require("./../../store/store.js").default; 

        // complete "it" block
        
        // expect( ).to.deep.equal({});

    // expect( ).to.deep.equal({});

    done();
  });
});

<<<<<<< HEAD
describe("generate method- Ducks - thunks not separted", () => {
  xit("Ducks store generates with thunks not separated", done => {
=======
describe("FIVE generate method- Ducks - thunks not separted", () => {

  it('Ducks store generates with thunks not separated', (done)=>{

>>>>>>> master
    let storeGenerate = shell(`genie simdev 5`);

    storeGenerate.on("exit", () => {
      done();
    });
  });

<<<<<<< HEAD
  xit(" ", done => {
    const store = require("./../../store/store.js").default;
=======
      done()
    })

  })

  it(" ", (done) => {
>>>>>>> master

    // complete "xit" block

<<<<<<< HEAD
    // expect( ).to.deep.equal({});
=======
        // complete "it" block
        
        // expect( ).to.deep.equal({});
>>>>>>> master

    done();
  });
});



describe(" SIX generate method- Ducks - CRUD false", () => {

  it('Ducks store generates correctly without CRUD', (done)=>{

    let storeGenerate = shell(`genie simdev 6`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  it(" ", (done) => {

      // const store = require("./../../store/store.js").default; 

        // complete "it" block
        
        // expect( ).to.deep.equal({});

      done()
      
  }); 
});

describe(" SEVEN generate method- Rails - thunks not separted", () => {

  it('Rails store generates correctly without CRUD', (done)=>{

    let storeGenerate = shell(`genie simdev 7`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  it(" ", (done) => {

      const store = require("./../../store/store.js").default; 

        // complete "it" block
        
        // expect( ).to.deep.equal({});

      done()
      
  }); 
});


// describe blocks for the update method

describe(" EIGHT update creates one new model in Rails structure with thunks and actions, CRUD ops included", () => {

  it('update call for this test- Rails', (done)=>{

    let storeGenerate = shell(`genie simdev 8`);

    storeGenerate.on("exit", () => {
      done();
    });
  });

  xit(" ", done => {
    const store = require("./../../store/store.js").default;
      done()
    })

  })

  it(" ", (done) => {

    // complete "xit" block

        // complete "it" block
        
                
            // export default {

            //   GET_DUX : 'GET_DUX',
            //   GET_ALL_DUX : 'GET_ALL_DUX',
            //   ADD_DUX : 'ADD_DUX',
            //   UPDATE_DUX : 'UPDATE_DUX',
            //   DELETE_DUX : 'DELETE_DUX',
            //   COUNTDUX : 'COUNTDUX',
            //   MIGRATEDUX : 'MIGRATEDUX',
            //   QUACKONE : 'QUACKONE',
            //   GET_TERMINATOR : 'GET_TERMINATOR',
            //   GET_ALL_TERMINATOR : 'GET_ALL_TERMINATOR',
            //   ADD_TERMINATOR : 'ADD_TERMINATOR',
            //   UPDATE_TERMINATOR : 'UPDATE_TERMINATOR',
            //   DELETE_TERMINATOR : 'DELETE_TERMINATOR',
            // }
        

        // expect( ).to.deep.equal({});

      done()
      
  }); 
});



describe(" NINE update creates muliple new models in Rails structure with thunks and actions, CRUD ops included", () => {

  it('update call for this test- Rails', (done)=>{

    let storeGenerate = shell(`genie simdev 9`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  it(" ", (done) => {

      const store = require("./../../store/store.js").default; 

        // complete "it" block
             
        // expect( ).to.deep.equal({});

      done()
  }); 
});


describe(" TEN update creates muliple new models in Rails structure with no thunks or actions, CRUD ops excluded", () => {

  it('update call for this test- Rails', (done)=>{

    let storeGenerate = shell(`genie simdev 10`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  it(" ", (done) => {

      const store = require("./../../store/store.js").default; 

        // complete "it" block
  
        // expect( ).to.deep.equal({});

      done()
      
  }); 
});

describe(" ELEVEN update creates muliple subsequent new models in Rails structure with no thunks or actions ", () => {

  it('update call for this test- Rails', (done)=>{

    let storeGenerate = shell(`genie simdev 11`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  it(" ", (done) => {

      const store = require("./../../store/store.js").default; 

        // complete "it" block
  
        // expect( ).to.deep.equal({});

      done()
      
  }); 
});


describe(" TWELVE update creates muliple new models in Ducks structure", () => {

  it('update call for this test- Ducks', (done)=>{

    let storeGenerate = shell(`genie simdev 12`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  it(" ", (done) => {

      // const store = require("./../../store/store.js").default; 

        // complete "it" block
  
        // expect( ).to.deep.equal({});

      done()
      
  }); 
});

describe(" 13 update creates muliple subsequent new models in Ducks structure", () => {

  it('update call for this test- Ducks', (done)=>{

    let storeGenerate = shell(`genie simdev 13`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  it(" ", (done) => {

      // const store = require("./../../store/store.js").default; 

        // complete "it" block
  
        // expect( ).to.deep.equal({});

      done()
      
  }); 
});

describe(" 14 update adds actions and to existing model, actions and thunks not yet defined on model -  Rails", () => {

  it('update call for this test- Rails', (done)=>{

    let storeGenerate = shell(`genie simdev 14`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  it(" ", (done) => {

      // const store = require("./../../store/store.js").default; 

        // complete "it" block
  
        // expect( ).to.deep.equal({});

      done()
      
  }); 
});

describe(" 15 update adds actions and to existing model, actions and thunks not yet defined on model -  Rails", () => {


  it('update simulation call for this test- Rails', (done)=>{

    let storeGenerate = shell(`genie simdev 15`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  it(" ", (done) => {

      // const store = require("./../../store/store.js").default; 

        // complete "it" block
  
        // expect( ).to.deep.equal({});

      done()
      
  }); 
});

describe(" 16 update creates muliple subsequent models updates in Rails structure", () => {

  it('update call for this test- Ducks', (done)=>{

    let storeGenerate = shell(`genie simdev 16`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  it(" ", (done) => {


      // const store = require("./../../store/store.js").default; 

      console.log(typeof require('./../../store/constants/action_constants').default)

        // complete "it" block
  
        // expect( ).to.deep.equal({});

    done();
  });
});

describe(" 17 update creates new models in Ducks structure", () => {

  it('update call for this test- Ducks', (done)=>{

    let storeGenerate = shell(`genie simdev 17`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  it(" ", (done) => {

      done()
      
  }); 
});

// describe(" 18 add creates new model in Rails structure", () => {

//   it('add call for this test- Rails', async (done)=>{

//     let addCall = () => {
      
//       return shell(`genie add --newModel Dux -a getAllDucks -a quackOne -t addQuack -t quackRemote`);
//     }

//     // let thisTest = await 

//     genTest(config.testZeroYaml, addCall).then(()=>{


//       thisTest.on("exit", () => {

//         done()

//       })

//     })
    

//   })

//   it(" ", (done) => {

//       done()
      
//   }); 
// });

describe(" 18 add creates new models in Rails structure", () => {

  it('update call for this test- Rails', (done)=>{

    let storeGenerate = shell(`genie simdev 18`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  it(" ", (done) => {

      done()
      
  }); 
});


describe(" 19 add new model in Rails structure throws error if model is already defined", () => {

  it('add call for this test- Rails', (done)=>{

    let storeGenerate = shell(`genie simdev 19`);

    storeGenerate.on("exit", () => {

      done()
    })

  })

  it(" ", (done) => {

      done()
      
  }); 
});
