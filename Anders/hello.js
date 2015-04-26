var srv = require("./server");
var PORT = 4000;
srv.initServer(PORT, "Hello World");
console.log("Listening on http://localhost:" + PORT);
