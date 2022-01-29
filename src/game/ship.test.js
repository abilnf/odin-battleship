import "./ship";

test("Ship double hit", () => {
  const ship = Ship(1);
  expect(ship.hit(0)).toBe(true);
  expect(ship.hit(0)).toBe(false);
});

test("Ship sunk", () => {
  const length = 5;
  const ship = Ship(length);
  for (let i = 0; i < length; i++) {
    expect(ship.isSunk()).toBe(false);
    ship.hit(i);
  }
  expect(ship.isSunk()).toBe(true);
});
