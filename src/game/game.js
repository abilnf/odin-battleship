const game = (function () {
  const players = [];
  const nextMove = 0;
  const running = false;
  const statusCallback = null;

  const reset = () => {
    players[0] = Player();
    players[1] = Player();
    running = true;
  };

  const attack = (x, y) => {
    const enemyId = nextMove ? 0 : 1;
    players[enemyId].board.receiveAttack(x, y);
    if (players[enemyId].board.hasLost()) {
      if (statusCallback) statusCallback();
      running = false;
    }
    nextMove = enemyId;
  };

  const placeShip = (player, x, y, length, direction) => {
    players[player].board.placeShip(x, y, length, direction);
  };
})();
