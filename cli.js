#!/usr/bin/env node

const minimist = require('minimist');
const { spawn } = require('child_process');
const currentDirectory = require('path').dirname;
let input = minimist(process.argv);
let command = input._[2];
let arg1 = input._[3];
const { makeLock, diffLock } = require('./lock');
const simulation = require('./test_simulation');

const generateCall = `node ${__dirname}/generator_code_root.js`;
const updateCall = `node ${__dirname}/updateCodeRoot.js`;
const ls = `node ${__dirname}/ls.js`;

const shell = command => {
  spawn(command, { shell: true, stdio: 'inherit' });
};

switch (command) {
  default:
    break;
  case 'generate':
    shell(generateCall);
    break;
  case 'update':
    shell(updateCall);
    break;
  case 'ls':
    shell(ls);
    break;
}

if (command === 'delete' && arg1 === 'all') {
  let genieDeleteCall = `node ${__dirname}/erase_dummy_store.js`;
  shell(genieDeleteCall);
}

if (command === 'sim') {
  if (arg1 === 'last') {
    simulation[simulation.length - 1]();
  } else {
    simulation[Number(arg1)]();
  }
}
