const resetButton = document.querySelector(".reset-button");

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

  const playerOne = Player("Cross", true, "X");
  const playerTwo = Player("Naught", true, "O");
  let playerTurn = playerOne;

  const DisplayController = (() => {
    const render = () => {
      const boardContainer = document.querySelector(".board-container");
      boardContainer.textContent = "";

      const playerTurnDiv = document.querySelector(".current-turn");
      playerTurnDiv.textContent = `${getPlayerTurn().getToken()}`;

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
          newCol.addEventListener("click", () => {
            const whosTurn = getPlayerTurn();
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
    return { render };
  })(gameBoard);

  const controller = DisplayController;

  const placeToken = (token, x, y) => {
    if (gameBoard[x][y] === "") {
      gameBoard[x][y] = token;
      playerTurn = playerTurn === playerOne ? playerTwo : playerOne;
      controller.render();
    } else {
      alert("Space occupied. Please try an empty square!");
    }
  };

  const resetGame = function () {
    gameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    controller.render();
  };

  resetButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset?")) {
      resetGame();
    }
  });

  const getGameBoard = () => gameBoard;

  const getController = () => controller;

  const getPlayers = function () {
    return { playerOne, playerTwo };
  };

  const getPlayerTurn = () => playerTurn;

  return { getGameBoard, placeToken, getController, getPlayers };
})();

const newGame = Game;

newGame.getController().render();

const players = newGame.getPlayers();
