const http = require("http");
const fs = require("fs");
const mime = require("mime-types");

const server = http.createServer((req, res) => {
    const url = req.url;
    console.log("url - " + url);

    if (url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("Hello World");
        res.end();
    } else if (url === "/json") {
        res.writeHead(200, { "Content-Type": "application/json" });
        let returning_json = {
            "ok": "ok"
        };
        let jsonString = JSON.stringify(returning_json);
        res.write(jsonString);
        res.end();
    } else if (url === "/html") {
        res.writeHead(200, { "Content-Type": "text/html" });
        let html = "<html lang=\"en\"><head><title>Hello World</title></head><body><h1>Hello World from text</h1></body></html>";
        res.write(html);
        res.end();
    } else if (url === "/html-file") {
        fs.readFile("index.html", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.write("Error" + err);
                res.end();
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(data);
                res.end();
            }
        });
    } else if (url.startsWith("/get-params")) {
        const queryParams = new URL(req.url, `http://${req.headers.host}`).searchParams;
        const entries = queryParams.entries();
        const json_content = {};
        
        for (const param of entries) {
            json_content[param[0]] = param[1];
        }

        fs.writeFile("params.json", JSON.stringify(json_content, null, 2), (err) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.write(JSON.stringify({ "error": err }));
                res.end();
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify({ 'ok': 'ok' }));
                res.end();
            }
        });
    } else {
        const file_path = "assets/" + url.slice(1);
        const file_extension = url.slice(url.lastIndexOf("."));

        fs.stat(file_path, (statErr, stats) => {
            if (statErr || !stats.isFile()) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.write("404 Not Found");
                res.end();
            } else {
                fs.readFile(file_path, (err, data) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "text/plain" });
                        res.write("500 Internal Server Error");
                        res.end();
                    } else {
                        let content_type = mime.lookup(file_extension);
                        if (!content_type) {
                            content_type = "text/plain";
                        }
                        res.writeHead(200, { "Content-Type": content_type });
                        res.write(data);
                        res.end();
                    }
                });
            }
        });
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
