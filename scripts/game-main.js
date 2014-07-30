var Game = (function () {
    "use strict";

    var gameInstance;

    var Game = (function () {

        var CELL_SIZE,
            FIELD_WIDTH,
            FIELD_HEIGHT,
            numApples,
            intervalID,
            snake,
            apples,
            canvasRenderer,
            score = document.getElementById('score');

        function _gameLoop() {
            canvasRenderer.clearScreen();
            apples.forEach(function (apple) {
                apple.draw(canvasRenderer);
            });
            snake.draw(canvasRenderer);
            snake.move();
            if (_snakeIsAlive()) {
                _eatApples();
            } else {
                clearInterval(intervalID);
                alert('You die');
            }
        }

        function _snakeIsAlive() {
            // Check if head collides with the screen borders            
            if (snake._head.x < 0 || snake._head.x > FIELD_WIDTH - CELL_SIZE ||
                snake._head.y < 0 || snake._head.y > FIELD_HEIGHT - CELL_SIZE)
                return false;

            if (snake.headCollidesWithBody())
                return false;

            return true;
        }

        function _eatApples() {
            for (var i = 0; i < apples.length; i++) {
                // If snake is running through an apple...
                if (apples[i].body.x === snake._head.x && apples[i].body.y === snake._head.y) {
                    // Add cell to the snake tail
                    snake.eatApple();
                    // Remove the eaten apple and create a new one at random position
                    apples.splice(i, 1);
                    var randomCell = _getRandomCell();
                    apples.push(new GameObjects.Apple(randomCell));

                    score.innerHTML = parseInt(score.innerHTML) + 10;
                }
            }
        }

        function _getRandomCell() {
            var x = Math.round(Math.random() * (FIELD_WIDTH / CELL_SIZE - 1)) * CELL_SIZE;
            var y = Math.round(Math.random() * (FIELD_HEIGHT / CELL_SIZE - 1)) * CELL_SIZE;
            return {
                x: x,
                y: y
            };
        }

        // constructor
        function Game(cellSize) {
            CELL_SIZE = cellSize || 32; // pixels
            FIELD_WIDTH = 32 * CELL_SIZE;
            FIELD_HEIGHT = 15 * CELL_SIZE;
            numApples = 3;
        }

        Game.prototype.run = function () {
            canvasRenderer = CanvasRenderer.getRenderer(FIELD_WIDTH, FIELD_HEIGHT, CELL_SIZE);
            // Snake(cellSize, startLength, startX, startY)
            snake = new GameObjects.Snake(CELL_SIZE, 5, CELL_SIZE, CELL_SIZE);
            snake.attachEventHandlers(document);
            apples = [];
            for (var i = 0; i < numApples; i++) {
                var randomCell = _getRandomCell();
                apples.push(new GameObjects.Apple(randomCell));
            }

            intervalID = setInterval(_gameLoop, 1000 / 10);
        };
        Game.prototype.deleteGame = function () {
            var theCanvas = document.getElementsByTagName('canvas')[0];
            document.body.removeChild(theCanvas);
            clearInterval(intervalID);
            score.innerHTML = 0;
        };

        Game.prototype.pauseGame = function () {
            clearInterval(intervalID);
        };
        Game.prototype.startGame = function () {
            intervalID = setInterval(_gameLoop, 1000 / 10);
        };
        return Game;

    })();

    return {
        createGame: function () {
            if (!gameInstance) {
                gameInstance = new Game();
            }

            return gameInstance;
        }
    };
})();