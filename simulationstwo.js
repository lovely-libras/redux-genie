const fs = require('fs')
const chalk = require('chalk')
const { spawn } = require('child_process')
const util = require('util')

const shell = (command) => {

  let thisCommand = spawn(command, {shell: true, 
            stdio: 'inherit'
                }
            )

  return thisCommand
}


// define simulation

let simulationOne = () => {

	const thisConfig = `Structure: Rails

Logging: false

Models:
  - Campus:
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean
    CRUD: true
    Actions:
      - countDux
    Thunks:
      - getAll:
          - "/api/Dux"
          - getAllCampus
      - getOne:
          - "/api/Dux/:dux"
          - getCampus
  - terminator:
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number`

	genTest(thisConfig)

}

let simulationTwo = () => {

  const thisConfig = `Structure: Ducks

Logging: false

Models:
  - Campus:
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean
    CRUD: true
    Actions:
      - countDux
    Thunks:
      - getAll:
          - "/api/Dux"
          - getAllCampus
      - getOne:
          - "/api/Dux/:dux"
          - getCampus
  - terminator:
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number`

  genTest(thisConfig)
  
}


module.exports = [ simulationOne, simulationTwo ]



function genTest(yaml){

  // delete current store

  let deleteCall = shell('genie delete all')

  let genCall

  return deleteCall.on('exit', () =>{

    // print config file

    fs.writeFile(
        "./lamp.config.yml",
        yaml,
        () => { });
    
    genCall = shell('genie generate')
    
    return genCall

  })
}