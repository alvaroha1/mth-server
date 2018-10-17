const Home = require('../models/homeModel');
const { avgCalc, createFilter } = require('./helpers');

const homesPerPage = 20;

exports.getAllHomes = async (req, res) => {
  const allHomes = await Home.find(createFilter(req));
  const centerLatitude = parseFloat(req.query.centerLatitude, 10);
  const centerLongitude = parseFloat(req.query.centerLongitude, 10);
  const radius = parseInt(req.query.radius, 10);
  const totalPages = Math.ceil(allHomes.length / homesPerPage);
  const page = parseInt(req.query.page, 10);
  const pageNumber = (page > 0 && page <= totalPages) ? page : 1;
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
    centerLatitude,
    centerLongitude,
    radius,
    page: pageNumber,
    totalPages,
    totalResults: allHomes.length,
    averagePricePerSquareMeter: avgM2Price,
    homesList: allHomesFormatted,
  };
  res.json(response);
};
