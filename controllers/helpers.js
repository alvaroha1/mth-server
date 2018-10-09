module.exports.avgCalc = function avgCalc(homesArray) {
  const m2PriceArray = homesArray.map(obj => obj.pricePerSquareMeter);
  const avgM2Price = m2PriceArray.reduce((a, b) => a + b) / m2PriceArray.length;
  return avgM2Price;
};
