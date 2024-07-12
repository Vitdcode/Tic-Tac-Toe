const gameBoardDivContainer = document.querySelector("#gameboard");
const squares = document.querySelectorAll(".square");
const winnerText = document.querySelector("#message");

let gameStarted = false;
let gameIsFinished = false;

const Gameboard = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const getGameBoard = () => gameBoard;
  const emptyGameboard = () => gameBoard = ["", "", "", "", "", "", "", "", ""]; // prettier-ignore

  function render() {
    gameBoard.forEach((square, index) => {
      if (gameStarted == true) {
        return;
      }
      const squareDiv = document.createElement("div");
      squareDiv.classList.add("square");
      squareDiv.id = index;
      squareDiv.textContent = square;
      gameBoardDivContainer.appendChild(squareDiv);
      squareDiv.addEventListener("click", handleSquareClick);
    });
  }

  function handleSquareClick(event) {
    const squareId = event.target.id;

    if (gameIsFinished) {
      return;
    } else if (!event.target.textContent == "") {
      return;
    } else {
      event.target.textContent = Game.currentPlayerMarker();
      gameBoard[squareId] = event.target.textContent;
      Game.winnerCheck(getGameBoard());
      Game.switchPlayer();
    }
  }

  return { render, emptyGameboard, getGameBoard };
})();

const Game = (() => {
  const startGameButton = document.querySelector("#start-game-button");
  startGameButton.addEventListener("click", () => {
    Game.start();
  });

  const restartButton = document.querySelector("#restart-game-button");
  restartButton.addEventListener("click", () => {
    gameBoardDivContainer.innerHTML = "";
    gameIsFinished = false;
    gameStarted = false;
    Gameboard.emptyGameboard();
    Gameboard.render();
    gameStarted = true;
    winnerText.textContent = "";
    switchPlayer();
  });

  function winnerCheck(board) {
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

    for (combo of winningCombinations) {
      const [a, b, c] = combo;

      if (
        board[a] == currentPlayerMarker() &&
        board[b] == currentPlayerMarker() &&
        board[c] == currentPlayerMarker()
      ) {
        winnerText.textContent = currentPlayerName() + " won the game";
        gameIsFinished = true;
      }
    }
  }

  let players = [];
  let playerIndex = 0;

  function createPlayer(name, marker) {
    return { name, marker };
  }

  function currentPlayerMarker() {
    return players[playerIndex].marker;
  }

  function currentPlayerName() {
    return players[playerIndex].name;
  }

  function switchPlayer() {
    return (playerIndex = playerIndex === 0 ? 1 : 0);
  }

  function start() {
    const playerOne = document.querySelector("#player-one-name");
    const playerTwo = document.querySelector("#player-two-name");
    players = [
      createPlayer(playerOne.value, "X"),
      createPlayer(playerTwo.value, "O"),
    ];

    Gameboard.render();
    gameStarted = true;
  }

  return {
    start,
    createPlayer,
    currentPlayerMarker,
    switchPlayer,
    winnerCheck,
  };
})();
