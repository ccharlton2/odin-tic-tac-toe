const Game = ((playerOne, playerTwo) => {
  const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const placeToken = (token, x, y) => {
    gameBoard[x][y] = token;
  };

  const getGameBoard = () => gameBoard;

  const DisplayController = (() => {
    const render = () => {
      console.log(gameBoard);
    };

    return { render };
  })();

  return { getGameBoard, placeToken };
})();

const Player = (name, isHuman, token) => {
  const getName = () => name;
  const getIsHuman = () => isHuman;
  const getToken = () => token;

  return { getName, getToken, getIsHuman };
};

const newGame = Game;
