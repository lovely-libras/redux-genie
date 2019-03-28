const chalk = require('chalk');
const clear = require('clear');
const fs = require('fs');
let { spawn } = require('child_process');
let rails = require('./generator_code_files/rails_style/rails_index');
const ducks = require('./generator_code_files/ducks_style');
const yaml = require('js-yaml');
const create_store = require('./generator_code_files/ducks_style/create_store');
const create_combine_reducers = require('./generator_code_files/ducks_style/create_combine_reducers');
const { makeLock } = require('./lock');

let data = `Structure: Ducks

Models:
  - horses:

    Slice:
      - coat: string
      - trophies: number
      - neighing: boolean
      - riders: array
      - stable: object

    Thunks:
      - runRaceThunk:
          - /api/races
          - runRace

  - cobraChicken:

    Slice:
      - feathers: string
      - confirmedKills: number
      - isHunting: boolean
      - targets: array
      - flockMembers: object

    CRUD: false

    Actions:
      - flyTogether
      - huntTogether
      - slayTogether

    Thunks:
      - migrateNorthThunk:
          - /api/geese
          - goNorth

# Want to edit this file?
# Be careful! Make sure that models and properties always have a
# space between the dash and the name. Major fields
# (Models, Actions, Thunks, CRUD) should all have a colon after them.
# Also, the name of this file **must** be lamp.config.yaml or the code will not run.
#
# This is how your file should look:
#
# Structure: Ducks
#
# Models:
#
# - Ducks:
#
#      - feathers: number
#
#    CRUD: false
#
#     Actions:
#      - migrateSouth
#      - flyTogether
#`;

if (fs.existsSync('./lamp.config.yml')) {
  console.log(chalk.red('\nYou already have a lamp.config.yml!'));
} else {
  console.log(chalk.hex('#764fb7')('Your wish is my command!'));
  fs.writeFile('./lamp.config.yml', data);
}
