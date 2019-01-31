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
  boardRows: document.getElementsByTagName('tbody')[0].children,
  status: document.getElementById('status'),
  currentTurn: '',
  currentBoard: {},
  winner: undefined,

  start: () => {
    game.resetBoard();
    game.currentTurn = 'X';
    game.updateStatus();
  },
  switchTurn: () => {
    game.currentTurn = game.currentTurn === 'X' ? 'O' : 'X';
  },
  plotMove: (row, col) => {
    var currentRow = game.boardRows[row];
    var currentSquare = currentRow.children[col];
    currentSquare.innerHTML = game.currentTurn;
  },
  updateStatus: (status) => {
    if (status === 'winner') {
      console.log(game.currentTurn, 'WINS!');
      game.status.innerHTML = game.currentTurn + ' WINS!';

    } else if (status === 'tie') {
      console.log('Tie game!');
      game.status.innerHTML = 'Tie game!';

    } else {
      game.status.innerHTML = game.currentTurn + '\'s turn';
    }
  },
  updateBoard: (row, col) => {
    game.currentBoard[row][col] = game.currentTurn;
  },
  isWinner: () => {
    // check rows
    for (var i = 0; i < 3; i++) {
      var row = game.currentBoard[i];
      var result = false;

      result = row.reduce((accum, col) => {
        return accum && (col === game.currentTurn);
      }, true);

      if (result) {
        return true;
      }
    }

    // check cols
    for (var i = 0; i < 3; i++) {
      if (game.currentBoard[0][i] === game.currentTurn &&
          game.currentBoard[1][i] === game.currentTurn &&
          game.currentBoard[2][i] === game.currentTurn) {
        return true;
      }
    }

    // check diagonals
    if (game.currentBoard[0][0] === game.currentTurn &&
        game.currentBoard[1][1] === game.currentTurn &&
        game.currentBoard[2][2] === game.currentTurn) {
      return true;
    }
    if (game.currentBoard[0][2] === game.currentTurn &&
        game.currentBoard[1][1] === game.currentTurn &&
        game.currentBoard[2][0] === game.currentTurn) {
      return true;
    }

    return false;
  },
  isTie: () => {
    var tie = true;
    for (var i = 0; i < 3; i++) {
      var currentRow = game.boardRows[i];
      for (var j = 0; j < 3; j++) {
        var currentSquare = currentRow.children[j];
        if (!currentSquare.innerHTML) {
          tie = false;
        }
      }
    }
    return tie;
  },
  resetBoard: () => {
    console.log('clearing board...');

    game.currentBoard = {
      0: [null, null, null],
      1: [null, null, null],
      2: [null, null, null]
    };

    for (var i = 0; i < 3; i++) {
      var currentRow = game.boardRows[i];
      for (var j = 0; j < 3; j++) {
        var currentSquare = currentRow.children[j];
        currentSquare.innerHTML = '';
      }
    }
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

    console.log(game.currentTurn, 'clicked on:', row, col);

    if (row >= 0 && col >= 0) {
      game.plotMove(row, col);
      game.updateBoard(row, col);

      if (game.isWinner()) {
        game.updateStatus('winner');
      } else if (game.isTie()) {
        game.updateStatus('tie');
      } else {
        game.switchTurn();
        game.updateStatus();
      }
    }
  }
};

app.init();
