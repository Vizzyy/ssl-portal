const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const statusPath = '/home/pi/login/logs/status.txt';
const logPath = '/home/pi/login/logs/portalLog.txt';

router.get('/', function(req, res) {
	res.render('index', {
		admin : req.isAdmin,
		owner : req.isOwner
	});
});

function execute(command, res) {
	exec(command, function(error, stdout, stderr) {
		if (error) {
			console.error('error:', error);
			return;
		}
		//console.log(stdout);
		if(res)
			res.send(stdout.split('\n').reverse());
		else 
			return;
	});
}

router.get('/open', function(req, res) {
	let logEntry = req.query.entry;
	execute("/usr/bin/python /home/pi/scripts/unlock.py");
	execute("echo '" + logEntry + "' >> " + logPath); //TODO: This is extremely bad
	execute("echo 'Opened' > " + statusPath);
	console.log(logEntry);
	res.end();
});

router.get('/close', function(req, res) {
	let logEntry = req.query.entry;
	execute("/usr/bin/python /home/pi/scripts/lock.py");
	execute("echo '" + logEntry + "' >> " + logPath);
	execute("echo 'Closed' > " + statusPath);
	console.log(logEntry);
	res.end();
});

router.get('/log', function(req, res) {
	let cmd = "cat " + logPath;
	console.log(cmd);
	execute(cmd, res);
});

router.get('/status', function(req, res) {
	let cmd = "cat " + statusPath;
	console.log(cmd);

	exec(cmd, function(error, stdout, stderr) {
		if (error) {
			console.error('error:', error);
			return;
		}
		res.send(stdout.split('\n')[0]);	// This is also bad
	});
});

module.exports = router;
