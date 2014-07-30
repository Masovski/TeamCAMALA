(function() {
    "use strict";

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
        if (ev.keyCode === 80) {
            game.pauseGame();
        }
    });
    document.addEventListener('keydown', function(ev) {
        if (ev.keyCode === 82) {
            game.startGame();
        }
    });

})();