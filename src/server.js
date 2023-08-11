const express = require("express");
const countriesRoutes = require("./routes/Countries/countries.routes");
const activitiesRoutes = require("./routes/Activities/activities.routes");
const loginRoutes = require("./routes/Login/login.routes");

const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use("/countries", countriesRoutes);
server.use("/activities", activitiesRoutes);
server.use(loginRoutes);

module.exports = server;
