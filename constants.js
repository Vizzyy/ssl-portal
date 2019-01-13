const sslPath = '/home/pi/login/ssl/',
    fs = require('fs'),
    admins = ["vizzyy-ddns-net-barney", "dinkleToPortal"],
    owner = ["vizzyy-ddns-net-barney"],
    ca = [
        fs.readFileSync(sslPath + 'vizzyy-ddns-net-barney.crt'),
        fs.readFileSync(sslPath + 'vizzyy_ddns_net.crt'),
        fs.readFileSync(sslPath + 'dinkleToPortal.crt'),
        fs.readFileSync(sslPath + 'portal.crt')
    ];

module.exports = {
    sslOptions: {
        ca: ca,
        key: fs.readFileSync(sslPath + 'portal.key'),
        cert: fs.readFileSync(sslPath + 'portal.crt'),
        requestCert: true,
        rejectUnauthorized: true
    },
    port: 443,
    admins: admins,
    owner: owner
};
