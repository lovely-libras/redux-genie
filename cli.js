#!/usr/bin/env node

const minimist = require('minimist');
const { spawn } = require('child_process');
let input = minimist(process.argv);
let command = input._[2];
let arg1 = input._[3];

if (process.env.mode === 'testing') {
  console.log = () => {};
}

const shell = command => {
  spawn(command, { shell: true, stdio: 'inherit' });
};

if (command === 'help' || command === 'h') {
  let help = `node ${__dirname}/help.js`;
  shell(help);
}

if (command === 'sample' || command === 's') {
  let sample = `node ${__dirname}/sample.js`;
  shell(sample);
}

if (command === 'generate' || command === 'gen' || command === 'g') {
  let gen = `node ${__dirname}/generator_code_root.js`;
  shell(gen);
}

if (command === 'list' || command === 'ls' || command === 'l') {
  let ls = `node ${__dirname}/ls.js`;
  shell(ls);
}

if (command === 'delete' || command === 'del' || command === 'd') {
  let del = `node ${__dirname}/erase_dummy_store.js`;
  shell(del);
}

if (command === 'update' || command === 'u') {
  let update = `node ${__dirname}/updateCodeRoot.js`;
  shell(update);
}

if (command === 'add' || command === 'a') {
  let add = `add=${process.argv.slice(2)} node ${__dirname}/updateCodeRoot.js`;
  shell(add);
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
