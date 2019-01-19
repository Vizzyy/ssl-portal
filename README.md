# ssl-portal
2-way SSL node micro-service


To run: `sudo node www`

`./keygen <hostname of this server>` to generate your own certs to put into `ssl/` The parameter should be the hostname of the machine that will be running this webserver. The CN:OU of the certificate will be this value: `<hostname>:<hostname>`
