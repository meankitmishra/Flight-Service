const express = require("express");

const airplaneRoutes = require("./airplane-route");
const cityRoutes = require("./city-route");
const airportRoutes = require("./airport-route");
const flightRoutes = require("./flight-route");

const router = express.Router();

router.use("/airplanes", airplaneRoutes);

router.use("/cities", cityRoutes);

router.use("/airports", airportRoutes);

router.use("/flights", flightRoutes);

module.exports = router;
