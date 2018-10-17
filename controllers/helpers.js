module.exports.createFilter = function createFilter(queryObj) {
  const filter = {};
  const {
    country,
    city,
    price,
    size,
    estimatedPricePercentageDifference,
  } = queryObj;
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

module.exports.formatHomes = function formatHomes(homesArray) {
  return homesArray.map((obj) => {
    const formattedObj = {};
    formattedObj.thumbnail = obj.thumbnail;
    formattedObj.price = obj.price;
    formattedObj.size = obj.size;
    formattedObj.country = obj.country;
    formattedObj.city = obj.city;
    formattedObj.latitude = obj.latitude;
    formattedObj.longitude = obj.longitude;
    formattedObj.url = obj.url;
    formattedObj.pricePerSquareMeter = obj.pricePerSquareMeter;
    formattedObj.estimatedPrice = obj.estimatedPrice;
    formattedObj.estimatedPricePercentageDifference = obj.estimatedPricePercentageDifference;
    return formattedObj;
  });
};

module.exports.processQuery = function processQuery(queryObj) {
  const processedObj = {};
  processedObj.estimatedPricePercentageDifference = parseInt(queryObj.estimatedPricePercentageDifference, 10);
  processedObj.price = queryObj.price.map(string => parseInt(string, 10));
  processedObj.size = queryObj.size.map(string => parseInt(string, 10));
  processedObj.country = queryObj.country;
  processedObj.city = queryObj.city;
  processedObj.estimatedPrice = queryObj.estimatedPrice.map(string => parseInt(string, 10));
  processedObj.page = parseInt(queryObj.page, 10);
  processedObj.centerLongitude = parseFloat(queryObj.centerLongitude, 10);
  processedObj.centerLatitude = parseFloat(queryObj.centerLatitude, 10);
  processedObj.radius = parseInt(queryObj.radius, 10);
  return processedObj;
};
