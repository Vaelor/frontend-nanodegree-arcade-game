/**
 * @typedef {Object} speed
 * @property {int} x - Horiztonal speed
 * @property {int} y - Vertical speed
 */
/**
 * @typedef {Object} position
 * @property {int} x - X location on the gameboard
 * @property {int} y - Y location on the gameboard
 */

/**
 * @class Entity
 * @classdesc The Base class for every entity in the game
 * @param {position} position - Location
 * @param {speed} speed - Movement speed
 * @param {string} sprite - The Image to visualize the entity
 */
var Entity = function (position, speed, sprite, life) {
	this.position = position;
	this.speed = speed;
	this.life = life;
	this.sprite = sprite;
};

Entity.prototype.update = function(dt) {
	this.position.x = this.position.x + this.speed.x * dt;
	this.position.y = this.position.y + this.speed.y * dt;
};

Entity.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
};

/**
 * Set the entities speed
 * @param {speed} speed
 */
Entity.prototype.setSpeed = function(speed) {
	this.speed.x = speed.x;
	this.speed.y = speed.y;
	return this.speed;
};

/**
 * Set the entities sprite
 * @param {string} sprite
 */
Entity.prototype.setSprite = function(sprite) {
	this.sprite = sprite;
	return this.sprite;
};

/**
 * Set the entities life
 * @param {int} life
 */
Entity.prototype.setLife = function(life) {
	this.life = life;
	return this.life;
};

/**
 * Decrease the entities life
 * @param {int=} amount - The amount to decrease
 */
Entity.prototype.decreaseLife = function(amount) {
	if (amount) {
		this.life -= amount;
	} else {
		this.life--;
	}
	return this.life;
};

/**
 * Increase the entities life
 * @param {int=} amount - The amount to increase
 */
Entity.prototype.increaseLife = function(amount) {
	if (amount) {
		this.life += amount;
	} else {
		this.life++;
	}
	return this.life;
};
