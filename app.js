const Player = (name, isHuman, token) => {
  const getName = () => name;
  const getIsHuman = () => isHuman;
  const getToken = () => token;

  return { getName, getToken, getIsHuman };
};

const Game = (() => {
  let gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let playerOne = "";
  let playerTwo = "";
  let currentPlayer = "";

  const resetButton = document.querySelector(".reset-button");
  const playButton = document.querySelector(".play-button");
  const currentTurnDiv = document.querySelector(".turn-card");
  const playerInputDiv = document.querySelector(".player-input");
  const boardContainer = document.querySelector(".board-container");
  const winnerDiv = document.querySelector(".winner");
  let tokensPlaced = 0;

  const DisplayController = (() => {
    const render = () => {
      boardContainer.textContent = "";

      const playerTurnDiv = document.querySelector(".current-turn");
      playerTurnDiv.textContent = `${getCurrentPlayer().getName()} (${getCurrentPlayer().getToken()})`;

      for (let rowIndex = 0; rowIndex < gameBoard.length; rowIndex += 1) {
        const newRow = document.createElement("div");
        newRow.classList.add(`row-${rowIndex}`);
        for (
          let colIndex = 0;
          colIndex < gameBoard[rowIndex].length;
          colIndex += 1
        ) {
          const newCol = document.createElement("div");
          newCol.classList.add(`col-${colIndex}`);
          newCol.textContent = gameBoard[rowIndex][colIndex];
          // eslint-disable-next-line no-loop-func
          newCol.addEventListener("click", () => {
            const whosTurn = getCurrentPlayer();
            placeToken(
              whosTurn === playerOne
                ? playerOne.getToken()
                : playerTwo.getToken(),
              rowIndex,
              colIndex
            );
          });
          newRow.appendChild(newCol);
        }
        boardContainer.appendChild(newRow);
      }
    };

    const resetGame = function () {
      gameBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];

      tokensPlaced = 0;
    };

    resetButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset?")) {
        resetGame();
        playerInputDiv.classList.toggle("hidden");
        currentTurnDiv.classList.toggle("hidden");
        boardContainer.classList.toggle("hidden");
        winnerDiv.classList.toggle("hidden");
      }
    });
    return { render };
  })(gameBoard);

  const controller = DisplayController;

  const getCurrentPlayer = () => currentPlayer;

  const placeToken = (token, x, y) => {
    if (gameBoard[x][y] === "") {
      tokensPlaced += 1;
      gameBoard[x][y] = token;

      if (tokensPlaced === 9) {
        winnerDiv.textContent = "Tie!";
        winnerDiv.classList.toggle("hidden");
      }

      // check row win
      if (
        gameBoard[0][0] === token &&
        gameBoard[0][1] === token &&
        gameBoard[0][2] === token
      ) {
        winnerDiv.textContent = `${getCurrentPlayer().getName()} wins!`;
        winnerDiv.classList.toggle("hidden");
      }

      if (
        gameBoard[1][0] === token &&
        gameBoard[1][1] === token &&
        gameBoard[1][2] === token
      ) {
        winnerDiv.textContent = `${getCurrentPlayer().getName()} wins!`;
        winnerDiv.classList.toggle("hidden");
      }

      if (
        gameBoard[2][0] === token &&
        gameBoard[2][1] === token &&
        gameBoard[2][2] === token
      ) {
        winnerDiv.textContent = `${getCurrentPlayer().getName()} wins!`;
        winnerDiv.classList.toggle("hidden");
      }

      // check col win
      if (
        gameBoard[0][0] === token &&
        gameBoard[1][0] === token &&
        gameBoard[2][0] === token
      ) {
        winnerDiv.textContent = `${getCurrentPlayer().getName()} wins!`;
        winnerDiv.classList.toggle("hidden");
      }

      if (
        gameBoard[0][1] === token &&
        gameBoard[1][1] === token &&
        gameBoard[2][1] === token
      ) {
        winnerDiv.textContent = `${getCurrentPlayer().getName()} wins!`;
        winnerDiv.classList.toggle("hidden");
      }

      if (
        gameBoard[0][2] === token &&
        gameBoard[1][2] === token &&
        gameBoard[2][2] === token
      ) {
        winnerDiv.textContent = `${getCurrentPlayer().getName()} wins!`;
        winnerDiv.classList.toggle("hidden");
      }

      // check diagonal win
      if (
        gameBoard[0][0] === token &&
        gameBoard[1][1] === token &&
        gameBoard[2][2] === token
      ) {
        winnerDiv.textContent = `${getCurrentPlayer().getName()} wins!`;
        winnerDiv.classList.toggle("hidden");
      }

      if (
        gameBoard[0][2] === token &&
        gameBoard[1][1] === token &&
        gameBoard[2][0] === token
      ) {
        winnerDiv.textContent = `${getCurrentPlayer().getName()} wins!`;
        winnerDiv.classList.toggle("hidden");
      }

      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
      controller.render();
    } else {
      alert("Space occupied. Please try an empty square!");
    }
  };

  const getGameBoard = () => gameBoard;

  const getController = () => controller;

  const getPlayers = function () {
    return { playerOne, playerTwo };
  };

  const setPlayers = function () {
    const playerOneNameInput = document.getElementById("player-one-name").value;
    const playerOneTokenOption =
      document.getElementById("player-one-token").value;

    const playerTwoNameInput = document.getElementById("player-two-name").value;
    const playerTwoTokenOption =
      document.getElementById("player-two-token").value;

    if (playerOneNameInput.trim() === "" || playerTwoNameInput.trim() === "") {
      alert("Please enter a name for each player.");
      // eslint-disable-next-line no-else-return
    } else if (playerOneTokenOption === playerTwoTokenOption) {
      alert("Player tokens must be different.");
    } else if (playerOneNameInput === playerTwoNameInput) {
      alert("Error. Player names must be unique.");
    } else {
      playerOne = Player(playerOneNameInput, true, playerOneTokenOption);
      playerTwo = Player(playerTwoNameInput, true, playerTwoTokenOption);
      currentPlayer = playerOne;
      return true;
    }
  };

  const playGame = () => {
    if (setPlayers() === true) {
      playerInputDiv.classList.toggle("hidden");
      currentTurnDiv.classList.toggle("hidden");
      boardContainer.classList.toggle("hidden");
      winnerDiv.classList.add("hidden");

      controller.render();
    }
  };

  playButton.addEventListener("click", () => {
    playGame();
  });

  return { getGameBoard, placeToken, getController, getPlayers, setPlayers };
})();

const newGame = Game;
