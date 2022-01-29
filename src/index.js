import "./index.css";
const display = require("./game/display.js");
const game = require("./game/game.js");

display.reset();
game.reset();
display.updateEnemyBoard();
display.updateUserBoard();
