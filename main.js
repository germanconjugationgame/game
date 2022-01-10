var c = document.createElement("canvas");
var sock = 7;
var scale = 1.5;
c.width = scale * window.innerWidth;
c.height = scale * window.innerHeight;

var gameover = false;

document.body.appendChild(c);

var score = 0;

onmousedown = (e) => {
    if(!gameover){
        var mx = e.clientX * scale / c.width;
        var my = e.clientY * scale / c.height;

        if(my > 0.4){
            if(my > 0.65){
                if(mx < 0.5){
                    checkAns(2);
                } else {
                    checkAns(3);
                }
            } else {
                if(mx < 0.5){
                    checkAns(0);
                } else {
                    checkAns(1);
                }
            }
        }
    } else {
        window.location = window.location.href;
    }
}

function checkAns(n){
    console.log(trivia[pIndex].a[n]);
    if(trivia[pIndex].a[n] == trivia[pIndex].c){
        score++;
    } else {
        clearInterval(timeInt);

        gameover = true;

        ctx.clearRect(0, 0, c.width, c.height);

        ctx.fillText(trivia[pIndex].q, c.width / 2, c.height / 4);
        ctx.fillText(`Your answer: ${trivia[pIndex].a[n]}`, c.width / 2, c.height / 2);
        ctx.fillText(`Correct answer: ${trivia[pIndex].c}`, c.width / 2, c.height * 2.5 / 4);
        return;
    }
    pIndex++;
    if(pIndex < trivia.length){
        doQs(trivia[pIndex]);
    } else {
        clearInterval(timeInt);

        gameover = true;

        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillText("You Win!", c.width / 2, c.height / 2);
    }
}

var ctx = c.getContext("2d");

let trivia = [
    {q: "Ich ___ Deutsch.", a: ["spreche", "sprechen", "spricht", "spracht"], c: "spreche"},
    {q: "Wir ___ Leute.", a: ["sind", "bist", "bin", "seid"], c: "sind"},
    {q: "Du ___ Karl.", a: ["heisst", "heissen", "heisse", "heisste"], c: "heisst"},
    {q: "Er ___ meine Katze.", a: ["nimmt", "nehmen", "nehme", "nehmt"], c: "nimmt"},
    {q: "Ihr ___ Wasser.", a: ["trinkt", "trinke", "trunkt", "trinken"], c: "trinkt"},
    {q: "Ich ___ Mathe.", a: ["lerne", "lernen", "lernt", "lernst"], c: "lerne"},
    {q: "Du ___.", a: ["arbeitest", "arbeist", "arbeiten", "arbeitete"], c: "arbeitest"},
    {q: "Mein Hund ___ Essen.", a: ["isst", "esst", "essen", "esse"], c: "isst"},
    {q: "Der Hund und die Katze ___ Wasser.", a: ["trinken", "trinke", "trinkt", "trinkte"], c: "trinken"},
    {q: "Ihr ___ mit der Maus.", a: ["lauft", "laufen", "laufe", "laufst"], c: "lauft"},
    {q: "Ich ___ mit meiner Klasse.", a: ["lese", "liese", "liest", "lesen"], c: "lese"},
    {q: "Er ___ der Tisch.", a: ["sieht", "seht", "sehen", "siehst"], c: "sieht"},
    {q: "Du ___ viele Stifte.", a: ["haben", "hast", "habst", "habest"], c: "hast"},
    {q: "Sie (formal) ___ das interessant", a: ["findet", "findest", "finden", "finde"], c: "finden"},
    {q: "Ihr Bruder ___ Deutsch.", a: ["sprecht", "spricht", "sprechen", "spreche"], c: "spricht"},
    {q: "Mein Bruder und ich ___ Fussbol.", a: ["spiele", "spielen", "spielt", "spielst"], c: "spielen"},
    {q: "Ich ___.", a: ["schlafe", "schlife", "schlafen", "schlaft"], c: "schlafe"},
    {q: "Du ___ deine Hausaufgaben.", a: ["machst", "mache", "machen", "machest"], c: "machst"},
    {q: "___ du ein Apfel?", a: ["Hast", "Habst", "Haben", "Habe"], c: "Hast"},
    {q: "Wir ___ nicht.", a: ["wissen", "weissen", "weiss", "wisst"], c: "wissen"},
    
]

function shuffle(arr){
    let temp = [];
    while(arr.length > 0){
        let rand = ~~(Math.random() * arr.length);
        temp.push(arr[rand]);
        arr.splice(rand, 1);
    }

    return temp;
}

var pIndex = 0;

function startGame(){
    trivia = shuffle(trivia);
    pIndex = 0;
    doQs(trivia[pIndex]);
}

function doQs(q){
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "black";
    ctx.font = `${c.height / 15}px sans-serif`;
    ctx.textAlign = "center";

    q.a = shuffle(q.a);

    ctx.fillText(q.q, c.width / 2, c.height / 4);
    ctx.fillText(q.a[0], c.width * 1.25 / 4, c.height * 2 / 4);
    ctx.fillText(q.a[1], c.width * 2.75 / 4, c.height * 2 / 4);
    
    ctx.fillText(q.a[2], c.width * 1.25 / 4, c.height * 3 / 4);
    ctx.fillText(q.a[3], c.width * 2.75 / 4, c.height * 3 / 4);

    ctx.font = `${c.height / 20}px sans-serif`;
    ctx.fillText(`${score}/${pIndex}`, c.width / 8, c.height / 8);


}

var lastTime = Date.now();
var timeInt = setInterval(doTime, 1000/60);
var time = 45;

function doTime(){
    let dt = (Date.now() - lastTime) / 1000;

    time -= dt;

    var margin = [c.width / 25, c.height / 25];

    ctx.clearRect(c.width * 7/8 - margin[0], c.height * 1/8 - margin[1], margin[0] * 2, margin[1] * 2);
    ctx.fillText(Math.round(time), c.width * 7/8, c.height * 1/8);

    lastTime = Date.now();

    if(time < 0){
        clearInterval(timeInt);

        gameover = true;

        ctx.clearRect(0, 0, c.width, c.height);

        ctx.fillText(`You ran out of time!`, c.width / 2, c.height / 2);
        return;
    }
}

startGame();
