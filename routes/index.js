const 	express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
let lightOneStatus = true, lightTwoStatus = true;

router.get('/', function(req, res) {
    res.render('index', {
        admin : req.isAdmin,
        owner : req.isOwner
    });
});

function execute(command){
    exec(command, function (error, stdOut, stdErr) {
        return stdOut;
    });
}

//Toggle light 1
router.get('/light1', function(req, res) {
    if(req.query.status == "true"){
        execute("echo 24 > /sys/class/gpio/export");
        execute("echo out > /sys/class/gpio/gpio24/direction");
        execute("echo 18 > /sys/class/gpio/export");
        execute("echo out > /sys/class/gpio/gpio18/direction");
        execute("echo 1 > /sys/class/gpio/gpio18/value");
    } else {
        execute("echo 0 > /sys/class/gpio/gpio24/value");
        execute("echo 24 > /sys/class/gpio/unexport");
        execute("echo 0 > /sys/class/gpio/gpio24/value");
        execute("echo 24 > /sys/class/gpio/unexport");
    }
    lightOneStatus = req.query.status;
    res.end();
});

//Toggle light 2
router.get('/light2', function(req, res) {
    if(req.query.status == "true"){
        execute("echo 25 > /sys/class/gpio/export");
        execute("echo out > /sys/class/gpio/gpio25/direction");
    } else {
        execute("echo 0 > /sys/class/gpio/gpio25/value");
        execute("echo 25 > /sys/class/gpio/unexport");
    }
    lightTwoStatus = req.query.status;
    res.end();
});

//Return current state
router.get('/status', function(req, res) {
   res.send({light1: lightOneStatus, light2: lightTwoStatus});
});

module.exports = router;
