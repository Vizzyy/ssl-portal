const sslPath = '/home/pi/login/ssl/',
	fs = require('fs');

const ca = [
	//fs.readFileSync(sslPath + 'vizzyy_ddns_net.ca-bundle'),
	fs.readFileSync(sslPath+'vizzyy-ddns-net-barney.crt'),
    fs.readFileSync(sslPath+'dinkleToLights.crt'),
    fs.readFileSync(sslPath+'lights.crt')
];
//
// const dinkleToPortal = {
//     key: fs.readFileSync('/home/barney/client509/clientprivate.key'),
//     cert: fs.readFileSync('/home/barney/client509/dinkleToPortalCert.crt'),
//     ca: fs.readFileSync(sslPath+'portal.crt')
// }
//
const admins = ["vizzyy-ddns-net-barney", "dinkleToLights"];
const owner = ["vizzyy-ddns-net-barney"];

module.exports = {
	sslOptions : {
		ca : ca,
		key : fs.readFileSync(sslPath + 'lights.key'),
		cert : fs.readFileSync(sslPath + 'lights.crt'),
        requestCert: true,
        rejectUnauthorized: true
	},
	port: 443,  //3000
    admins: admins,
	owner: owner
    // dinkleToPortal: dinkleToPortal
};