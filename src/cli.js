#!/usr/bin/env node

const minimist = require('minimist');
const { spawn } = require('child_process');
let input = minimist(process.argv);
let command = input._[2];
let arg1 = input._[3];
const gitCheck = require('./gitCheck')

if (process.env.mode === 'testing') {
  console.log = () => {};
}

const shell = command => {
  spawn(command, { shell: true, stdio: 'inherit' });
};


if (command === 'help' || command === 'h') {
  shell('man genie');
}

if (command === 'sample' || command === 's') {
  let sample = `node ${__dirname}/sample.js`;
  shell(sample);
}

if (command === 'generate' || command === 'gen' || command === 'g') {

  require('./generator_code_root')()
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
  let check = gitCheck()


  let update = `node ${__dirname}/updateCodeRoot.js`;
  

  shell(update);
}

if (command === 'add' || command === 'a') {
  let check = gitCheck()
  let add = `add=${process.argv.slice(2)} node ${__dirname}/updateCodeRoot.js`;

  check.on('exit', (exit)=>{
    
    console.log('here is the exit: ', exit)
    shell(add);
  })
}

if (command === 'sim') {

  require('./../test/testSimulations')[Number(arg1)]();
}
