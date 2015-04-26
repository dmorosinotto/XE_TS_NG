import srv = require("./server");
var PORT = 4000;

srv.initServer(PORT, "Hello World from TS!");
console.log("Listening on http://localhost:" + PORT);