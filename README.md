# ssl-portal
2-way SSL node micro-service

Replace all the values for the certificate paths. The CA is an array of all the public certificates that WE (the server) trust. MainSSL values are the ones used for tls/https.

To run: `sudo node www`

`./keygen <hostname of this server>` to generate your own certs to put into `ssl/` The parameter should be the hostname of the machine that will be running this webserver. The CN:OU of the certificate will be this value: `<hostname>:<hostname>`. Output are private/public keypair, and the two packaged into a .p12 file of the same name that can be imported into browsers.
