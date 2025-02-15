"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Flight extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Airplane, {
				foreignKey: "airplaneId",
				onDelete: "CASCADE",
			});

			this.belongsTo(models.Airport, {
				foreignKey: "departureAirportId",
				onDelete: "CASCADE",
			});

			this.belongsTo(models.Airport, {
				foreignKey: "arrivalAirportId",
				onDelete: "CASCADE",
			});
		}
	}
	Flight.init(
		{
			flightNumber: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			airplaneId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			departureAirportId: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			arrivalAirportId: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			departureTime: {
				type: DataTypes.DATE,
				defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
				allowNull: false,
			},
			arrivalTime: {
				type: DataTypes.DATE,
				defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
				allowNull: false,
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			boardingGate: { type: DataTypes.STRING },
			totalSeats: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Flight",
		}
	);
	return Flight;
};
