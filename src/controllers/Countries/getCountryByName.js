const { Country } = require("../../db.js");
const { Op } = require("sequelize");

const getCountryByName = async (req, res) => {
  const { name } = req.query;
  try {
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    if (!countries.length) {
      return res.status(404).send("Countries not found");
    }
    return res.status(200).json(countries);
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports = getCountryByName;
