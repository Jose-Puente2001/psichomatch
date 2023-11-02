const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Therapist",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      price: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      adress: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,

      },

      rating:{
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },

      linkedIn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },


      PlanId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
      },


      // Fundamentales
      email:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },

      password:{
        type: DataTypes.STRING,
        allowNull: true,
      },

      role: {
        type: DataTypes.STRING,
        defaultValue: "therapist"
      }
      
    },
    {
      timestamps: false,
    }
  );
};
