const Gameboard = require("./gameboard");

test("Gameboard place ship", () => {
  const board = Gameboard();
  const x = 1;
  const y = 1;
  const length = 5;
  expect(board.placeShip(x, y, length, "vertical")).toBe(true);
  for (let i = 0; i < length; i++) {
    const result = board.placeShip(
      x,
      y + i,
      length,
      i % 2 ? "vertical" : "horizontal"
    );
    expect(result).toBe(false);
  }
});

test("Gameboard receive attack", () => {
  const board = Gameboard();
  board.placeShip(0, 0, 5, "vertical");
  board.placeShip(3, 2, 3, "horizontal");
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      expect(board.receiveAttack(x, y)).toBe(true);
      expect(board.receiveAttack(x, y)).toBe(false);
    }
  }
});

test("Gameboard has lost", () => {
  const board = Gameboard();
  board.placeShip(0, 0, 5, "vertical");
  board.placeShip(3, 2, 3, "horizontal");
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (x != 0 || y != 1) board.receiveAttack(x, y);
      expect(board.hasLost()).toBe(false);
    }
  }
  board.receiveAttack(0, 1);
  expect(board.hasLost()).toBe(true);
});
