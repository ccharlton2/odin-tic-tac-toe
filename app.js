const testButton = document.querySelector(".test-button");

const Player = (name, isHuman, token) => {
  const getName = () => name;
  const getIsHuman = () => isHuman;
  const getToken = () => token;

  return { getName, getToken, getIsHuman };
};

const Game = ((playerOne, playerTwo) => {
  const gameBoard = [
    ["O", "X", "X"],
    ["X", "O", "X"],
    ["X", "X", "O"],
  ];

  const DisplayController = (() => {
    const render = () => {
      const rowContainer = document.querySelector(".board-container");

      for (let rowIndex = 0; rowIndex < gameBoard.length; rowIndex += 1) {
        const newRow = document.createElement("div");
        newRow.classList.add("row");
        console.log(newRow);

        for (
          let colIndex = 0;
          colIndex < gameBoard[rowIndex].length;
          colIndex += 1
        ) {
          const newCol = document.createElement("div");
          newCol.classList.add("col");
          newCol.textContent = gameBoard[rowIndex][colIndex];
          newRow.appendChild(newCol);
        }

        rowContainer.appendChild(newRow);
      }
    };
    return { render };
  })(gameBoard);

  const controller = DisplayController;

  const placeToken = (token, x, y) => {
    gameBoard[x][y] = token;
  };

  const getGameBoard = () => gameBoard;

  const getController = () => controller;

  return { getGameBoard, placeToken, getController };
})();

const newGame = Game;

newGame.getController().render();
