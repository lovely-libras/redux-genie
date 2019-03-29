const chalk = require('chalk');
const fs = require('fs');

let sampleData = `
# This is a sample of a lamp.config.yml configuration.
# Please visit https://redux-genie.herokuapp.com/ for a guided tutorial for creating your own YML configuration file.

Structure: Ducks # Ducks || Rails

Models:
  - trains:

    Slice:
      - color: string
      - cars: number
      - inTransit: boolean
      - conductors: array
      - stations: object

    Thunks:
      - sendToStationThunk:
          - /api/stations
          - sendToStation

  - ducks:

    Slice:
      - feathers: string
      - flockSize: number
      - isMigrating: boolean
      - sightings: array
      - flockMembers: object

    CRUD: false

    Actions:
      - flyTogether
      - seasonState

    Thunks:
      - migrateSouthThunk:
          - /api/geese
          - goSouth
`;

if (fs.existsSync('./lamp.config.yml')) {
  console.log(
    chalk.red(`You already have a ${chalk.white('lamp.config.yml')}!`)
  );
} else {
  console.log(chalk.hex('#764abc')('Your wish is my command!'));
  fs.writeFile('./lamp.config.yml', sampleData, function(err, data) {
    if (err) console.error(err);
    console.log(
      chalk.green(`Successfully created ${chalk.white('lamp.config.yml')}!`)
    );
  });
}
