var Game = (function() {
    "use strict";

    var gameInstance;

    var Game = (function() {

        var CELL_SIZE,
            FIELD_WIDTH,
            FIELD_HEIGHT,
            numApples,
            intervalID,
            snake,
            apples,
            canvasRenderer,
            score = document.getElementById('score');


        // constructor
        function Game(cellSize) {
            CELL_SIZE = cellSize || 20; // pixels
            FIELD_WIDTH = 32 * CELL_SIZE;
            FIELD_HEIGHT = 20 * CELL_SIZE;
            numApples = 3;
        }


})();