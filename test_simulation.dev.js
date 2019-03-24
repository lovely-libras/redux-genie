// this is for dev purposes only- not to be used in unit or
// integration tests
// for test simulations, use test-simulation.js 

/* 

this file contains simulated method calls
to systemitize writing and testing the add and update
methods for both file structures

see the cli.js file under "genie sim" 

*/

const config = require('./test/config.dev') // these are dummy lamp.config.yml files
const fs = require('fs').promises
const chalk = require('chalk')
const { spawn } = require('child_process')
const util = require('util')

const shell = (command) => {

	let thisCommand	= spawn(command, {shell: true, 
						stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ]
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

async function genTest(yamlFunc){

	// delete current store

	let deleteCall = shell('genie delete all')

	deleteCall.on('exit', async () =>{

		// print config file

		await fs.writeFile(
	      "./lamp.config.yml",
	      yamlFunc(),
	      () => { });
		
		// run genie generate (after deleting and rewriting config)

		let genCall = shell('genie generate')

		genCall.on('message', (message)=>{

			console.log(chalk.yellow(message))

		})

	})
}

/*

generate store 
	- Rails
	- thunks separated

	expect-
		there to be separate files for both thunk libraries
*/


const testZero = () => {
	genTest(config.testZeroYaml)
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

	// delete current store

	let deleteCall = shell('genie delete all')

	deleteCall.on('exit', async () =>{

		// print base config file- first circle of hell

		await fs.writeFile(
	      "./lamp.config.yml",
	      yam1(),
	      () => {}
	    );

		// run genie generate (after deleting and rewriting config)

		let genCall = shell('genie generate')


		genCall.on('message', (message)=>{

			console.log(chalk.yellow(message))
		})

		genCall.on('exit', async () =>{

			// print new config file with new model added

			await fs.writeFile(
		      "./lamp.config.yml",
		      yam2(),
		      () => {}
		    )

			let updateCall = shell('genie update')
			console.log('update call firing')
			updateCall.on('message', (message)=>{

				console.log(chalk.yellow(message))
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

update creates one new model with no thunks or actions- CRUD true
Rails model

	- expect - 
		- reducer file for new model
		- selector file for new model
		- actions with crud methods
		- no thunk file
		- reducer updated with both models
		- action constants updated with all models

*/

let testEight = () => {
	console.log('running test 8')
	updateTest(config.testEightBaseYaml, config.testEightAddYaml)
}


/* 

update creates multiple new models with no thunks or actions- CRUD true
Rails model

*/

/*

update creates new model with no thunks or actions- CRUD false
Rails model

	- expect - 
		- reducer file for new model
		- selector file for new model

*/


/*
update creates new model with separate thunks and added actions- CRUD true
Rails model

	- expect - 
		- reducer file for new model
		- selector file for new model

*/


module.exports = [ 
testZero, 
testOne, 
testTwo, 
testThree, 
testFour,
testFive,
testSix,
testSeven,
testEight
]

/*
generate store and then add a completely new model 
using the 'update' method
Ducks model

*/


/*
generate store with a model that doesn't have actions
and then add the action section using the 'update' method
Rails model
*/




/*
generate store with a model that has actions
and then add actions using the 'update' method
Rails model
*/



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


