/// <reference path="typings/jquery/jquery.d.ts" />
//Ispirato al video di Anders Hejlsberg - Evolving JS with TypeScript: https://www.youtube.com/watch?v=Ut694dsIa8w
//Qualsiasi codice Javascript è nativamente codice TypeScript
var Point = (function () {
    function Point(x, y) {
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    return Point;
})();
var p = new Point(10);
p.x = 30;
p.y = 40;
var test = p;
window.onload = function () {
    var el = document.getElementById('content');
    var el = document.getElementById('content');
    el.innerText = JSON.stringify(test, null, 4);
};
//# sourceMappingURL=app.js.map