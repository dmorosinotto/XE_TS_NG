// ispirato al video: https://egghead.io/lessons/javascript-catching-javascript-mistakes-with-typescript

// vanillaJS è codice TS valido, ma Typescript anche senza usare i tipi può già esser molto utile a...

var movie = { title: "Matrix", year: 1999, IMDb: 8.7, title: "" };
var ratings = movie.IMDB;
alert(movie.title + ' ' + ratings);





function Point(x, x) {
    this.x = x;
    this.y = y;
}
Point.prototype.dist = function () {
    return Math.sqrt(x * x + y * y);
}
p = new Point(10, 20);
output(p, p.dist());





function isPast(date) {
    var now = Date().getTime();
    return date.getTime() < now;
}
var Natale = new Date(2014, 12, 25);
output(Natale, isPast(Natale));





function ask(question) {
    var answer = confirm(question);
    var answerView = document.getElementByID("answer");
    answerView.innerText = answer;
}





function handleLoad() { console.log("Page loaded!"); }
document.onLoad = handleLoad();





function newCoinToss() {
    return Math.random > 0.5 ? "TESTA" : "CROCE";
}
var tiri = [1, 2, 3, 4, 5].map(newCoinToss);

var allHeads = tiri.every(function (tiro) {
    return tiro = "TESTA";
});
if (allHeads) alert(allHeads.length + " volte TESTA di fila!?!");





document.addEventListener("keydown", function (event) {
    console.log(event.clientX, event.clientY);
});
