var http = require('http');

function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello world! This is my first App in Node');
    response.end();
}

http.createServer(onRequest).listen(8000);