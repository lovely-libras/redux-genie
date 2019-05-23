const { spawn } = require('child_process');
const chalk = require('chalk')

module.exports= () => {

	let check = spawn('git status', {shell: true, stdio: ['ignore', 'pipe', process.stderr]})

	check.stdout.on('data', (data)=>{
		
		if(data.toString().includes('Untracked') || data.toString().includes('Changes not staged for commit')){
			console.log(chalk.red("\nPlease git commit before performing write operations with Redux Genie. \n\nThis is an npm package after all ;) \n"))
			console.log(chalk.red("If you really want to, you can override this with the --no-gc flag.\n"))
			console.log(data.toString())
			process.exit(0)
		}
	})

	return check
}

