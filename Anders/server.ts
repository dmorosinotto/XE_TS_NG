/// <reference path="typings/node/node.d.ts" />
import http = require("http");

export function initServer(port: number, message: string) {
    http.createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>" + message + "</h1>");
        res.end();
    }).listen(port);
}
