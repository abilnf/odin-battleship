const Gameboard = require("./gameboard");

function Player() {
  const board = Gameboard();

  const isReady = () => board.isFull();

  return { board, isReady };
}

module.exports = Player;
