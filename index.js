require("dotenv").config();
// const axios = require("axios");
const server = require("./src/server");
const { conn, Country } = require("./src/db.js");

const { PORT, API_URL } = process.env;

// const saveCountriesToDatabase = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     const countriesData = response.data;

//     const countriesToSave = countriesData.map((country) => ({
//       id: country.cca3,
//       name: country.name.common,
//       flags: country.flags,
//       continents: country.region,
//       capital: country.capital,
//       subregion: country.subregion,
//       area: country.area,
//       population: country.population,
//     }));

//     await Country.bulkCreate(countriesToSave);
//     console.log("Countries saved to database");
//   } catch (error) {
//     console.log("Error to save Countries", error);
//   }
// };

conn
  .sync({ force: false })
  .then(() => {
    server.listen(PORT, async () => {
      // await saveCountriesToDatabase();
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
