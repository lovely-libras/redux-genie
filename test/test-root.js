let count = 0

while(count < 44){

	require('child_process').spawnSync(`sim=${count} mocha ./test/fullsuite.spec.js --timeout 4000`, { shell: true, stdio: "inherit" })
	
	count++
}
