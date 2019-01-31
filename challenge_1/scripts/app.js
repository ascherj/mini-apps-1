var app = {
  init: () => {
    app.setUpEventListeners();
    game.start()
  },
  setUpEventListeners: () => {
    game.newGameButton.addEventListener('click', handlers.handleNewGameButtonClick);
    game.boardDiv.addEventListener('click', handlers.handleBoardClick);
  }
};

var game = {
  newGameButton: document.getElementById('new-game'),
  boardDiv: document.getElementById('board'),
  status: document.getElementById('status'),
  currentTurn: 'X',
  currentBoard: {
    0: [null, null, null],
    1: [null, null, null],
    2: [null, null, null]
  },
  winner: undefined,


  start: () => {
    game.currentTurn = 'X';
    render.status();
  },
  switchTurn: () => {
    console.log('switching turn');
    game.currentTurn = game.currentTurn === 'X' ? 'O' : 'X';
  },
  plotMove: (row, col) => {
    var currentRow = document.getElementsByTagName('tbody')[0].children[row];
    var currentSquare = currentRow.children[col];
    currentSquare.innerHTML = game.currentTurn;
  },
  updateBoard: (row, col) => {
    game.currentBoard[row][col] = game.currentTurn;
  },
  checkForWinner: () => {

  }
};

var render = {
  status: () => {
    console.log('rendering status');
    game.status.innerHTML = game.currentTurn + '\'s turn';
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
      game.updateBoard(row, col);
      game.switchTurn();
      render.status();
    }
  }
};

app.init();
