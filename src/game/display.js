const display = (function () {
  document.querySelectorAll(".board").forEach((board) => {
    for (let i = 0; i < 100; i++) {
      const button = document.createElement("button");
      board.appendChild(button);
    }
  });
})();

export default display;
