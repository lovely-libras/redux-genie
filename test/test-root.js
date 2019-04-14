let count = 39

while(count < 40){

	require('child_process').spawnSync(`sim=${count} mocha ./test/fullsuite.spec.js --timeout 4000`, { shell: true, stdio: "inherit" })
	
	count++
}
