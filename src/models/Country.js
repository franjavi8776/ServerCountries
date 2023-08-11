const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Country",
    {
      id: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flags: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      continents: {
        type: DataTypes.STRING,
        AllowNull: false,
      },
      capital: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      subregion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      area: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      population: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
