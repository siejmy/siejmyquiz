exports.alphanumeric = function (x) {
  return x.replace(/\W/g, "");
};

exports.percentage = function (x) {
  return Math.floor(x * 100) + "%";
};

exports.dividePercentage = function (a, b) {
  return Math.floor((a / b) * 100) + "%";
};
