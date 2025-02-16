const { StatusCodes } = require("http-status-codes");

const { FlightRepository } = require("../repositories");

const { Op } = require("sequelize");

const AppError = require("../utils/errors/app-error");

const flightRepository = new FlightRepository();

async function createFlight(data) {
	try {
		const flight = await flightRepository.create(data);
		return flight;
	} catch (error) {
		if (error.name == "SequelizeValidationError") {
			let explanation = [];
			error.errors.forEach((err) => {
				explanation.push(err.message);
			});
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		throw new AppError(
			"Someting went wrong while creating flight",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function getAllFlights(query) {
	let customFilter = {};
	const endingTripTime = "23:59:59";
	let sortFilter = [];
	// trips = MUM-DEL
	if (query.trips) {
		[departureAirportId, arrivalAirportId] = query.trips.split("-");
		customFilter.departureAirportId = departureAirportId;
		customFilter.arrivalAirportId = arrivalAirportId;
	}
	if (query.price) {
		[minPrice, maxPrice] = query.price.split("-");
		customFilter.price = {
			[Op.between]: [minPrice, maxPrice == undefined ? 30000 : maxPrice],
		};
	}
	if (query.travellers) {
		customFilter.totalSeats = {
			[Op.gte]: query.travellers,
		};
	}
	if (query.tripDate) {
		customFilter.departureTime = {
			[Op.between]: [query.tripDate, query.tripDate + endingTripTime],
		};
	}
	if (query.sort) {
		const params = query.sort.split(",");
		const sortFilters = params.map((param) => param.split("_"));
		sortFilter = sortFilters;
	}

	try {
		const flights = await flightRepository.getAllFlights(
			customFilter,
			sortFilter
		);
		return flights;
	} catch (error) {
		throw new AppError(
			"Someting went wrong while fetching the flights",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

module.exports = {
	createFlight,
	getAllFlights,
};
