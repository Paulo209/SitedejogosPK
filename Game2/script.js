var canvas = document.getElementById("minhaCanvas");
var ctx = canvas.getContext("2d");

var FPS = 60;

var teclas = {
    up: 38,
    down: 40,
    w: 87,
    s: 83,
    space: 32
};

var bola = {
    x: canvas.width / 2 - 15,
    y: canvas.height / 2 - 15,
    altura: 30,
    largura: 30,
    dirx: -1,
    diry: 1,
    modVelocidade: 0,
    velocidade: 50
};

var esquerda = {
    x: 10,
    y: canvas.height / 2 - 60,
    altura: 120,
    largura: 30,
    score: 0,
    speed: 15
};
var direita = {
    x: 560,
    y: canvas.height / 2 - 60,
    altura: 120,
    largura: 30,
    score: 0,
    speed: 15
};

document.addEventListener("keydown", movimentos);

function movimentos() {};

function run() {
    desenha();
    update();

    setTimeout(run(), 1000 / FPS);
};

function update() {};

function desenha() {
    ctx.fillStyle = "white";
    ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura);
    ctx.fillRect(direita.x, direita.y, direita.largura, direita.altura);
    ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);
    ctx.fillStyle = "black";
    ctx.fillRect(esquerda.x + 1, esquerda.y + 1, esquerda.largura - 2, esquerda.altura - 2);
    ctx.fillRect(direita.x + 1, direita.y + 1, direita.largura - 2, direita.altura - 2);
    ctx.fillRect(bola.x + 1, bola.y + 1, bola.largura - 2, bola.altura - 2);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Jogador 1: " + esquerda.score, 50, 20);
    ctx.fillText("Jogador 2: " + direita.score, canvas.width - 150, 20);
};

run();