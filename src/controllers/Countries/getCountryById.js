const { Country, Activity } = require("../../db.js");
const { Op } = require("sequelize");

const getCountryById = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findOne({
      where: {
        id: {
          [Op.iLike]: id,
        },
      },
      include: Activity,
    });

    if (!country) {
      return res.status(404).send("Country not found");
    }

    return res.status(200).json(country);
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports = getCountryById;
