#!/usr/bin/env node

const fs = require('fs');
const chalkAnimation = require('chalk-animation');
const minimist = require('minimist');
const chalk = require('chalk');
const { spawn } = require('child_process');
const currentDirectory = require('path').dirname;
let input = minimist(process.argv);
let command = input._[2];
let arg1 = input._[3];
const { makeLock, diffLock } = require('./lock');
const simulation_dev = require('./test/old/generate_tests/test_simulation.dev');

if (process.env.mode === 'testing') {
  console.log = () => {};
}

const shell = command => {
  let thisCommand = spawn(command, { shell: true, stdio: 'inherit' });
  return thisCommand;
};

if (command === 'generate' || command === 'gen') {
  console.log(chalk.red('genie generate'));

  // if theres a lamp config

  let gencommand = `node ${__dirname}/generator_code_root.js`;

  let generateCall = shell(gencommand);
}

if (command === 'update') {
  console.log(chalk.red('genie update'));

  let updateCommand = `node ${__dirname}/updateCodeRoot.js`;

  let updateCall = shell(updateCommand);
}

if (command === 'add') {
  console.log(chalk.red('genie add'));

  let updateCommand = `add=${process.argv.slice(
    2
  )} node ${__dirname}/updateCodeRoot.js`;

  let addCall = shell(updateCommand);
}

if (command === 'ls' || command === 'l' || command === 'list') {
  let ls = `node ${__dirname}/ls.js`;
  shell(ls);
}

if (command === 'sample' || command === 's') {
  let sampleCommand = `node ${__dirname}/sample.js`;
  shell(sampleCommand);
}

// these will only be for development

if (command === 'delete' || command === 'del') {
  let genieDeleteCall = `node ${__dirname}/erase_dummy_store.js`;

  shell(genieDeleteCall);
}

if (command === 'simdev') {
  if (arg1 === 'last') {
    simulation_dev[simulation_dev.length - 1]();
  } else if (typeof arg1 === 'number') {
    simulation_dev[Number(arg1)]();
  }
}

if (command === 'sim') {
  require('./simulationstwo')[Number(arg1)]();
}
