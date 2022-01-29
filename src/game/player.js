const Gameboard = require("./gameboard");

function Player() {
  const board = Gameboard();

  return { board };
}
