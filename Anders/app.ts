/// <reference path="typings/jquery/jquery.d.ts" />
//Ispirato al video di Anders Hejlsberg - Evolving JS with TypeScript: https://www.youtube.com/watch?v=Ut694dsIa8w

//Qualsiasi codice Javascript è nativamente codice TypeScript

class Point {
    constructor(x: number, y: number=0) {
        this.x = x;
        this.y = y;
    }
    x: number;
    y: number;
}



var p = new Point(10);
p.x = 30;
p.y = 40;

var test = p;
window.onload = () => {
    var el = document.getElementById('content');
    
    var el = document.getElementById('content');
    el.innerText = JSON.stringify(test, null, 4);
};