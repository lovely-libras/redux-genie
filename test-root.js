const { spawn } = require('child_process')

const shell = command => {
  let thisProc = spawn(command, { shell: true, stdio: "inherit" });

  return thisProc;
};

let firstTest = shell('mode=testing mocha ./test/generate_tests/rails.spec.js --timeout 4000')

firstTest.on('exit',()=>{

	let secondTest = shell('mode=testing mocha ./test/generate_tests/ducks.spec.js --timeout 4000')
})

