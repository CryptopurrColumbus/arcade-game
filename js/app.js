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
        // the enemy is beyond the screen, get him back
        // in the game by resetting the properties
        this.resetToRandomProperties();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset to random set of properties
Enemy.prototype.resetToRandomProperties = function() {
    var properties = getRandomEnemyProperties();
    this.x = properties.x;
    this.y = properties.y;
    this.speed = properties.speed;
}

// Game level actions defined here. Ex: The handling of winning of
// the game doesn't really belong to the player or the enemy
var game = {
    playerWon: function() {
        // Hide all enemies
        allEnemies.forEach(function(enemy) {
            enemy.speed = 0;
            enemy.x = -100;
        });
        // add some html to tell the user that he has won
        // The winning para to be displayed
        var para = document.createElement('p');
        para.className = 'winning-para';
        var textNode = document.createTextNode("You won!");
        para.appendChild(textNode);

        // Reset game option
        var resetButton = document.createElement("button");
        resetButton.innerHTML = "Reset Game";
        document.body.append(para);
        document.body.append(resetButton);

        // Event listener for reset game button
        resetButton.addEventListener(
            'click', this.handleResetGameButton.bind(null, para, resetButton))
    },
    handleResetGameButton: function(para, resetButton) {
        // "this" refers to HTMLButtonElement and not the player object
        // bring the player to it's original position
        player.x = 205;
        player.y = 400;

        // make the enemies move from random positions
        allEnemies.forEach(function(enemy) {
            enemy.resetToRandomProperties();
        });
        // remove the html elements from dom
        document.body.removeChild(para);
        document.body.removeChild(resetButton);
    },
}

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
            // The player has reached the top
            // and has won the game thus.
            if (this.y <= -10) {
                this.y = -10;
                game.playerWon();
            }
        } else if (direction == 'down') {
            this.y += 50;
            // The player has reached the bottom
            if (this.y >= 450) {
                this.y = 450;
            }
        } else if (direction == 'right') {
            this.x += 50;
            // The player has reached the rightmost corner
            if (this.x >= 400) {
                this.x = 400;
            }
        } else if (direction == 'left') {
            this.x -= 50;
            // The player has reached the leftmost corner
            if (this.x <= 0) {
                this.x = 0;
            }
        }
    },
    update: function(dt) {
        // noop
    },
}


// Highly inspired by: https://stackoverflow.com/a/1527820/3181759
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Useful for randomizing the enemies properties
// This way, they are unpredictable
function getRandomEnemyProperties() {
    var enemy_x = getRandomNumber(-150, -120);
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
for (var i = 0; i <= 10; i++) {
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
