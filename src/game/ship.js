function Ship(length) {
  const hits = [];
  for (let i = 0; i < length; i += 1) hits.push(false);
  const hit = (pos) => {
    if (hits[pos]) return false;
    hits[pos] = true;
    return true;
  };
  const isSunk = () => hits.reduce((all, a) => all && a, true);
  return { hit, isSunk };
}

module.exports = Ship;
