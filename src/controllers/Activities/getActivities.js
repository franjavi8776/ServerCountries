const { Activity, Country } = require("../../db.js");

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: Country,
    });
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getActivities;
