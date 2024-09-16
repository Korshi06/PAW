const { createServer } = require('http'); 
const fs = require('fs'); 
const path = require('path'); 

const hostname = '127.0.0.1';
const port = 3000;

const requestListener = (req, res) => {
    switch(req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Strona glowna');
            break;
        case '/json':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                "name": "one",
                "version": "1.0.0",
                "description": "",
                "main": "x.js",
                "scripts": {
                    "test": "echo \"Error: no test specified\" && exit 1"
                },
                "author": "Michalina",
                "license": "ISC"
            }));
            break;

        case '/html':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML z Pliku</title>
</head>

<body>
    <h1>To jest statyczna strona HTML pobrana z pliku!</h1>
</body>

</html>`);
            break;

        case '/file':
            const filePath = path.join(__dirname, 'static', 'file.html');
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Błąd serwera');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
    }
};

const server = createServer(requestListener);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
