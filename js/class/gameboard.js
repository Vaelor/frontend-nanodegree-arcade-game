/**
 * @class Gameboard
 * @classdesc The Base class for every entity in the game
 * @param {int} rows
 * @param {int} columns
 */
var Gameboard = function(rows, columns) {
	this.rows = rows;
	this.columns = columns;
	this.matrix = [];
	this.validMoves = [];
	this.startPosition = {x: 0, y: 0};
	this.endPosition = {x: 0, y: 0};
};

Gameboard.TILE_WIDTH = 101;
Gameboard.TILE_HEIGHT = 94;

Gameboard.prototype._generateEmptyBoard = function() {
	for(var row=0; row < this.rows; row++) {
		this.matrix[row] = [];
		for (var col=0; col < this.columns; col++) {
			this.matrix[row][col] = 0;
		}
	}
};

Gameboard.prototype._generateStart = function() {
	this.startPosition.x = _.floor(Math.random() * (this.rows - 0));
	this.startPosition.y = _.floor(Math.random() * (this.columns - 0));

	this.matrix[this.startPosition.x][this.startPosition.y] = TILES.criticalPath.value;
};

Gameboard.prototype._isCriticalPathSuitable = function(x, y) {
	var neighbours = 0;
	if (x - 1 >= 0 && this._hasNeighbour(x -1, y)){
		neighbours++;
	}
	if (y - 1 >= 0 && this._hasNeighbour(x, y -1)){
		neighbours++;
	}
	if (x + 1 < this.matrix.length && this._hasNeighbour(x + 1, y)){
		neighbours++;
	}
	if (y + 1 < this.matrix[x].length && this._hasNeighbour(x, y + 1)){
		neighbours++;
	}
	console.log('Neighbours: ' + neighbours);
	if (neighbours < 2 && this.matrix[x][y] !== 100) {
		console.log('Not suitable location: ' + x + ' ' + y);
		return true;
	}
	return false;
};

Gameboard.prototype._hasNeighbour = function(x, y) {
	return this.matrix[x][y] === 100;
};

Gameboard.prototype._checkValidMoves = function(row, col) {
	this.validMoves = [];
	if (row - 1 >= 0 && this._isCriticalPathSuitable(row - 1, col)) {
		this.validMoves.push({x: row - 1, y: col})
	}
	if (col - 1 >= 0 && this._isCriticalPathSuitable(row, col - 1)) {
		this.validMoves.push({x: row, y: col - 1})
	}
	if (row + 1 < this.rows && this._isCriticalPathSuitable(row + 1, col)) {
		this.validMoves.push({x: row + 1, y: col})
	}
	if (col + 1 < this.columns && this._isCriticalPathSuitable(row, col + 1)) {
		this.validMoves.push({x: row, y: col + 1})
	}
	if (this.validMoves.length == 0) {console.log('Error. No valid Moves left.');}
	return this.validMoves;
};

Gameboard.prototype._pickPath = function(row, col) {
	var choice = _.floor(Math.random() * (this.validMoves.length));
	row = this.validMoves[choice].x;
	col = this.validMoves[choice].y;
	this.matrix[row][col] = TILES.criticalPath.value;
	return [row, col];
};

Gameboard.prototype._generatePathToEnd = function() {
	var moves = _.floor((this.rows * this.columns)/2);
	var row = this.startPosition.x;
	var col = this.startPosition.y;
	var newPosition = [];
	console.log('Startposition: ' + row + ' ' + col);

	while (moves != 0) {
		console.log('**************************');
		console.log('Move: ' + moves);
		console.log('Startposition: ' + row + ' ' + col);

		this._checkValidMoves(row, col);
		if (this.validMoves.length === 0) {
			break;
		}
		newPosition = this._pickPath(row, col);
		row = newPosition[0];
		col = newPosition[1];
		moves -= 1;

		console.log('New path found: ' + row + ' ' + col);
		console.log('**************************');
	}

	this.endPosition.x = row;
	this.endPosition.y = col;
	console.log(this.startPosition);
	console.log(this.endPosition);
	return moves;
};

Gameboard.prototype.drawGameboard = function(ctx) {
	var tileImage = 'stone';
	for (var row=0; row < this.rows; row++) {
		for (var col=0; col < this.columns; col++) {
			if (this.matrix[row][col] === TILES.criticalPath.value) {
				tileImage = 'stone';
			} else {
				tileImage = 'water';
			}
			ctx.drawImage(Resources.get(TILES[tileImage].img), col * TILE_WIDTH, row * TILE_HEIGHT);
		}
	}
};

Gameboard.prototype.setup = function() {
	var movesLeft = 1;
	while (movesLeft != 0) {
		this._generateEmptyBoard();
		this._generateStart();
		movesLeft = this._generatePathToEnd();
	}
};

// TODO: generateObstacles();
