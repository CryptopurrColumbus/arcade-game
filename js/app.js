// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 550) {
        var properties = getRandomEnemyProperties();
        this.x = properties.x;
        this.y = properties.y;
        this.speed = properties.speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Our player object
var player = {
    sprite: 'images/char-boy.png',
    x: 205,
    y: 450,
    render: function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    handleInput: function(direction) {
        if (direction == 'up') {
            this.y -= 50;
            if (this.y <= -10) {
                this.y = -10;
            }
        } else if (direction == 'down') {
            this.y += 50;
            if (this.y >= 450) {
                this.y = 450;
            }
        } else if (direction == 'right') {
            this.x += 50;
            if (this.x >= 400) {
                this.x = 400;
            }
        } else if (direction == 'left') {
            this.x -= 50;
            if (this.x <= 0) {
                this.x = 0;
            }
        }
    },
    update: function(dt) {
        console.log(this.x, this.y)
    }
}


// Highly inspired by: https://stackoverflow.com/a/1527820/3181759
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function getRandomEnemyProperties() {
    var enemy_x = getRandomNumber(-150, -10);
    var enemy_y = getRandomNumber(50, 240);
    var enemy_speed = getRandomNumber(20, 200);
    return {
        'x': enemy_x,
        'y': enemy_y,
        'speed': enemy_speed,
    }
}

// Our array of enemy objects
allEnemies = [];
for (var i = 0; i <= 5; i++) {
    var properties = getRandomEnemyProperties();
    var enemy_x = properties.x;
    var enemy_y = properties.y;
    var enemy_speed = properties.speed;
    enemy = new Enemy(enemy_x, enemy_y, enemy_speed);
    allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
