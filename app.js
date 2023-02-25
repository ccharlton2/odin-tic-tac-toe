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

  let playerOne = Player("Cross", true, "X");
  let playerTwo = Player("Naught", true, "O");
  let currentPlayer = playerOne;

  const resetButton = document.querySelector(".reset-button");
  const playButton = document.querySelector(".play-button");
  const currentTurnDiv = document.querySelector(".turn-card");
  const playerInputDiv = document.querySelector(".player-input");
  const boardContainer = document.querySelector(".board-container");

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
    };

    resetButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset?")) {
        resetGame();
        playerInputDiv.classList.toggle("hidden");
        currentTurnDiv.classList.toggle("hidden");
        boardContainer.classList.toggle("hidden");
      }
    });
    return { render };
  })(gameBoard);

  const controller = DisplayController;

  const placeToken = (token, x, y) => {
    if (gameBoard[x][y] === "") {
      gameBoard[x][y] = token;
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

    playerOne = Player(playerOneNameInput, true, playerOneTokenOption);
    playerTwo = Player(playerTwoNameInput, true, playerTwoTokenOption);
    currentPlayer = playerOne;
  };

  const getCurrentPlayer = () => currentPlayer;

  const playGame = () => {
    playerInputDiv.classList.toggle("hidden");
    currentTurnDiv.classList.toggle("hidden");
    boardContainer.classList.toggle("hidden");

    setPlayers();

    controller.render();
  };

  playButton.addEventListener("click", () => {
    playGame();
  });

  return { getGameBoard, placeToken, getController, getPlayers, setPlayers };
})();

const newGame = Game;
