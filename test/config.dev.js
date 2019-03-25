// this is for dev purposes only- not to be used in unit or
// integration tests
// for config files for test simulations, use config.js 

/* 

note- it would have been cleaner to export these as an 
object or class with each function as a method, rather
than defining each function and then exporting them 
explicitly at the bottom

*/

const testZeroYaml = () => {

  return `Structure: Rails

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
        - migrateDux

  - terminator:

    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number

    Actions:
      - killJohnConnor
      - backInTime

    Thunks:
      - getAll: 
        - "api/terminator"
        - killJohnConnor
      - getOne: 
        - "api/terminator/:terminator"
        - backInTime`
}

const testOneYaml = () => {

  return `Structure: Ducks

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
      - quackOne

    Thunks:
      - getAll:
        - "/api/Dux" 
        - countDux
      - getOne: 
        - "/api/Dux/:dux"
        - migrateDux

  - terminator:

    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number

    Actions:
      - killJohnConnor
      - backInTime

    Thunks:
      - getAll: 
        - "api/terminator"
        - killJohnConnor
      - getOne: 
        - "api/terminator/:terminator"
        - backInTime`
}

const testTwoYaml = () => {

  return `Structure: Rails 

Logging: false  

Models:
  - Dux:

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
        - migrateDux`
}

const testThreeYaml = () => {

  return `Structure: Ducks 

Models:
  - Dux:

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
        - migrateDux`
}

const testFourYaml = () => {

  return `Structure: Ducks 

Thunks: included

Models:
  - Dux:

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
        - migrateDux`
}

const testFiveYaml = () => {

  return `Structure: Ducks 

Logging: false

Models:
  - Dux:

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
        - migrateDux`
}

const testSixYaml = () => {

  return `Structure: Ducks 

Models:
  - Dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    CRUD: false

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
        - migrateDux`
}

const testSevenYaml = () => {

  return `Structure: Rails 

Models:
  - Dux:
    CRUD: false
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
        - migrateDux`
}

const testEightBaseYaml = () => {

return `Structure: Rails 

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
        - migrateDux`
}

const testEightAddYaml = () => {

return `Structure: Rails 

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

  - terminator:

    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number

        `
}

const testNineBaseYaml = () => {

return `Structure: Rails 

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
        - migrateDux`
}

const testNineAddYaml = () => {

return `Structure: Rails 

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

  - terminator:

    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number

  - Ducklings:

    Slice:
      - Name: string

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

        `
}

const testTenBaseYaml = () => {

return `Structure: Rails 

Models:
  - dux:
    CRUD: false
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
        - migrateDux`
}

const testTenAddYaml = () => {

return `Structure: Rails 

Models:

  - dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean
    
    CRUD: false

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

  - Terminator:

    CRUD: false
    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number
    

  - Ducklings:

    Slice:
      - Name: string
    
    CRUD: false

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

        `
}

// 11 was the multi update test

const testTwelveBaseYaml = () => {

return `Structure: Ducks 

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
        - migrateDux`
}

const testTwelveAddYaml = () => {

return `Structure: Ducks 

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

  - terminator:

    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number

        `
}

const testFourteenBaseYaml = () => {

return `Structure: Rails 

Models:

  - dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

  - Ducklings:

    Slice:
      - Name: string
    

        `
}

const testFourteenAddYaml = () => {

return `Structure: Rails 

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
    
    CRUD: false

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
        `
}


const testFifteenBaseYaml = () => {

return `Structure: Rails 

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
      - migrateDucklings

    Thunks:
      - getAll:
        - "/api/Dux" 
        - countDucklings
    

        `
}

const testFifteenAddYaml = () => {

return `Structure: Rails 

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
    
    CRUD: false

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
        `
}


module.exports = {

  // generate yamls
  testZeroYaml, 
  testOneYaml, 
  testTwoYaml,
  testThreeYaml,
  testFourYaml,
  testFiveYaml,
  testSixYaml,
  testSevenYaml,

  // update yamls
  testEightBaseYaml,
  testEightAddYaml,
  testNineBaseYaml,
  testNineAddYaml,
  testTenBaseYaml,
  testTenAddYaml,
  testTwelveBaseYaml,
  testTwelveAddYaml,
  testFourteenBaseYaml,
  testFourteenAddYaml,
  testFifteenBaseYaml,
  testFifteenAddYaml
}

/*

const oneBaseConfig = () => {

return `Structure: Ducks 

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
      - getAll: "/api/Dux"`
}

const oneAddedModel = () => {

return `Structure: Ducks 

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
      - getAll: "/api/Dux"

  - terminator:

    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number

    Actions:
      - killJohnConnor
      - backInTime

    Thunks:
      - getAll: "api/terminator"
      - getOne: "api/terminator/:terminator"
      `
}

module.exports = {

  zeroBaseConfig,
  zeroAddedModel,
  oneBaseConfig,
  oneAddedModel

}

*/


/*
# heres the entire config file:

Structure: Rails # Two options: Rails || Ducks

# Thunks: included # thunks will be included in the same file as the actions
# Logging: false  # configures logging middleware

Models:

  - dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    CRUD: false

    Actions:
      - countDux
      - migrateDux
      - quackOne

    Thunks:
      - getAll: "/api/Dux"
      # - getOne: "/api/Dux/:dux"
      # - getStuff: "/api/Dux/getStuff"

  # - terminator:

  #   Slice:
  #     - WillBeBack: Boolean
  #     - OneLiners: Array
  #     - Sequels: Number

  #   Actions:
  #     - killJohnConnor
  #     - backInTime

  #   Thunks:
  #     - getAll: "api/terminator"
  #     - getOne: "api/terminator/:terminator"

  # - Ducklings: 

  #   Slice: 
  #     - lilFeet: Array

*/