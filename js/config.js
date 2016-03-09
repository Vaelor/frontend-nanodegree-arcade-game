/* Gameboard/Canvas configuration */
var GAMEBOARD_ROW_AMOUNT = 8;
var GAMEBOARD_COL_AMOUNT = 8;
var ENEMY_ROWS = 8;
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;
var GAMEBOARD_WIDTH = GAMEBOARD_ROW_AMOUNT * TILE_WIDTH;
var GAMEBOARD_HEIGHT = GAMEBOARD_COL_AMOUNT * TILE_HEIGHT;
var CANVAS_WIDTH = GAMEBOARD_WIDTH;
var CANVAS_HEIGHT = GAMEBOARD_HEIGHT + 88;

/* Enemy configuration */
var SIMULTANEOUS_ENEMIES = 10;

/* Tile Configuration */
var TILES = {
	empty: {img: 'images/dummy.png', value: 0},
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
	criticalPath: {img: 'images/dummy.png', value: 100}
};

var ENEMIES = {
	redBug: {img: 'images/enemy-bug.png'}
};

var PLAYER_IMAGES = {
	boy: {img: 'images/char-boy.png'}
};
