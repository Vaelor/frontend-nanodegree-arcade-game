/**
 * @typedef difficulty

 */
var GAMEBOARD_ROW_AMOUNT = 8;
var GAMEBOARD_COL_AMOUNT = 8;
var ENEMY_ROWS = 5;
var TILE_WIDTH = 101;
var TILE_HEIGHT = 94;
var GAMEBOARD_WIDTH = GAMEBOARD_ROW_AMOUNT * TILE_WIDTH;
var GAMEBOARD_HEIGHT = GAMEBOARD_COL_AMOUNT * TILE_HEIGHT;
var CANVAS_WIDTH = GAMEBOARD_WIDTH;
var CANVAS_HEIGHT = GAMEBOARD_HEIGHT;

TILES = {
	empty: {img: '', value: 0},
	stone: {img: 'images/stone-block.png', value: 1},
	water: {img: 'images/water-block.png', value: 2},
	grass: {img: 'images/grass-block.png', value: 3},
	rock: {img: 'images/Rock.png', value: 4},
	gem_green: {img: 'images/Gem Green.png', value: 5},
	gem_blue: {img: 'images/Gem Blue.png', value: 6},
	gem_orange: {img: 'images/Gem Orange.png', value: 7},
	heart: {img: 'images/Heart.png', value: 8},
	star: {img: 'images/Star.png', value: 9},
	selector: {img: 'images/Selector.png', value: 10},
	criticalPath: {img: '', value: 100}
};

/**
 * @class Gameboard
 * @classdesc The Base class for every entity in the game
 * @param {difficulty} difficulty
 * @param {int} rows
 * @param {int} columns
 */
var Gameboard = function (rows, columns) {
	this.rows = rows;
	this.columns = columns;
	this.matrix = [];
	this.startPosition = {x: 0, y: 0};
	this.endPosition = {x: 0, y: 0};
};

Gameboard.TILE_WIDTH = 101;
Gameboard.TILE_HEIGHT = 94;

Gameboard.prototype.generateEmptyBoard = function() {
	for(var row=0; row < this.rows; row++) {
		this.matrix[row] = [];
		for (var col=0; col < this.columns; col++) {
			this.matrix[row][col] = 0;
		}
	}
	console.log(this.matrix);
};

Gameboard.prototype.generateStart = function() {
	this.startPosition.x = Math.floor(Math.random() * (this.rows - 0));
	this.startPosition.y = Math.floor(Math.random() * (this.columns - 0));

	this.matrix[this.startPosition.x][this.startPosition.y] = TILES.criticalPath.value;

	console.log(this.matrix);
};

Gameboard.prototype.generatePathToEnd = function() {
	var validMoves;
	var moves = Math.floor((this.rows * this.columns)/3);
	var row = this.startPosition.x;
	var col = this.startPosition.y;
	console.log(moves);
	var hasNeighbour = function (x, y) {
		console.log(this.matrix[x][y]);
		console.log(this.matrix[x][y] === 100);
		return this.matrix[x][y] === 100;
	}.bind(this);
	var isCriticalPathSuitable = function (x, y) {
		var neighbours = 0;
		if (x - 1 >= 0 && hasNeighbour(x -1, y)){
			neighbours++;
		}
		if (y - 1 >= 0 && hasNeighbour(x, y -1)){
			neighbours++;
		}
		if (x + 1 < this.matrix.length && hasNeighbour(x + 1, y)){
			neighbours++;
		}
		if (y + 1 < this.matrix[x].length && hasNeighbour(x, y + 1)){
			neighbours++;
		}
		console.log('neighbours: ' + neighbours);
		if (neighbours < 2 && this.matrix[x][y] !== 100) {
				return true;
		}
		return false;
	}.bind(this);
	var checkValidMoves = function () {
		validMoves = [];
		if (row - 1 >= 0 && isCriticalPathSuitable(row - 1, col)) {
			validMoves.push({x: row - 1, y: col})
		}
		if (col - 1 >= 0 && isCriticalPathSuitable(row, col - 1)) {
			validMoves.push({x: row, y: col - 1})
		}
		if (row + 1 < this.rows && isCriticalPathSuitable(row + 1, col)) {
			validMoves.push({x: row + 1, y: col})
		}
		if (col + 1 < this.columns && isCriticalPathSuitable(row, col + 1)) {
			validMoves.push({x: row, y: col + 1})
		}
		return validMoves;
	}.bind(this);

	var pickPath = function (validMoves) {
		var choice = Math.floor(Math.random() * (validMoves.length));
		row = validMoves[choice].x;
		col = validMoves[choice].y;
		this.matrix[row][col] = TILES.criticalPath.value;
	}.bind(this);
	while (moves != 0) {
		validMoves = checkValidMoves();
		pickPath(validMoves);
		console.log('new path' + row + ' ' + col);
		moves -= 1;
	}
	this.endPosition.x = row;
	this.endPosition.y = col;
	console.log(this.startPosition);
	console.log(this.endPosition);

	console.log(this.matrix.join('\n'));
	console.log(this.matrix);

};

var a = new Gameboard(5,5);
a.generateEmptyBoard();
a.generateStart();
a.generatePathToEnd();
// TODO: a.generateObstacles();
