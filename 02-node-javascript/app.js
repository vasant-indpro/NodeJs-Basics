var http = require('http');
var modele1 = require('./modele1'); 

function onRequest(request, response) {
    response.writehead(200, { 'Content-Type': 'plain/text' });
    response.write('Hello, This is my second application');
    response.write(modele1.writehead);
    modele1.myFunction;
    response.end();
}

http.createServer().listen(8000);