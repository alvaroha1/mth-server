module.exports.avgCalc = function avgCalc(homesArray) {
  const m2PriceArray = homesArray
  .map(obj => obj.pricePerSquareMeter)
  .filter(el => Number.isFinite(el));
return m2PriceArray.reduce((a, b) => a + b) / m2PriceArray.length;
};

module.exports.creatingFilter = function creatingFilter(req) {
  const filter = {};
  // if (req.query.country) filter.country = req.query.country; //DONT REMOVE
  if (req.query.price) filter.price = { 
    $gte: req.query.price[0],
    $lte: req.query.price[1],
  };
  if (req.query.size) filter.size = { 
    $gte: req.query.size[0], 
    $lte: req.query.size[1],
  };
  // if (req.query.estimatedPricePercentageDifference) filter.estimatedPricePercentageDifference = { //DONT REMOVE
  // $gte: req.query.discount
  // };
  // if (req.query.estimatedPrice) filter.estimatedPrice = {  //DONT REMOVE
  //   $gte: req.query.estimatedPrice[0],
  //   $lte: req.query.estimatedPrice[1],
  // };
  return filter;
} 