const chalk = require('chalk');
const fs = require('fs');

let sampleData = `Structure: Ducks

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
  console.log(
    chalk.red(`You already have a ${chalk.white('lamp.config.yml')}!`)
  );
} else {
  console.log(chalk.hex('#764fb7')('Your wish is my command!'));
  fs.writeFile('./lamp.config.yml', sampleData, function(err, data) {
    if (err) console.error(err);
    console.log(chalk.green('Successfully created lamp.config.yml!'));
  });
}
