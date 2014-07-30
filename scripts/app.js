(function() {
    "use strict";
    var paused = false;
    var game = Game.createGame(),
        controls = document.getElementById('controls');
    var startGameButton = document.getElementById('start-game');
    startGameButton.addEventListener('click', function() {
        game.run();
        controls.removeChild(this);
        addNewGameButton();
    });

    function addNewGameButton() {

        var newGameButton = document.createElement('button');
        newGameButton.innerHTML = 'New Game';
        newGameButton.addEventListener('click', function() {
            game.deleteGame();
            game.run();
        });

        controls.appendChild(newGameButton);
    }

    document.addEventListener('keydown', function(ev) {
        if (ev.keyCode === 80 && !paused) {
            game.pauseGame();
            paused = true;
        }
        else if (ev.keyCode === 80 && paused) {
            game.startGame();
            paused = false;
        }
    });
    document.addEventListener('keydown', function(ev) {
        if (ev.keyCode === 82) {
            game.deleteGame();
            game.run();
        }
    });

})();