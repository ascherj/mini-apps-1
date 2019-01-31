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
  currentBoard: {},
  winner: undefined,


  start: () => {
    game.resetBoard();
    game.currentTurn = 'X';
    render.status(true);
  },
  switchTurn: () => {
    console.log('switching turn...');
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
  resetBoard: () => {
    console.log('clearing board...');
    game.currentBoard = {
      0: [null, null, null],
      1: [null, null, null],
      2: [null, null, null]
    };

    for (var i = 0; i < 3; i++) {
      var currentRow = document.getElementsByTagName('tbody')[0].children[i];
      for (var j = 0; j < 3; j++) {
        var currentSquare = currentRow.children[j];
        currentSquare.innerHTML = '';
      }
    }
  }
};

var render = {
  status: (status) => {
    console.log('rendering status...');
    if (status) {
      game.status.innerHTML = game.currentTurn + '\'s turn';
    } else {
      console.log(game.currentTurn, 'WINS!');
      game.status.innerHTML = game.currentTurn + ' WINS!';
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
        render.status(false)
      } else {
        game.switchTurn();
        render.status(true);
      }
    }
  }
};

app.init();
