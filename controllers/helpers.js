
module.exports.creatingFilter = function creatingFilter(req) {
  const filter = {};
  const {
    country,
    city,
    price,
    size,
    estimatedPricePercentageDifference,
    estimatedPrice,
  } = req.query;
  if (country) filter.country = country;
  if (city) filter.city = city;
  if (price) filter.price = { $gte: price[0], $lte: price[1] };
  if (size) filter.size = { $gte: size[0], $lte: size[1] };
  if (estimatedPrice) filter.estimatedPrice = { $gte: estimatedPrice[0], $lte: estimatedPrice[1] };
  if (estimatedPricePercentageDifference) {
    filter.estimatedPricePercentageDifference = {
      $gte: estimatedPricePercentageDifference,
    };
  }
  return filter;
};

module.exports.avgCalc = function avgCalc(homesArray) {
  let len = 0;
  return homesArray
    .reduce((acc, el) => {
      const { pricePerSquareMeter: sub } = el;
      if (Number.isFinite(sub)) {
        len += 1;
        return acc + sub;
      }
      return acc;
    }, 0) / len;
};
