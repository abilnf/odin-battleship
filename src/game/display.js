const game = require("./game");

const display = (function () {
  const reset = () => {
    document.querySelectorAll(".board").forEach((board) => {
      for (let i = 0; i < 100; i++) {
        const button = document.createElement("button");
        button.classList.add("cell");
        button.setAttribute("data-index", i.toString());

        if (board.getAttribute("id") === "player-board") {
          // button.addEventListener("click", (e) => {
          //   game.placeShip(0, i % 10, Math.floor(i / 10))
          // });
        } else {
          button.addEventListener("click", (e) => {
            if (game.attack(i % 10, Math.floor(i / 10), 0)) {
              updateEnemyBoard();
              game.aiMove();
              updateUserBoard();

              const winner = game.getWinner();
              if (winner !== null) {
                alert(`You ${winner === 0 ? "WON" : "LOST"}!`);
              }
            }
          });
        }

        board.appendChild(button);
      }
    });
  };

  const updateEnemyBoard = () => {
    const enemyBoard = game.getEnemyBoard();
    for (let i = 0; i < 100; i++) {
      const button = document.querySelector(
        `#enemy-board .cell[data-index="${i}"]`
      );
      button.classList.remove("cell--sunk");
      let cell = enemyBoard[i];
      if (cell === "none") {
        button.textContent = "";
      } else if (cell === "hit") {
        button.textContent = "X";
      } else if (cell === "sunk") {
        button.textContent = "X";
        button.classList.add("cell--sunk");
      } else {
        button.textContent = "-";
      }
    }
  };

  const updateUserBoard = () => {
    const userBoard = game.getUserBoard();
    for (let i = 0; i < 100; i++) {
      const button = document.querySelector(
        `#player-board .cell[data-index="${i}"]`
      );
      button.classList.remove("cell--sunk");
      let cell = userBoard[i];
      if (cell === "none") {
        button.textContent = "";
      } else if (cell === "hit") {
        button.textContent = "-";
      } else if (cell === "sunk") {
        button.textContent = "X";
        button.classList.add("cell--sunk");
      } else {
        button.textContent = "X";
      }
    }
  };

  return { reset, updateEnemyBoard, updateUserBoard };
})();

module.exports = display;
