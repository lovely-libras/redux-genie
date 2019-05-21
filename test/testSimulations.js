const fs = require('fs')
const { spawn, spawnSync } = require('child_process')
const util = require('util')

const shell = (command) => {

  let thisCommand = spawn(command, {shell: true, 
            stdio: 'inherit'
                }
            )

  return thisCommand
}

// define simulation
module.exports = [ 

function simulationZero(){

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

},

function simulationOne(){

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
  
},

function simulationTwo(){

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

},

function simulationThree(){

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

},

function simulationFour(){

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

},

function simulationFive(){

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

},

function simulationSix(){

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

},

function simulationSeven(){

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

},

function simulationEight(){

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

},

function simNine(){

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

},
function simTen(){

  const thisConfig = `Structure: Rails

Logging: false

Models:

  - Campus:
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean
   
      `

  genTest(thisConfig)

},
function sim11(){

  const thisConfig = `Structure: Ducks

Logging: false

Models:

  - Campus:
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean
   
      `

  genTest(thisConfig)

},
function sim12(){

  const thisConfig = `Structure: Rails

Logging: false

Models:

  - Campus:
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean
   
      `

  genTest(thisConfig)

},
function sim13(){

  const thisConfig = `Structure: Ducks

Logging: false

Models:

  - Campus:
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean
   
      `

  genTest(thisConfig)

},
function sim14(){

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
    
      `

  genTest(thisConfig)

},
function sim15(){

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
    
      `

  genTest(thisConfig)

},
'left blank',
'left blank again',
function sim18(){

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
    
      `

  genTest(thisConfig)

},
function sim19(){

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
    
      `

  genTest(thisConfig)

},
function sim20(){

  const first = `Structure: Rails

Models:

  - Campus:

    CRUD: false
    
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean


          `

  const second = `Structure: Rails

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:

    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
      `

  updateTest(first, second)      
},
function sim21(){

  const first = `Structure: Ducks

Models:

  - Campus:

    CRUD: false
    
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean


          `

  const second = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:

    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
      `

  updateTest(first, second)      
},
function sim22(){

  const first = `Structure: Rails

Models:

  - Campus:

    CRUD: false
    
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean


          `

  const second = `Structure: Rails

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
    CRUD: false
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
      `

  updateTest(first, second)      
},
function sim23(){

  const first = `Structure: Ducks

Models:

  - Campus:

    CRUD: false
    
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean


          `

  const second = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
    CRUD: false
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
      `

  updateTest(first, second)      
},
function sim24(){

  const first = `Structure: Rails

Models:

  - Campus:

    CRUD: false
    
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean


          `

  const second = `Structure: Rails

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
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
      `

  updateTest(first, second)      
},
function sim25(){

  const first = `Structure: Ducks

Models:

  - Campus:

    CRUD: false
    
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean


          `

  const second = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
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
      `

  updateTest(first, second)      
},
'left blank',
'left blank again',

function sim28(){

  const first = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
    Actions:
      - getJohnConnor

      `
  const second = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
    Actions:
      - getJohnConnor
      - hastaLaVista
 
      `

  updateTest(first, second)      
},
function sim29(){

  const first = `Structure: Rails

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
    Actions:
      - getJohnConnor

      `
  const second = `Structure: Rails

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
    Actions:
      - getJohnConnor
      - hastaLaVista
 
      `

  updateTest(first, second)      
},
function sim30(){

  const first = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
    Actions:
      - getJohnConnor

      `
  const second = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
    Actions:
      - getJohnConnor
      - hastaLaVista
 
      `

  updateTest(first, second)      
},
function sim31(){

  const first = `Structure: Rails

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
    

      `
  const second = `Structure: Rails

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
    Actions:
      - getJohnConnor
      - hastaLaVista
 
      `

  updateTest(first, second)      
},
function sim32(){

  const first = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
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
       
      `
  const second = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
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
      `

  updateTest(first, second)      
},

function sim33(){

  const first = `Structure: Rails

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
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
       
      `
  const second = `Structure: Rails

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
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
      `

  updateTest(first, second)      
},
function sim34(){

  const first = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
    Actions:
      - getJohnConnor
      - hastaLaVista       
      `
  const second = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
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
      `

  updateTest(first, second)      
},
function sim35(){

  const first = `Structure: Rails

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
    Actions:
      - getJohnConnor
      - hastaLaVista       
      `
  const second = `Structure: Rails

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
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
      `

  updateTest(first, second)      
},
function sim36(){

  const first = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean
      
      `
  const second = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean
 
      `

  updateTest(first, second)

},
function sim37(){

  const first = `Structure: Rails

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean
      
      `
  const second = `Structure: Rails

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean
 
      `

  updateTest(first, second)

},
function sim38(){

  const first = `Structure: Ducks

Models:

  - Campus:
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    Actions:
      - countDux
      
      `
  const second = `Structure: Ducks

Models:

  - Campus:
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    Actions:
      - countDux
      - countDux
  
 
      `

  updateTest(first, second)

},
function sim39(){

  const first = `Structure: Rails

Models:

  - Campus:
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    Actions:
      - countDux
      
      `
  const second = `Structure: Rails

Models:

  - Campus:
    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    Actions:
      - countDux
      - countDux
  
 
      `

  updateTest(first, second)

},

function sim40(){

  const first = `Structure: Rails

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
      `
  const second = `Structure: Rails

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
      - getAll:
          - "/api/Dux"
          - getAllCampus     
      `

  updateTest(first, second)

},

'omitted planned test',

function sim42(){

  const first = `Structure: Ducks

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
      `
  const second = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
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
      `

const third = `Structure: Ducks

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
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

  - DucklingTerminator:

    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
      `

  multiTest(first, second, third, 'update', 'update')

},

function sim43(){

  const first = `Structure: Rails

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
      `
  const second = `Structure: Rails

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
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
      `

const third = `Structure: Rails

Models:

  - Campus:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - terminator:
  
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

  - DucklingTerminator:

    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
      `

  multiTest(first, second, third, 'update', 'update')

},

]

function genTest(yaml){

  let deleteCall = shell('genie delete all')

  let genCall

  return deleteCall.on('exit', () =>{

    fs.writeFile(
        "./lamp.config.yml",
        yaml,
        () => { });
    
    genCall = shell('genie generate --no-gc')
    
    return genCall

  })
}

function updateTest(yam1, yam2){

  // print new config file with new model added

  let deleteCall = shell('genie delete all')

  let genCall

  deleteCall.on('exit', () =>{

    // print config file

    fs.writeFile(
        "./lamp.config.yml",
        yam1,
        () => { });
    
    // run genie generate (after deleting and rewriting config)

    genCall = shell('genie generate --no-gc')
    
    genCall.on('exit', ()=>{

      fs.writeFile(
          "./lamp.config.yml",
          yam2,
          () => {}
        )

      let updateCall = shell('genie update --no-gc')
     
      updateCall.on('exit', ()=>{
      
        process.exit()
      })
    })
  })
}


function multiTest(yam1, yam2, yam3, second, third){

  // print new config file with new model added

  let deleteCall = shell('genie delete all')

  let genCall

  deleteCall.on('exit', () =>{

    // print config file

    fs.writeFile(
        "./lamp.config.yml",
        yam1,
        () => { });
    
    // run genie generate (after deleting and rewriting config)

    genCall = shell('genie generate --no-gc')
    
    genCall.on('exit', ()=>{

      fs.writeFile(
          "./lamp.config.yml",
          yam2,
          () => {}
        )

      let secondCall = shell(`genie ${second} --no-gc`)
     
      secondCall.on('exit', ()=>{

          fs.writeFile(
            "./lamp.config.yml",
            yam3,
            () => {}
          )
        
          thirdCall = shell(`genie ${third} --no-gc`)

          thirdCall.on('exit', ()=>{

            process.exit()
          })
      })
    })
  })
}

