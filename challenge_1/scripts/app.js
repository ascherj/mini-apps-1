var app = {
  init: () => {
    app.setUpEventListeners();
  },
  setUpEventListeners: () => {
    game.newGameButton.addEventListener('click', handlers.handleNewGameButtonClick);
    game.board.addEventListener('click', handlers.handleBoardClick);
  }
}

var game = {
  newGameButton: document.getElementById('new-game'),
  board: document.getElementById('board'),
  status: document.getElementById('status'),
  currentTurn: 'X',

  start: () => {
    game.currentTurn = 'X';
    render.status();
  },
  switchTurn: () => {
    console.log('switching turn');
    game.currentTurn = game.currentTurn === 'X' ? 'Y' : 'X';
  },
  plotMove: (row, col) => {

  }
};

var render = {
  status: () => {
    console.log('rendering status');
    game.status.textContent = game.currentTurn + '\'s turn';
  }
};

var handlers = {
  handleNewGameButtonClick: (event) => {
    game.start();
  },
  handleBoardClick: (event) => {
    var rows = { 'top-row': 0, 'middle-row': 1, 'bottom-row': 2 };
    var row = rows[event.target.parentElement.id];
    var col = event.target.cellIndex;

    console.log('Player', game.currentTurn, 'clicked on:', row, col);

    if (row >= 0 && col >= 0) {
      game.plotMove(row, col);
      game.switchTurn();
      render.status();
    }
  }
};

app.init();
