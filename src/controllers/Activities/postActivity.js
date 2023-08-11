const { Activity, Country, Country_Activity } = require("../../db.js");

const postActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  try {
    const [newActivity] = await Activity.findOrCreate({
      where: { name, difficulty, duration, season },
    });

    // Si countries es un array, es decir, hay múltiples países seleccionados
    if (Array.isArray(countries)) {
      for (const countryId of countries) {
        const country = await Country.findByPk(countryId);
        if (country) {
          await Country_Activity.create({
            CountryId: country.id,
            ActivityId: newActivity.id,
          });
        }
      }
    } else if (typeof countries === "string") {
      // Si countries es una cadena, es decir, solo hay un país seleccionado
      const country = await Country.findByPk(countries);
      if (country) {
        await Country_Activity.create({
          CountryId: country.id,

          ActivityId: newActivity.id,
        });
      }
    }

    return res.status(200).json(newActivity);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = postActivity;
