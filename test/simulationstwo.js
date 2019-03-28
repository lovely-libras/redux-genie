const fs = require('fs')
const chalk = require('chalk')
const { spawn, spawnSync } = require('child_process')
const util = require('util')

const shell = (command) => {

  let thisCommand = spawn(command, {shell: true, 
            stdio: 'inherit'
                }
            )

  return thisCommand
}

const shellSync = (command) => {

  return spawnSync(command, {shell: true, 
            stdio: 'inherit'
                }
            )


}

// define simulation

let simulationZero = () => {

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

let simulationOne = () => {

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


let simulationTwo = () => {

  const thisConfig = `Structure: Rails

Logging: false 

Models:
  - campus:

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
        - migrateDux`

  genTest(thisConfig)

}

let simulationThree = () => {

  const thisConfig = `Structure: Ducks

Logging: false 

Models:
  - campus:

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
        - migrateDux`

  genTest(thisConfig)

}

let simulationFour = () => {

  const thisConfig = `Structure: Rails

Thunks: included 

Models:
  - campus:

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
        - migrateDux`

  genTest(thisConfig)

}

let simulationFive = () => {

  const thisConfig = `Structure: Ducks

Thunks: included 

Models:
  - campus:

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
        - migrateDux`

  genTest(thisConfig)

}

let simulationSix = () => {

  const thisConfig = `Structure: Rails

Models:
  - campus:

    CRUD: false

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
        - migrateDux`

  genTest(thisConfig)

}

let simulationSeven = () => {

  const thisConfig = `Structure: Ducks

Models:
  - campus:

    CRUD: false

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
        - migrateDux`

  genTest(thisConfig)

}

let simulationEight = () => {

  const thisConfig = `Structure: Rails

Models:
  - campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    Actions:
      - countDux
     # - migrateDux

    Thunks:
      - getAll:
        - "/api/Dux" 
        - countDux
      - getOne: 
        - "/api/Dux/:dux"
        - migrateDux`

  genTest(thisConfig)

}

let simulationNine = () => {

  const firstYam = `Structure: Ducks

Models:


  - Campus:

    CRUD: false
    
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean


          `

  const secondYam = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

      `

  updateTest(firstYam, secondYam)      

}

module.exports = [ 

simulationZero, 
simulationOne, 
simulationTwo, 
simulationThree, 
simulationFour,
simulationFive,
simulationSix,
simulationSeven,
simulationEight,
simulationNine
]



function genTest(yaml){

  let deleteCall = shell('rm -r store .lamp-lock.json')

  let genCall

  return deleteCall.on('exit', () =>{

    fs.writeFile(
        "./lamp.config.yml",
        yaml,
        () => { });
    
    genCall = shell('genie generate')
    
    return genCall

  })
}

function updateTest(yam1, yam2){

  // print new config file with new model added

  let deleteCall = shell('rm -r store .lamp-lock.json')

  let genCall

  deleteCall.on('exit', () =>{

    // print config file

    fs.writeFile(
        "./lamp.config.yml",
        yam1,
        () => { });
    
    // run genie generate (after deleting and rewriting config)

    genCall = shell('genie generate')
    
    // console.log(genCall)

    genCall.on('exit', ()=>{

      fs.writeFile(
          "./lamp.config.yml",
          yam2,
          () => {}
        )

      let updateCall = shell('genie update')
    
      updateCall.on('exit', ()=>{
      
        process.exit()
      })
    })
  })
}