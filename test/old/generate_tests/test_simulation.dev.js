// this is for dev purposes only- not to be used in unit or
// integration tests
// for test simulations, use test-simulation.js 

/*


what could go wrong

generate
	- Rails: generates with mulitple models
	- Ducks: generates with mulitple models 

	- Rails: generates without defined actions
	- Ducks: generates without defined actions
	
	- Rails: generates without defined thunks
	- Ducks: generates without defined thunks
	
	- Rails: generates with defined actions
	- Ducks: generates with defined actions

	- Rails: generates with defined thunks
	- Ducks: generates with defined thunks

	- Rails: all the properties are defined on state
	- Ducks: all the properties are defined on state


update
	- create new model - thunks included

	- create new model - thunks separated

	- update defined actions from update

	- update 


add

	- add new model with actions and thunks defined 
		- ducks - single - multiple
		- rails - single - multiple

	
	- add new model with and without defined actions, CRUD false 
		- ducks
		- rails


	- add new actions to model with actions already defined 
		- ducks 
		- rails xx single xx multiple


	- add new actions to model with actions not yet defined 
		- ducks 
		- rails xx single  xx multiple

	
	- add new thunks to model with thunks already defined
		- rails xx single xx muliple


	- add new thunks to model with thunks not yet defined
		- rails  single multiple 

	- prevents adding duplicate models
		- ducks 
		- rails xx


	- prevents adding duplicate actions
		- ducks
		- rails - single - multiple (FAILING for CRUD methods)

	- prevents adding duplicate thunks
		- ducks
		- rails single xx multiple xx


*/


/* 

this file contains simulated method calls
to systemitize writing and testing the add and update
methods for both file structures

see the cli.js file under "genie sim" 

*/

const config = require('./config.dev') // these are dummy lamp.config.yml files
const fs = require('fs')
const chalk = require('chalk')
const { spawn } = require('child_process')
const util = require('util')

const shell = (command) => {

	let thisCommand	= spawn(command, {shell: true, 
						stdio: 'inherit'
								}
						)

	return thisCommand
}

/* 

	running list of edge cases to manage:

	- editing "slice"- I think we should just tell the user
	  that we don't operate on the slice once its been generated
	  
	- when we get to the connect method- the connected component
	  could simply have the store slice exposed as an entire object,
	  and the user would have to destructure it themselves
	  this would be the simplest way of implementing that

	- user tries to create an action or thunk that is the same
	  as the CRUD methods themselves
*/

/*

SIMS FOR THE GENERATE FEATURE

*/

/* 

note- it would have been cleaner to export these as an 
object or class with each function as a method, rather
than defining each function and then exporting them 
explicitly at the bottom

*/

async function genTest(yamlFunc){

	// delete current store

	let deleteCall = shell('genie delete all')

	let genCall

	return deleteCall.on('exit', () =>{

		// print config file

		fs.writeFile(
	      "./lamp.config.yml",
	      yamlFunc(),
	      () => { });
		
		// run genie generate (after deleting and rewriting config)

		genCall = shell('genie generate')
		
		// console.log(genCall)

		return genCall

	})


	// return genCall
}

/*

generate store 
	- Rails
	- thunks separated

	expect-
		there to be separate files for both thunk libraries
*/


const testZero = () => {

	return genTest(config.testZeroYaml)
}

/*

generate store 
	- Rails
	- thunks not separated

	expect-
		thunks to be defined in the same file as actions
*/

const testOne = () => {
	genTest(config.testOneYaml)
}

/*

generate store 
	- Rails
	- no logging

	expect-
		- the store file to not include logging middleware
		- but to include the other middleware
*/

const testTwo = () => {
	genTest(config.testTwoYaml)
}


/*

generate store 
	- Ducks
	- thunks separated (no option selected)

	expect-
		there to be separate files for both thunk libraries
*/

const testThree = ()=>{
	genTest(config.testThreeYaml)
}

/*

generate store 
	- Ducks
	- thunks not separated

	expect-
		thunks to be defined in the same file as actions
*/

const testFour = () => {

	genTest(config.testFourYaml)
}

/*

generate store 
	- Ducks
	- no logging

	expect-
		the store file to not include logging middleware
*/

const testFive = () => {
	genTest(config.testFiveYaml)
}

/*

generate store 
	- Ducks
	- CRUD false

	expect-
		the store file to not include logging middleware
		- constants- no CRUD
		- actions - no CRUD
		- reducers- no CRUD
*/

const testSix = () => {
	genTest(config.testSixYaml)
}

/*

generate store 
	- Rails
	- CRUD false

	expect-
		the store file to not include logging middleware
		- constants- no CRUD
		- actions - no CRUD
		- reducers- no CRUD
*/

const testSeven = () => {
	genTest(config.testSevenYaml)
}







/*

SIMS FOR THE ADD/UPDATE FEATURES

*/

async function updateTest(yam1, yam2){

	// print new config file with new model added

	let deleteCall = shell('genie delete all')

	let genCall

	deleteCall.on('exit', () =>{

		// print config file

		fs.writeFile(
	      "./lamp.config.yml",
	      yam1(),
	      () => { });
		
		// run genie generate (after deleting and rewriting config)

		genCall = shell('genie generate')
		
		// console.log(genCall)

		genCall.on('exit', ()=>{

			fs.writeFile(
		      "./lamp.config.yml",
		      yam2(),
		      () => {}
		    )

			let updateCall = shell('genie update')
		
			updateCall.on('exit', ()=>{
			
				process.exit()
			})
		})
	})
}



/*

NOTES ON THE UPDATE METHOD:

FOR UPDATE THAT CREATES A NEW MODEL

1. print new files:
	- action: new action files
	- thunk: new thunk files if selected, otherwise no
		
		test code to validate passing before writing to file

	we expect this to NOT overwrite the current
	create reducers file and store file- configured a Boolean
	to separate these two calls

3. update the action constants

3. update the root create reducer 

4. validate the new lamp lock:
	what shouldn't get changed: Slice, Structure, other options


FOR UPDATE THAT ADDS TO AN EXISTING MODEL

1. validate lamp lock before proceeding
	what can't change- 
	- structure can't change
	- CRUD selection can't change
	- logging can't change

2. print new files:
	- action: new action files
	- thunk: new thunk files if selected, otherwise no
		
		test code to validate passing before writing to file

	we expect this to NOT overwrite the current
	create reducers file and store file- configured a Boolean
	to separate these two calls

3. update the action constants

3. update the root create reducer 

4. validate the new lamp lock:
	what shouldn't get changed: Slice, Structure, other options
*/


/*

update creates one new model with thunks and actions
- CRUD true Rails model

	- expect - 
		- reducer file for new model
		- selector file for new model
		- actions with crud methods
		- no thunk file
		- reducer updated with both models
		- action constants updated with all models

*/

let testEight = () => {

	updateTest(config.testEightBaseYaml, config.testEightAddYaml)
}

/* 

update creates multiple new models with no thunks or actions- CRUD true
Rails model

*/

let testNine = () => {

	updateTest(config.testNineBaseYaml, config.testNineAddYaml)
}

/*

update creates new model with no thunks or actions- CRUD false
Rails model

	- expect - 
		- reducer file for new model
		- selector file for new model
		- no CRUD
*/


let testTen = () => {

	updateTest(config.testTenBaseYaml, config.testTenAddYaml)
}

/*

update creates new model, then creates another new model
Rails model

*/

async function multiUpdate(yam1, yam2, yam3){

	let deleteCall = shell('genie delete all')

	let genCall

	deleteCall.on('exit', () =>{

		fs.writeFile(
	      "./lamp.config.yml",
	      yam1(),
	      () => { });
		
		genCall = shell('genie generate')
		
		genCall.on('exit', ()=>{

			fs.writeFile(
		      "./lamp.config.yml",
		      yam2(),
		      () => {}
		    )

			let updateCall = shell('genie update')
			
			updateCall.on('exit', ()=>{
			
				fs.writeFile(
			      "./lamp.config.yml",
			      yam3(),
			      () => {}
			    )

				let updateCall2 = shell('genie update')

				updateCall2.on('exit', ()=>{

					process.exit()
				})
			})
		})
	})
}

const testEleven = () => {
	multiUpdate(config.testEightBaseYaml, config.testEightAddYaml, config.testNineAddYaml)
}

/*

generate store and then add a completely new model 
using the 'update' method
Ducks model

*/

let testTwelve = () => {

	updateTest(config.testTwelveBaseYaml, config.testTwelveAddYaml)
}

/*

update creates new model, then creates another new model
Ducks model
- shouldn't matter if the next file structures are Rails
because the lamp updater will ignore subsequent structure choices :)

*/

const testThirteen = () => {

	multiUpdate(config.testTwelveBaseYaml, config.testEightAddYaml, config.testNineAddYaml)
}

/*
generate store with a model that doesn't have actions
or thunks and then add the action section using the 'update' method
Rails model- thunks not included on action files
*/

const testFourteen = () => {

	updateTest(config.testFourteenBaseYaml, config.testFourteenAddYaml)
}

/*
generate store with a model that has actions and thunks defined
and then add to each section using the 'update' method
Rails model- thunks included in separate files
*/

const testFifteen = () => {

	updateTest(config.testFifteenBaseYaml, config.testFifteenAddYaml)
}

/*

update creates actions for an existing model, then creates another set
of actions for the same model new model
Rails model

*/


const testSixteen = () => {

	const configOne = () => {return `Structure: Rails 

Models:

  - dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    Actions:
      - countDux


    Thunks:
      - getAll:
        - "/api/Dux" 
        - countDux
 

  - Ducklings:

    Slice:
      - Name: string
    
    Actions:
      - countDucklings 
        `}


	const configTwo = () => {return `Structure: Rails 

Models:

  - dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean
  	
    Actions:
      - countDux
      - migrateDux

    Thunks:
      - getAll:
        - "/api/Dux" 
        - countDux
      - getOne: 
        - "/api/Dux/:dux"
        - migrateDux

  - Ducklings:

    Slice:
      - Name: string
    
    Actions:
      - countDucklings
      - migrateDucklings
      - quackOne

    Thunks:
      - getAll:
        - "/api/Dux" 
        - countDucklings
      - getOne: 
        - "/api/Dux/:dux"
        - migrateDucklings
        `}

	const configThree = () => {return `Structure: Rails 

Models:

  - dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    Actions:
      - countDux
      - migrateDux
      - quackOne

    Thunks:
      - getAll:
        - "/api/Dux" 
        - countDux
      - getOne: 
        - "/api/Dux/:dux"
        - migrateDux

  - Ducklings:

    Slice:
      - Name: string
    
    Actions:
      - countDucklings
      - migrateDucklings
      - quackOne

    Thunks:
      - getAll:
        - "/api/Dux" 
        - countDucklings
      - getOne: 
        - "/api/Dux/:dux"
        - migrateDucklings
        `}

	multiUpdate(configOne, configTwo, configThree)
}




/*
generate store with a model that has actions
and then add actions using the 'update' method
Rails model
*/



const testSeventeen = () => {

	const configOne = () => {return `Structure: Ducks 

Models:

  - dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    Actions:
      - countDux


    Thunks:
      - getAll:
        - "/api/Dux" 
        - countDux
 

  - Ducklings:

    Slice:
      - Name: string
    
    Actions:
      - countDucklings 
        `}


	const configTwo = () => {return `Structure: Ducks 

Models:

  - dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean
  	
    Actions:
      - countDux
      - migrateDux

    Thunks:
      - getAll:
        - "/api/Dux" 
        - countDux
      - getOne: 
        - "/api/Dux/:dux"
        - migrateDux

  - Ducklings:

    Slice:
      - Name: string
    
    Actions:
      - countDucklings
      - migrateDucklings
      - quackOne

    Thunks:
      - getAll:
        - "/api/Dux" 
        - countDucklings
      - getOne: 
        - "/api/Dux/:dux"
        - migrateDucklings
        `}

	updateTest(configOne, configTwo)
}


/*

genie add - " 18 add creates new models in Rails structure"

*/

const addTest = (yam1, command) => {

	// print new config file with new model added

	let deleteCall = shell('genie delete all')

	let genCall

	deleteCall.on('exit', () =>{

		// print config file

		fs.writeFile(
	      "./lamp.config.yml",
	      yam1(),
	      () => { });
		
		// run genie generate (after deleting and rewriting config)

		genCall = shell('genie generate')
		
		// console.log(genCall)

		genCall.on('exit', ()=>{

			let addCall = shell(command)
		
			addCall.on('exit', ()=>{
			
				process.exit()
			})
		})
	})

}

const testEighteen = () => {

	const configOne = () => {return `Structure: Rails 

Models:

  - dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    Actions:
      - countDux

    Thunks:
      - getAll:
        - "/api/Dux" 
        - countDux
        `}

    const command = 'genie add --newModel Duckling -a getAllDucks -a quackOne -t addQuack -t quackRemote --noCRUD'

	addTest(configOne, command)
}

const testNineteen = () => {

	const configOne = () => {return `Structure: Ducks 

Models:

  - dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    Actions:
      - countDux


    Thunks:
      - getAll:
        - "/api/Dux" 
        - countDux
      - getSome:
        - "/api/Dux" 
        - countDux
     
  - Ducklings:

    Slice:
      - Name: string
    
    Actions:
      - countDucklings 
        `}

    const command = 'genie add --model Dux -a getAllDucks -a quackOne -t addQuack -t getAll --noCRUD'

	addTest(configOne, command)
}

module.exports = [ 

testZero, 
testOne, 
testTwo, 
testThree, 
testFour,
testFive,
testSix,
testSeven,
testEight,
testNine,
testTen,
testEleven,
testTwelve,
testThirteen,
testFourteen,
testFifteen,
testSixteen,
testSeventeen,
testEighteen,
testNineteen

]


/*
generate store with a model that doesn't have thunks, where
thunks are printed in a separate file,
and then add the thunks section using the 'update' method
Rails model
*/



/*
generate store with a model that doesn't have thunks, where
thunks are included in the action file,
and then add the thunks section using the 'update' method
Rails model
*/



/*
generate store with a model that has thunks
and then add thunks using the 'update' method
Rails model
*/

/*
generate store, added "CRUD" false, and make sure
the update call doesn't enqueue any updates 
Rails model
*/


/*
generate store, add "CRUD" true, and make sure
the update call doesn't fail 
Rails model
*/



/*
generate store and make sure "CRUD = true" doesn't 
affect the generate call

*/


/*
generate store with a model that doesn't have actions
and then add the action section using the 'update' method
Ducks model
*/




/*
generate store with a model that has actions
and then add actions using the 'update' method
Ducks model
*/



/*
generate store with a model that doesn't have thunks
and then add the thunks section using the 'update' method
Ducks model
*/



/*
generate store with a model that has thunks
and then add thunks using the 'update' method
Ducks model
*/



/*
generate store, added "CRUD" false, and make sure
the update call doesn't enqueue any updates 
Ducks model
*/

/*
generate store and then add a completely new model 
using the 'add' method
Rails model
*/

	// steps involved in add model- 



/*
generate store with a model that doesn't have actions
and then add the action section using the 'add' method
Rails model
*/




/*
generate store with a model that has actions
and then add actions using the 'add' method
Rails model
*/



/*
generate store with a model that doesn't have thunks
and then add the thunks section using the 'add' method
Rails model
*/



/*
generate store with a model that has thunks
and then add thunks using the 'add' method
Rails model
*/

/*
generate store, added "CRUD" false, and make sure
the add call doesn't enqueue any updates 
Rails model
*/




/*
generate store and then add a completely new model 
using the 'add' method
Ducks model
*/





/*
generate store with a model that doesn't have actions
and then add the action section using the 'add' method
Ducks model
*/




/*
generate store with a model that has actions
and then add actions using the 'add' method
Ducks model
*/



/*
generate store with a model that doesn't have thunks
and then add the thunks section using the 'add' method
Ducks model
*/



/*
generate store with a model that has thunks
and then add thunks using the 'add' method
Ducks model
*/



/*
generate store, added "CRUD" false, and make sure
the add call doesn't enqueue any updates 
Ducks model
*/


