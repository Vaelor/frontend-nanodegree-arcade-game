/**
 * @class Enemy
 * @classdesc The Enemyclass, inherits Entity
 * @param {position} position - Location
 * @param {speed} speed - Movement speed
 * @param {string} sprite - The Image to visualize the Enemy
 */
var Enemy = function(position, speed, sprite) {
	Entity.call(this, position, speed, sprite);
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.OFFSET_Y = -18;

Enemy.prototype.outOfGame = function() {
	return this.position.x > CANVAS_WIDTH + TILE_WIDTH;
};


EnemyFactory = {
	enemyIdCounter: 0,
	allEnemies: [],

	createEnemy: function(position, speed, sprite) {
		var newEnemy = new Enemy(position, speed, sprite);
		// Dont let the number get too high - unsure if that could be a problem at some point
		if (this.enemyIdCounter > SIMULTANEOUS_ENEMIES*30) {
			this.enemyIdCounter = 0;
		}
		this.allEnemies.push({enemyId: this.enemyIdCounter, enemy: newEnemy});
		this.enemyIdCounter++;
		return newEnemy;
	},

	createRandomEnemy: function() {
		var position = {x: -50, y: Math.floor(Math.random() * ((ENEMY_ROWS * TILE_HEIGHT) - TILE_HEIGHT) + TILE_HEIGHT)};
		var speed = {x: Math.floor(Math.random() * (500 - 100) + 100),
			y: 0};
		var sprite = 'images/enemy-bug.png';
		this.createEnemy(position, speed, sprite);
	},

	getEnemyCount: function() {
		return this.allEnemies.length;
	},

	popEnemy: function(currentId) {
		var arrayIndex =  _.findIndex(this.allEnemies, function(obj) { return obj.enemyId == currentId} );
		this.allEnemies.splice(arrayIndex, 1);
	}
};
