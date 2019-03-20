"use strict";

// Assertions
// const chai = require("chai");
// // const expect = chai.expect;
// const chaiThings = require("chai-things");
// chai.use(chaiThings);

const mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var assert = require("chai").assert;

//import actions
const action_boiler = require("../../generator_code_files/rails_style/action_boiler_Rails_model.js");
const combine_reducers = require("../../generator_code_files/rails_style/combine_reducers_boiler.js");
const constants_boiler = require("../../generator_code_files/rails_style/constants_boiler.js");
const create_reducer_index = require("../../generator_code_files/rails_style/create_reducer_index_boiler.js");
const rails_index = require("../../generator_code_files/rails_style/rails_index.js");
const reducer_creator = require("../../generator_code_files/rails_style/reducer_creator.js");
const store_boiler = require("../../generator_code_files/rails_style/store_boiler.js");

const constants_boilerTest = constants_boiler(["duck", "Goose", "parrot"]);
// console.log(action_boilerTest);
// console.log(constants_boilerTest);

//import reducer
const reducer = require("../../generator_code_files/rails_style/reducer_creator.js");
const reducerTest = reducer(
  {
    dux: [{ Name: "string" }, { Quacking: "Boolean" }, { Ducklings: "Array" }]
  },
  "dux"
);
// console.log(reducerTest);

describe("Rails Style Generator Testing", () => {
  describe("File layout and spacing test", () => {
    it("Checks action_boiler_Rails_model", () => {
      let action_boilerTest = action_boiler("Campus");
      action_boilerTest = action_boilerTest.replace(/\s/g, "");
      assert.equal(
        action_boilerTest,
        `import actions from "../constants/action_constants"

      const getCampus = ( payload ) => {
      
          return {
              type: actions.GET_CAMPUS,
              payload
          }
      }
      
      const getAllCampus = ( payload ) => {
      
          return {
              type: actions.GET_ALL_CAMPUS,
              payload
          }
      }
      
      const createCampus = ( payload ) => {
      
          return {
      
              type: actions.ADD_CAMPUS,
              payload
          }
      }
      
      const updateCampus = ( payload ) => {
      
          return {
      
              type: actions.UPDATE_CAMPUS,
              payload
          }
      }
      
      const deleteCampus = ( payload ) => {
      
          return {
      
              type: actions.DELETE_CAMPUS,
              payload
          }
      }
      
      export default {
          getCampus,
          getAllCampus,
          createCampus,
          updateCampus,
          deleteCampus
      }`.replace(/\s/g, "")
      );
    });

    it("Checks action_boiler_Rails_model, lower case input to model", () => {
      let action_boilerTest = action_boiler("campus");
      action_boilerTest = action_boilerTest.replace(/\s/g, "");
      assert.equal(
        action_boilerTest,
        `import actions from "../constants/action_constants"
  
        const getCampus = ( payload ) => {
        
            return {
                type: actions.GET_CAMPUS,
                payload
            }
        }
        
        const getAllCampus = ( payload ) => {
        
            return {
                type: actions.GET_ALL_CAMPUS,
                payload
            }
        }
        
        const createCampus = ( payload ) => {
        
            return {
        
                type: actions.ADD_CAMPUS,
                payload
            }
        }
        
        const updateCampus = ( payload ) => {
        
            return {
        
                type: actions.UPDATE_CAMPUS,
                payload
            }
        }
        
        const deleteCampus = ( payload ) => {
        
            return {
        
                type: actions.DELETE_CAMPUS,
                payload
            }
        }
        
        export default {
            getCampus,
            getAllCampus,
            createCampus,
            updateCampus,
            deleteCampus
        }`.replace(/\s/g, "")
      );
    });

    it("Checks combine_reducers_boiler", () => {
      let combine_reducers_boilerTest = combine_reducers(["Campus", "Student"]);
      combine_reducers_boilerTest = combine_reducers_boilerTest.replace(
        /\s/g,
        ""
      );
      assert.equal(
        combine_reducers_boilerTest,
        `import { combineReducers } from 'redux'
            import Campus_state from './Campus_reducer'
            import Student_state from './Student_reducer'
            
            export default combineReducers({
                Campus_state,
                Student_state,
            });`.replace(/\s/g, "")
      );
    });

    it("Checks constants_boiler", () => {
      let constant_boilerTest = constants_boiler(["Campus", "Student"]);
      constant_boilerTest = constant_boilerTest.replace(/\s/g, "");
      assert.equal(
        constant_boilerTest,
        `export default {
            GET_CAMPUS : 'GET_CAMPUS',
            GET_ALL_CAMPUS : 'GET_ALL_CAMPUS',
            ADD_CAMPUS : 'ADD_CAMPUS',
            UPDATE_CAMPUS : 'UPDATE_CAMPUS',
            DELETE_CAMPUS : 'DELETE_CAMPUS',
            GET_STUDENT : 'GET_STUDENT',
            GET_ALL_STUDENT : 'GET_ALL_STUDENT',
            ADD_STUDENT : 'ADD_STUDENT',
            UPDATE_STUDENT : 'UPDATE_STUDENT',
            DELETE_STUDENT : 'DELETE_STUDENT',
        }`.replace(/\s/g, "")
      );
    });

    it("Checks constants_boiler", () => {
      let constant_boilerTest = constants_boiler(["Campus", "Student"]);
      constant_boilerTest = constant_boilerTest.replace(/\s/g, "");
      assert.equal(
        constant_boilerTest,
        `export default {
              GET_CAMPUS : 'GET_CAMPUS',
              GET_ALL_CAMPUS : 'GET_ALL_CAMPUS',
              ADD_CAMPUS : 'ADD_CAMPUS',
              UPDATE_CAMPUS : 'UPDATE_CAMPUS',
              DELETE_CAMPUS : 'DELETE_CAMPUS',
              GET_STUDENT : 'GET_STUDENT',
              GET_ALL_STUDENT : 'GET_ALL_STUDENT',
              ADD_STUDENT : 'ADD_STUDENT',
              UPDATE_STUDENT : 'UPDATE_STUDENT',
              DELETE_STUDENT : 'DELETE_STUDENT',
          }`.replace(/\s/g, "")
      );
    });

    it("Checks create_reducer_index_boiler", () => {
      let create_reducer_indexTest = create_reducer_index(["Campus"]);
      create_reducer_indexTest = create_reducer_indexTest.replace(/\s/g, "");
      assert.equal(
        create_reducer_indexTest,
        `import actions from "./../actions/action_types_for_CAMPUS"

          const initialState = {
              CampusList : [],
              SingleCampus: {
                  Name: '', 
                  Address: true, 
                  Phone Number: [],
              }
          }
          
          export default function Campus_reducer (state = initialState, action) {
              
              switch (action.type) {
          
                  case actions.GET_CAMPUS: {
                      return { ...state, SingleCampus: action.payload }
                  }
          
                  case actions.GET_ALL_CAMPUS: {
                      
                      return { ...state, CampusList: [...action.payload]}
                  }
          
                  case actions.ADD_CAMPUS: {
                      return { ...state, CampusList: [...state.CampusList, action.payload ] }
                  }
          
                  case actions.UPDATE_CAMPUS: {
                      const updatedCampus = state.CampusList.filter(item => item.id === action.payload.it)
          
                      return {...state, SingleCampus: updatedCampus}
                  }
          
                  case actions.DELETE_CAMPUS: {
                      const updatedCampus = state.CampusList.filter(item => item.id !== action.payload.it)
          
                      return {...state, SingleCampus: updatedCampus}
                  }
          
                  default:
                    return state
              }
          }`.replace(/\s/g, "")
      );
    });
    it("Checks store_boiler", () => {
      let store_boilerTest = store_boiler(["Campus", "Student"]);
      store_boilerTest = store_boilerTest.replace(/\s/g, "");
      assert.equal(
        store_boilerTest,
        `import { createStore } from 'redux'
          import combinedReducers from './reducers/combine_reducers'
          
          export default createStore(combinedReducers)`.replace(/\s/g, "")
      );
    });
  });
});
