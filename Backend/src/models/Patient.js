const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Patient",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "name"

      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "lastName"

      },

      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "patient"

      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },

      password:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      session:{
        type: DataTypes.STRING,
        allowNull: true,
      },

      role: {
        type: DataTypes.STRING,
        defaultValue: "patient"
      }
    },
    {
      timestamps: false,
    }
  );
};
