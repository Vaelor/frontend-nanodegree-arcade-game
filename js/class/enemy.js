var allEnemies = [];

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

Enemy.LIFETIME = 100;
Enemy.OFFSET_Y = -18;

EnemyFactory = {
	createEnemy: function(position, speed, sprite) {
		var newEnemy = new Enemy(position, speed, sprite);
		this.allEnemies.push(newEnemy);
		return newEnemy;
	},

	createRandomEnemy: function() {
		var position = {x: -50, y: Math.floor(Math.random() * ((ENEMY_ROWS * TILE_HEIGHT) - TILE_HEIGHT) + TILE_HEIGHT)};
		var speed = {x: Math.floor(Math.random() * (500 - 100) + 100),
			y: 0};
		var sprite = 'images/enemy-bug.png';
		this.createEnemy(position, speed, sprite);
	},

	allEnemies: [],

	getEnemyCount: function() {
		return allEnemies.length;
	},

};
