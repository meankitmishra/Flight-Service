const { StatusCodes } = require("http-status-codes");

const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data) {
	try {
		const city = await cityRepository.create(data);
		return city;
	} catch (error) {
		if (error.name == "SequelizeValidationError") {
			let explanation = [];
			error.errors.foreach((err) => {
				explanation.push(err.message);
			});
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		throw new AppError(
			"Something went wrong while creating the city",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function getCities() {
	try {
		const cities = await cityRepository.getAll();
		return cities;
	} catch (error) {
		throw new AppError(
			"Someting went wrong while fetching the cities",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function getCity(id) {
	try {
		const city = await cityRepository.get(id);
		return city;
	} catch (error) {
		// console.log(error);
		if (error.statusCode == StatusCodes.NOT_FOUND) {
			throw new AppError("Not able to find the city", error.statusCode);
		}
		throw new AppError(
			"Someting went wrong while fetching the city",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

module.exports = {
	createCity,
	getCities,
	getCity,
};
