const Ship = require("./ship");

function Gameboard() {
  const board = [];
  for (let i = 0; i < 100; i++) board.push({});
  let shipCount = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    total: 0,
  };

  const isInBounds = (x, y) => x >= 0 && x < 10 && y >= 0 && y < 10;
  const placeAt = (x, y, value) => (board[y * 10 + x] = value);
  const getAt = (x, y) => board[y * 10 + x];

  const offset = (x, y, direction) => ({
    x: x + (direction === "horizontal" ? 1 : 0),
    y: y + (direction === "horizontal" ? 0 : 1),
  });

  const canPlaceShip = (x, y, length, direction) => {
    if (isFull() || shipCount[length.toString()] == 5 - length) return false;
    for (let i = 0; i < length; i++) {
      if (!isInBounds(x, y)) return false;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (isInBounds(x + dx, y + dy) && getAt(x + dx, y + dy).ship)
            return false;
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
    shipCount.total += 1;
    shipCount[length.toString()] += 1;
    return true;
  };

  const receiveAttack = (x, y) => {
    const obj = getAt(x, y);
    if (obj.hit) return false;
    obj.hit = true;
    if (obj.ship) obj.ship.hit(obj.position);
    return true;
  };

  const hasLost = () => {
    return board.reduce(
      (result, cell) => result && (!cell.ship || cell.ship.isSunk()),
      true
    );
  };

  const getEnemyBoard = () => {
    let array = [];
    for (let cell of board) {
      if (!cell.hit) {
        array.push("none");
        continue;
      }
      if (cell.ship) {
        if (cell.ship.isSunk()) {
          array.push("sunk");
          continue;
        }
        array.push("hit");
        continue;
      }
      array.push("miss");
    }
    return array;
  };

  const getUserBoard = () => {
    let array = [];
    console.log(board);
    for (let cell of board) {
      if (cell.ship) {
        if (cell.hit) {
          array.push("sunk");
        } else {
          array.push("ship");
        }
      } else {
        if (cell.hit) {
          array.push("hit");
        } else {
          array.push("none");
        }
      }
    }
    return array;
  };

  const isFull = () => shipCount.total === 10;

  return {
    isFull,
    placeShip,
    receiveAttack,
    hasLost,
    getEnemyBoard,
    getUserBoard,
  };
}

module.exports = Gameboard;
