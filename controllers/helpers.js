
module.exports.createFilter = function createFilter(req) {
  const filter = {};
  const {
    country,
    city,
    price,
    size,
    estimatedPricePercentageDifference,
  } = req.query;
  if (city) filter.city = city;
  else if (country) filter.country = country;
  if (price) filter.price = { $gte: price[0], $lte: price[1] };
  if (size) filter.size = { $gte: size[0], $lte: size[1] };
  if (estimatedPricePercentageDifference) {
    filter.estimatedPricePercentageDifference = {
      $lte: estimatedPricePercentageDifference,
    };
  }
  return filter;
};

module.exports.avgCalc = function avgCalc(homesArray) {
  let len = 0;
  const average = homesArray
    .reduce((acc, el) => {
      const { pricePerSquareMeter: sub } = el;
      if (Number.isFinite(sub)) {
        len += 1;
        return acc + sub;
      }
      return acc;
    }, 0) / len;
  return Math.round(average);
};
