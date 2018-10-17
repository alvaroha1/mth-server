const Home = require('../models/homeModel');
const {
  avgCalc,
  createFilter,
  formatHomes,
  processQuery,
} = require('./helpers');

const homesPerPage = 20;

exports.getAllHomes = async (req, res) => {
  const queryObj = processQuery(req.query);
  const allHomes = await Home.find(createFilter(queryObj));
  const totalPages = Math.ceil(allHomes.length / homesPerPage);
  const page = (queryObj.page > 0 && queryObj.page <= totalPages) ? queryObj.page : 1;
  const responseHomes = allHomes.slice(homesPerPage * (page - 1), homesPerPage * page - 1);
  const response = {
    centerLatitude: queryObj.centerLatitude,
    centerLongitude: queryObj.centerLongitude,
    radius: queryObj.radius,
    page,
    totalPages,
    totalResults: allHomes.length,
    averagePricePerSquareMeter: avgCalc(allHomes),
    homesList: formatHomes(responseHomes),
  };
  res.json(response);
};
