// ispirato al video di Anders Hejlsberg - Evolving JS with TypeScript: https://www.youtube.com/watch?v=Ut694dsIa8w
// qualsiasi codice Javascript è nativamente codice TypeScript
function sortByName(a) {
    "use strict";
    var result = a.slice(0);
    result.sort(function (x, y) {
        return x.name.localCompare(y.name);
    });
    return result;
}
$().ready(function () {
    var arr = []; // [{ name: "Pippo" }, { name: "Pluto" }, { name: "Paperino" }]
    var test = sortByName(arr);
    document.getElementById("content").innerText = JSON.stringify(test);
});
//# sourceMappingURL=app.js.map