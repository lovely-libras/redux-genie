const fs = require('fs')
let { spawn } = require('child_process')
const { actionFuncs_boiler,  actionTypes_boiler } = require('./boiler_index')

let makeDir = spawn('mkdir POC_boiler', { shell: true })

makeDir.on('exit', () => {
	fs.writeFile('./POC_boiler/action_types.js', actionTypes_boiler(process.argv.slice(2)), () => console.log('actionTypes_boiler'))
	fs.writeFile('./POC_boiler/action_function_creators.js', actionFuncs_boiler(process.argv.slice(2)), () => console.log('actionFuncs_boiler'))
	
})

	


