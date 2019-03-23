// this is for dev purposes only- not to be used in unit or
// integration tests
// for config files for test simulations, use config.js 

const testZeroYaml = () => {

  return `Structure: Rails 

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
        - migrateDux`
}

const testOneYaml = () => {

  return `Structure: Rails 

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

module.exports = {
  testZeroYaml, 
  testOneYaml, 
  testTwoYaml,
  testThreeYaml,
  testFourYaml,
  testFiveYaml,
  testSixYaml,
  testSevenYaml
}

/*

const zeroBaseConfig = () => {

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
      - getAll: "/api/Dux"`
}

const zeroAddedModel = () => {

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
      - getOne: "api/terminator/:terminator"`
}

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
      - getOne: "api/terminator/:terminator"`
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