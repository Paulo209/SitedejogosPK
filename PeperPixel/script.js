//variaves
var canvas = '';
var ctx = "";
var WIDTH = "";
var HEIGHT = "";
var frame = "0";
var amountOfJumps = 2;
var speed_O = 6;
var currentState = "";
var record = "";
//var img = "";

state = {
    play: 0,
    playing: 1,
    gameover: 2
}


var ground = {
    y: 550,
    height: 50,
    cor: "#6EE72D",

    draw: function() {
        ctx.fillStyle = this.cor;
        ctx.fillRect(0, this.y, WIDTH, this.height);
    }

}

var block = {
    x: 100,
    y: 0,
    width: 50,
    height: 50,
    cor: "#8E44AD",
    gravity: 1.6,
    speed: 0,
    strengthOfJump: 23.6,
    AOJ: 0,
    score: 0,
    hp: 3,
    colider: false,
    xp: 0,

    update: function() {
        this.speed += this.gravity;
        this.y += this.speed;

        if(this.y > ground.y - this.height && currentState != state.gameover) {
            this.y = ground.y - this.height;
            this.AOJ = 0;
            speed = 0;
        }
    },

    jump: function() {
        if(this.AOJ < amountOfJumps) {
            this.speed = -this.strengthOfJump;
            this.AOJ++;
        }
    },

    reset: function() {
        this.speed = 0;
        this.y = 0;

        if(this.score > record) {
            localStorage.setItem("record", this.score);
            record = this.score;
        }

        this.hp = 3;
        this.xp = 0;
        this.score = 0;
        this.speed_O = 0;

    },

    draw: function() {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = "black";
        ctx.fillRect(this.x + 10, this.y + 11, 7, 11)
        ctx.fillRect(this.x + 35, this.y + 11, 7, 11)
        ctx.fillRect(this.x + 17,this.y + 36, 18, 6)
        
    }
}

var obstacles = {
    _obtcs: [],
    timeInsert: 0,

    insert: function() {
        this._obtcs.push({
            x: WIDTH,
            //width: 30 + Math.floor(21 * Math.random()),
            width: 50,
            height: 30 + Math.floor(90 * Math.random()),
        });

        this.timeInsert = 40 + Math.floor(21 * Math.random());
    },

    update: function() {
        if(this.timeInsert === 0) {
            this.insert();
        }
        else{
            this.timeInsert--;
        }
        for (var i = 0, size = this._obtcs.length; i < size; i++) {
            var obtcs = this._obtcs[i];

            obtcs.x -= speed_O;

            if(!block.colider && block.x < obtcs.x + obtcs.width && block.x + block.width >=
                 obtcs.x && block.y + block.height >= ground.y - obtcs.height){
                block.colider = true;

                setTimeout(function(){
                    block.colider = false;
                }, 500);

                if(block.hp > 1) {
                    block.hp--;
                }
                else{
                    currentState = state.gameover;
                }

            }
            else if(obtcs.x <= WIDTH - WIDTH + 25) {
                this._obtcs.splice(i, 1);
                size--;
                i--;  
                block.score++;
                block.xp++;
                speed_O + speed_O / 100 * 03;//6m
            }
            
            if(block.xp > 20) {
                block.xp--;
            }
            if(block.xp == 20 && block.hp < 3) {
                block.xp = 0;
                block.hp++;
            }
            //else if(obtcs.x <= -obtcs.width) {         
            //}
        }
    },

    clear: function() {
        this._obtcs = [];
    },

    draw: function() {
        for (var i = 0, size = this._obtcs.length; i < size; i++) {
            var obtcs = this._obtcs[i];
            ctx.fillStyle = "red";
            ctx.fillRect(obtcs.x, ground.y - obtcs.height, obtcs.width, obtcs.height);
        }
    }
};

//funções
function click(event) {
    if(currentState === state.playing) {
        block.jump();
    }
    else if(currentState === state.play) {
        currentState = state.playing;
    }
    else if(currentState === state.gameover && block.y >= 3 * HEIGHT) {
        currentState = state.play;
        obstacles.clear();
        block.reset();
    }
}

function main() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    if(WIDTH >= 500) {
        WIDTH = 800;
        HEIGHT = 600;
    }

    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.border = "1px solid black";

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    document.addEventListener("mousedown", click);

    currentState = state.play;
    record = localStorage.getItem("record");

    if(record === null) {
        record = 0;
    }

    //img = new Image();
    //img.src = "imgs/sheet.png";

    run();
}

function run() {
    update();
    draw();

    window.requestAnimationFrame(run);
}

function update() {
    frame++;

    block.update();
    if(currentState === state.playing) {
        obstacles.update();
    }
}

function draw() {
    ctx.fillStyle = "#0080FF";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
    ctx.fillStyle = "#FFEC01";
    ctx.fillRect(650, 1, 150, 150);

    ctx.fillStyle = "#FFF";
    ctx.font = "50px Arial";

    if (currentState === state.play) {
        //ctx.fillStyle = "#463F52";
        //ctx.fillRect(WIDTH / 2 - 75, HEIGHT / 2 - 50, 150, 75);

        ctx.save();
        ctx.translate(WIDTH / 2, HEIGHT / 2);
        ctx.fillStyle = "#fff";

        ctx.fillText("Jogar", -63, 0);
        ctx.fillText("_____", -70, 0);

        ctx.restore();

    }
    else if(currentState === state.gameover) {
        //ctx.fillStyle = "#463F52";
        //ctx.fillRect(WIDTH / 2 -260, HEIGHT / 2 -210, 520, 420);

        ctx.save();
        ctx.translate(WIDTH / 2, HEIGHT / 2);
        ctx.fillStyle = "#fff";


        ctx.fillText("Pontuação", -117, -150);
        ctx.fillText("_________", -125, -150);

        if(block.score > record) {
            ctx.fillText("Novo Record!", -150, -53);
        }
        else {
            ctx.fillText("Tente Denovo!", -163, -53);
        }

        ctx.fillText("__________________", -250, -53);
        ctx.fillText("Pontos: " + block.score, -250, 20);
        ctx.fillText("__________________", -250, 20);
        ctx.fillText("Record: " + record, -250, 93);
        ctx.fillText("__________________", -250, 93);
        ctx.fillText("Voltar", -63, 175);
        ctx.fillText("_____", -70, 175);

        ctx.restore();

    }
    else if(currentState === state.playing){
        ctx.fillText(block.score, 0 + 10, 38 + 10);
        //ctx.fillText(block.hp, HEIGHT / 4 * 3, 38 + 10);

        ctx.fillStyle = "black";
        ctx.fillRect(HEIGHT / 4 * 3 - 2, 8, 154, 54)
        ctx.fillStyle = "green";
        ctx.fillRect(HEIGHT / 4 * 3, 10, block.hp * 50, 50);

        ctx.fillStyle = "black";
        ctx.fillRect(8, HEIGHT / 3 - 2, 14, 204)
        ctx.fillStyle = "blue";
        ctx.fillRect(10, HEIGHT / 3, 10, block.xp * 10);

        obstacles.draw();

    }
    
    ground.draw();
    block.draw();
}

main();