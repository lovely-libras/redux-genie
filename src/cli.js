#!/usr/bin/env node

const minimist = require('minimist');
const { spawn } = require('child_process');
let input = minimist(process.argv);
let command = input._[2];
let arg1 = input._[3];
const gitCheck = require('./gitCheck')
const chalk = require('chalk')

input.gc === undefined ? input.gc = true : '' ;


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

  let update = `node ${__dirname}/updateCodeRoot.js`;

  if(!input.gc){
    shell(update)
    return 
  }
  
  let check = gitCheck()
  check.on('exit', (exit)=>{

    shell(update);
  })
}

if (command === 'add' || command === 'a') {
  let add = `add=${process.argv.slice(2)} node ${__dirname}/updateCodeRoot.js`;

  if(!input.gc){
    shell(add)
    return 
  }

  let check = gitCheck()
  check.on('exit', (exit)=>{
    
    shell(add);
  })
}

if (command === 'connect'){

  if(!input._[3] || !input._[4] || !input.m){
    console.log(chalk.yellow('Please specify file path, React component, and model/domain to be connected:'), chalk.red('\n"genie connect <Component File Name> <Component Name> -m <Model> -m <Model>"'))
    return
  }

  if(!input.gc){
    require('./connect')(input._[3], input._[4], input.m)
    return 
  }

  let check = gitCheck()
  check.on('exit', (exit)=>{
    
    require('./connect')(input._[3], input._[4], input.m)
  })

 
}

if (command === 'sim') {

  require('./../test/testSimulations')[Number(arg1)]();
}
