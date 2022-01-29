const Player = require("./player");

const game = (function () {
  const players = [];
  let nextMove = 0;
  let running = false;
  // const statusCallback = null;

  const randomizePlayer = (player) => {
    while (!players[player].isReady()) {
      const x = Math.ceil(Math.random() * 10) - 1;
      const y = Math.ceil(Math.random() * 10) - 1;
      const length = Math.ceil(Math.random() * 4);
      const direction =
        Math.ceil(Math.random() * 2) - 1 ? "vertical" : "horizontal";

      placeShip(player, x, y, length, direction);
    }
  };

  const reset = () => {
    players[0] = Player();
    players[1] = Player();
    randomizePlayer(0);
    randomizePlayer(1);
    running = true;
  };

  const attack = (x, y, player) => {
    if (!running) return;
    if (!players[0].isReady()) return;
    if (player !== nextMove) return;
    const enemyId = nextMove ? 0 : 1;
    if (!players[enemyId].board.receiveAttack(x, y)) return false;
    if (players[enemyId].board.hasLost()) {
      // if (statusCallback) statusCallback();
      running = false;
    }
    nextMove = enemyId;
    console.log("succes with attack!");
    return true;
  };

  const aiMove = () => {
    if (!running) return;
    while (true) {
      const x = Math.ceil(Math.random() * 10) - 1;
      const y = Math.ceil(Math.random() * 10) - 1;
      if (attack(x, y, 1)) break;
    }
  };

  const placeShip = (player, x, y, length, direction) => {
    players[player].board.placeShip(x, y, length, direction);
  };

  const getEnemyBoard = () => players[1].board.getEnemyBoard();
  const getUserBoard = () => players[0].board.getUserBoard();

  const getWinner = () => {
    if (players[0].board.hasLost()) return 1;
    if (players[1].board.hasLost()) return 0;
    return null;
  };

  return { reset, attack, getEnemyBoard, getUserBoard, aiMove, getWinner };
})();

module.exports = game;
