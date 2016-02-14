// Every Entity on the field will have position
var Entity = function () {
	this.loc_x = loc_x;
	this.loc_y = loc_y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Entity.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
};

// Draw the enemy on the screen, required method for game
Entity.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function () {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
	this.sprite = 'images/char-boy.png';
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function keyUpEvent(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

$(function appInit() {
	Engine.init();
});
