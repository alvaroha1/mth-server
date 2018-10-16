
module.exports.creatingFilter = function creatingFilter(req) {
  const filter = {};
  if (req.query.country) filter.country = req.query.country;
  if (req.query.city) filter.city = req.query.city; 
  if (req.query.price) filter.price = { 
    $gte: req.query.price[0],
    $lte: req.query.price[1],
  };
  if (req.query.size) filter.size = { 
    $gte: req.query.size[0], 
    $lte: req.query.size[1],
  };
  if (req.query.estimatedPricePercentageDifference) filter.estimatedPricePercentageDifference = { 
    $gte: req.query.estimatedPricePercentageDifference,
  };
  if (req.query.estimatedPrice) filter.estimatedPrice = { 
    $gte: req.query.estimatedPrice[0],
    $lte: req.query.estimatedPrice[1],
  };
  return filter;
} 

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