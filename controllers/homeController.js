const Home = require('../models/homeModel');
const { avgCalc, creatingFilter } = require('./helpers');

exports.getAllHomes = async (req, res) => {
  const allHomes = await Home.find(creatingFilter(req));
  const avgM2Price = avgCalc(allHomes);
  const allHomesFormatted = allHomes.map((obj) => {
    const formattedObj = {};
    formattedObj.thumbnail = obj.thumbnail;
    formattedObj.price = obj.price;
    formattedObj.size = obj.size;
    formattedObj.country = obj.country;
    formattedObj.latitude = obj.latitude;
    formattedObj.longitude = obj.longitude;
    formattedObj.url = obj.url;
    formattedObj.pricePerSquareMeter = obj.pricePerSquareMeter;
    formattedObj.estimatedPrice = obj.estimatedPrice;
    formattedObj.estimatedPricePercentageDifference = obj.estimatedPricePercentageDifference;
    return formattedObj;
  });
  const response = {
    averagePricePerSquareMeter: avgM2Price,
    homesList: allHomesFormatted,
  };
  res.json(response);
};
