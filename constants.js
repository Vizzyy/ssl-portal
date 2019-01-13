const sslPath = '/home/pi/login/ssl/',
    fs = require('fs'),
    admins = ["vizzyy-ddns-net-barney", "dinkleToPortal"],
    owner = ["vizzyy-ddns-net-barney"],
    ca = [
        fs.readFileSync(sslPath + 'vizzyy-ddns-net-barney.crt'),
        fs.readFileSync(sslPath + 'vizzyy_ddns_net.ca-bundle'),
        fs.readFileSync(sslPath + 'dinkleToPortal.crt'),
        fs.readFileSync(sslPath + 'portal.crt')
    ],
    mainSSL = {
        ca: ca,
        key: fs.readFileSync(sslPath + 'portal.key'),
        cert: fs.readFileSync(sslPath + 'portal.crt'),
        requestCert: true,
        rejectUnauthorized: true
    },
    portalToDinkle = {
        uri: 'https://vizzyy.ddns.net/log/append?entry=', json: true, host: 'vizzyy.ddns.net',
        port: 443, path: '/', method: 'GET',
        key: mainSSL.key,
        cert: mainSSL.cert,
        ca: ca,
        rejectUnauthorized: true
    },
    isAdmin = function(req, res, next){
        let incoming = req.connection.getPeerCertificate().subject.CN;
        if(admins.includes(incoming)){
            next();
        } else {
            console.log(incoming+" has insufficient permissions to view "+req.originalUrl);
            res.status(500);
            res.send("You have insufficient permissions to view this page.");
        }
    },
    isOwner = function(req, res, next){
        let incoming = req.connection.getPeerCertificate().subject.CN;
        if(owner.includes(incoming)){
            next();
        } else {
            console.log(incoming+" has insufficient permissions to view "+req.originalUrl);
            res.status(500);
            res.send("You have insufficient permissions to view this page.");
        }
    };

module.exports = {
    sslOptions: mainSSL,
    portalToDinkle: portalToDinkle,
    port: 443,
    admins: admins,
    owner: owner,
    isAdmin: isAdmin,
    isOwner: isOwner
};
