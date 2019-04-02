let erase = require('child_process').spawn('rm -r store .lamp-lock.json', {
  shell: true,
});

erase.on('exit', () => {
  process.exit();
});
