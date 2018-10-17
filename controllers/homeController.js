const Home = require('../models/homeModel');
const { avgCalc, createFilter } = require('./helpers');

const homesPerPage = 20;
const pageNumber = 3;
const reqLatitude = 44.427967;
const reqLongitude = 8.849993;
const reqRadius = 10000;

exports.getAllHomes = async (req, res) => {
  const queryFilter = createFilter(req);
  const allHomes = await Home.find(queryFilter);
  const start = homesPerPage * (pageNumber - 1);
  const end = homesPerPage * pageNumber - 1;
  const responseHomes = allHomes.slice(start, end);
  const avgM2Price = avgCalc(allHomes);
  const allHomesFormatted = responseHomes.map((obj) => {
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
  const response = {
    centerLatitude: reqLatitude,
    centerLongitude: reqLongitude,
    radius: reqRadius,
    page: pageNumber,
    totalPages: Math.ceil(allHomes.length / homesPerPage),
    totalResults: allHomes.length,
    averagePricePerSquareMeter: avgM2Price,
    homesList: allHomesFormatted,
  };
  res.json(response);
};
