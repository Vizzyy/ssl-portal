const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const statusPath = '/home/pi/login/logs/status.txt';
const fs = require('fs'),
	rp = require('request-promise');
const constants = require('../constants');

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
		if(res)
			res.send(stdout.replace("\n", ""));
		else
			return stdout;
	});
}

router.get('/open', function(req, res) {
	let logEntry = req.query.entry + '\n';
	var requestOptions = Object.assign({}, constants.portalToDinkle);
	requestOptions.uri = requestOptions.uri+logEntry;

	execute("/usr/bin/python /home/pi/scripts/unlock.py"); // Physically move lock

	rp(requestOptions).then(function(body) {	// Make call to logging
		console.log(logEntry);
	}).catch(err => {
		console.log(err);
	});

	execute("echo 'Opened' > " + statusPath); // set Local state for lock

	res.end();
});

router.get('/close', function(req, res) {
	let logEntry = req.query.entry + '\n';
	var requestOptions = Object.assign({}, constants.portalToDinkle);
	requestOptions.uri = requestOptions.uri+logEntry;

	execute("/usr/bin/python /home/pi/scripts/lock.py");

	rp(requestOptions).then(function(body) {
		console.log(logEntry);
	}).catch(err => {
		console.log(err);
	});

	execute("echo 'Closed' > " + statusPath);

	res.end();
});

router.get('/status', function(req, res) {
	let cmd = "cat " + statusPath;
	console.log(cmd);
	execute(cmd, res);
});

module.exports = router;
