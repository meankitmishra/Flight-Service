const { StatusCodes } = require("http-status-codes");

const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airportRepository = new AirportRepository();

async function createAirport(data) {
	try {
		const airport = await airportRepository.create(data);
		return airport;
	} catch (error) {
		if (error.name == "SequelizeValidationError") {
			let explanation = [];
			error.errors.forEach((err) => {
				explanation.push(err.message);
			});
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		throw new AppError(
			"Someting went wrong while creating airport",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function getAirports() {
	try {
		const airports = await airportRepository.getAll();
		return airports;
	} catch (error) {
		throw new AppError(
			"Someting went wrong while fetching the airports",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function getAirport(id) {
	try {
		const airport = await airportRepository.get(id);
		return airport;
	} catch (error) {
		if (error.statusCode == StatusCodes.NOT_FOUND) {
			throw new AppError("Not able to find the airport", error.statusCode);
		}
		throw new AppError(
			"Someting went wrong while fetching the airport",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function destroyAirport(id) {
	try {
		const airport = await airportRepository.destroy(id);
		return airport;
	} catch (error) {
		if (error.statusCode == StatusCodes.NOT_FOUND) {
			throw new AppError(
				"Not able to find the airport to delete",
				error.statusCode
			);
		}
		throw new AppError(
			"Someting went wrong while deleting the airport",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function updateAirport(id, data) {
	try {
		const airport = await airportRepository.update(id, data);
		return airport;
	} catch (error) {
		if (error.statusCode == StatusCodes.NOT_FOUND) {
			throw new AppError(
				"Not able to find the airport to update",
				error.statusCode
			);
		}
		throw new AppError(
			"Someting went wrong while fetching the airport to update",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

module.exports = {
	createAirport,
	getAirports,
	getAirport,
	destroyAirport,
	updateAirport,
};
