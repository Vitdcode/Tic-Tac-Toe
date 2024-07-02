const playerOneName = document.querySelector("#player-one-name");
const playerTwoName = document.querySelector("#player-two-name");
const winnerText = document.querySelector("#message");

let gameOver = false;

const Gameboard = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  let render = () => {
    renderHTML = "";
    gameBoard.forEach((square, index) => {
      renderHTML += `<div class='square' id=${index}>${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = renderHTML;
  };

  let update = (index, marker) => {
    if (gameBoard[index] !== "") {
      return;
    } else if (gameOver === false) {
      gameBoard[index] = marker;
      render();
      Game.squareClick();
    }
  };

  const getGameBoard = () => gameBoard;

  const emptyGameboard = () => (gameBoard = ["", "", "", "", "", "", "", "", ""]); //prettier-ignore

  return { render, update, emptyGameboard, getGameBoard };
})();

const createPlayer = (name, marker) => {
  return { name, marker };
};

const Game = (() => {
  let players = [];
  let currentPlayer;

  let start = () => {
    players = [
      createPlayer(playerOneName.value, "X"),
      createPlayer(playerTwoName.value, "O"),
    ];
    currentPlayer = 0;
    Gameboard.render();
    squareClick();
  };

  function checkForTie(board) {
    let tie = true;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        tie = false;
        break;
      }
    }
    if (tie) {
      return (winnerText.textContent = "It is a tie");
    }
  }

  function checkForWin(board) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameOver = true;
        return (winnerText.textContent = `${players[currentPlayer].name} won!`);
      }
    }
  }

  const squareClick = () => {
    const squares = document.querySelectorAll(".square");
    if (gameOver) {
      return;
    } else if (gameOver === false) {
      squares.forEach((square) => {
        square.addEventListener("click", squareClickEvent);
      });
    }
  };

  const squareClickEvent = (event) => {
    let index = parseInt(event.target.id);
    Gameboard.update(index, players[currentPlayer].marker);

    checkForWin(Gameboard.getGameBoard());
    checkForTie(Gameboard.getGameBoard());

    currentPlayer = currentPlayer === 0 ? 1 : 0;
  };

  return { start, squareClick };
})();

const startButton = document.querySelector("#start-game-button");
startButton.addEventListener("click", () => {
  if (playerOneName.value === "") {
    return alert("Enter Player 1 Name");
  } else if (playerTwoName.value === "") {
    return alert("Enter Player 2 Name");
  }
  Game.start();
});

const restartButton = document.querySelector("#restart-game-button");
restartButton.addEventListener("click", () => {
  gameOver = false;
  Gameboard.emptyGameboard();
  Gameboard.render();
  winnerText.textContent = "";
  Game.start();
});
