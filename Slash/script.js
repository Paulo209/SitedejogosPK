var WIDTH = 600;
var HEIGHT = 400;
var canvas = '';
var ctx = '';
var fps = 20;

var sprite = {
    player: document.getElementById('player'),
    mob: document.getElementById('mob'),
    atk: document.getElementById('atk'),
    background: document.getElementById('background'),
}


/* define informações do inimigo */
var mob = {
    x: 175,
    y: -50,
    size: 50,
    velocity: 3,
    hp: 5,
    hpM: 5,
    timeAtk: false,
    dano: 1,
    level: 0,

    update: function() {
        /* if(this.level > 0) {
            this.size + 0.3 * this.level;
            this.velocity + 0.3 * this.level;
            this.hp + 0.3 * this.level;
            this.dano + 0.3 * this.level;
        } */


        if(this.y > player.y - this.size + 15) {
            this.y = player.y - this.size + 16
        }
        else(
            this.y = this.y + this.velocity
        )

        if(!this.timeAtk && this.y + this.size >= player.y) {
            this.timeAtk = true;

            setTimeout(() => {
                this.timeAtk = false
            }, 1000);

            if (player.hp > 0) {
                player.hp -= 1 + Math.floor(this.dano * Math.random());
            } 
        }
    },

    draw: function() {
        ctx.drawImage(sprite.mob, this.x, this.y, this.size, this.size)
    },

    levelUp: function() {
        this.hpM = this.hpM + this.hpM * this.level * 0.2;
        this.dano = this.dano + this.level - 2;
        mob.hp = Math.floor(mob.hpM);
    },
}


/* define informaçoes do player */
var player = {
    x: 175,
    y: 500,
    spt: sprite.player,
    size: 50,
    hp: 10,
    hpM: 10,
    potion: 1,

    level: 0,
    xp: 0,
    xpMeta: 250,

    update: function() {
        if(this.hp > this.hpM) {
            this.hp = this.hpM
        }
    },

    draw: function() {
        ctx.drawImage(this.spt, this.x, this.y, this.size, this.size);
    },

    levelUp: function() {
        if(this.xp >= this.xpMeta) {
            this.xpMeta = this.xpMeta * 2;
            this.level++;
            this.potion += this.level;
            this.hpM = this.hpM += Math.floor(this.hpM * 0.5);
        }
    }


}

var atk = {
    x: 155,
    y: 640,
    width: 80,
    height: 40,
    timeAtk: false,
    dano: 3,

    update: function() {
        if(!this.timeAtk && mob.y + mob.size > this.y) {
            this.timeAtk = true;

            setTimeout(() => {
                this.timeAtk = false
            }, 1000);

            if (mob.hp > 0) {
                mob.hp -= 1 + Math.floor(this.dano * Math.random()) + player.level;
            } 
        }
    },

    draw: function() {
        ctx.drawImage(sprite.atk, this.x, this.y, this.width, this.height);
    },
}
function atkOn() {
    atk.y = 470

    setTimeout(atkOff, 1000 / 3)
}
function atkOff() {
    atk.y = 640
}
function potionOn() {
    if(player.potion > 0) {
        player.hp += 3;
        player.potion--;
    }
}



/* acontece uma vez ao iniciar a pag */
function main() {
    canvas = document.getElementById('canvas01');
    ctx = canvas.getContext('2d');

    run()
}

/* detecta e gera eventos */
function update() {
    if(mob.hp <= 0) {
            mob.y = 0 - mob.size;
            mob.level++;
            mob.levelUp();
            player.potion += Math.floor(3 * Math.random());
            player.xp += 1 + Math.floor(mob.level * Math.random() * 100);
    }
    if(player.hp <= 0) {
        location.reload();
    }


    if(player.potion < 1) {
        document.getElementById("ptnImg").style.filter = "grayscale(100%)";
    }
    else {
        document.getElementById("ptnImg").style.filter = "none";
    }




    mob.update();
    player.update();
    player.levelUp();
}

/* desenha na canvas */
function draw() {
    ctx.drawImage(sprite.background, 0, 0, HEIGHT, WIDTH)

    mob.draw()
    player.draw()
    atk.draw()

    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Mob", 10, 220);
    ctx.fillText("Level:" + mob.level, 5, 240);
    ctx.fillText("HP:" + mob.hp, 5, 260);

    ctx.fillText("Player", 10, 300);
    ctx.fillText("Level:" + player.level, 5, 320);
    ctx.fillText(player.xp + "/" + player.xpMeta, 5, 340);
    ctx.fillText("HP:" + player.hp, 5, 360);
    ctx.fillText("Potion:" + player.potion, 5, 380);
}

/* loop do jogo */
function run() {
    update()
    draw()



    setTimeout(run, 1000 / fps)
}




main()

