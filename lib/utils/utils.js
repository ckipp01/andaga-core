const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

module.exports = { isNumeric };
