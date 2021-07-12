function sprite(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function(xCanvas, yCamvas) {
        ctx.drawImage(img, this.x, this.y, this.width, this.height, this.xCanvas, this.yCamvas, this.width, this.height);
    }
}

var bg = new sprite(0, 0, 800, 600);
var playerSprite = new sprite(975, 1, 50, 50);