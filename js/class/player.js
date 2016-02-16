/**
 * @class Player
 * @classdesc The Playerclass, inherits Entity
 * @param {position} position - Location
 * @param {speed} speed - Movement speed
 * @param {string} sprite - The Image to visualize the entity
 */
var Player = function(position, speed, sprite) {
	Entity.call(this, position, speed, sprite);
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.handleInput = function() {
	console.log('hello');
};
