const Home = require('../models/homeModel');

exports.getAllHomes = async (req, res) => {
  const allHomes = await Home.find();
  const allHomesResponse = allHomes.map(obj)
  res.json(allHomesResponse);
};
