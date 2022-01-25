const Ship = require("./ship");

function Gameboard() {
  const board = [];
  for (let i = 0; i < 100; i++) board.push(false);

  const isInBounds = (x, y) => x >= 0 && x < 10 && y >= 0 && y < 10;
  const placeAt = (x, y, value) => (board[y * 10 + x] = value);
  const getAt = (x, y) => board[y * 10 + x];

  const offset = (x, y, direction) => ({
    x: x + (direction === "horizontal" ? 1 : 0),
    y: y + (direction === "horizontal" ? 0 : 1),
  });

  const canPlaceShip = (x, y, length, direction) => {
    for (let i = 0; i < length; i++) {
      if (!isInBounds(x, y)) return false;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (typeof getAt(x + dx, y + dy) === "object") return false;
        }
      }
      ({ x, y } = offset(x, y, direction));
    }
    return true;
  };

  const placeShip = (x, y, length, direction) => {
    if (!canPlaceShip(x, y, length, direction)) return false;
    const ship = Ship(length);
    for (let i = 0; i < length; i++) {
      placeAt(x, y, { position: i, ship });
      ({ x, y } = offset(x, y, direction));
    }
    return true;
  };

  const receiveAttack = (x, y) => {
    const obj = getAt(x, y);
    if (!obj) {
      placeAt(x, y, true);
      return true;
    }
    if (obj === true) return false;
    if (obj.hit) return false;
    obj.hit = true;
    obj.ship.hit(obj.position);
    return true;
  };

  const hasLost = () => {
    return board.reduce(
      (result, cell) =>
        result &&
        (typeof cell !== "object" ||
          (typeof cell === "object" && cell.ship.isSunk())),
      true
    );
  };

  return { placeShip, receiveAttack, hasLost };
}

module.exports = Gameboard;
