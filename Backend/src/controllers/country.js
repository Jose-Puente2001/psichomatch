const { Country } = require("../db");
const { Op } = require("sequelize");


  const getCountries = async (req, res) =>{
    try {
      const countries = await Country.findAll();
      res.status(200).json(countries);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }




  const fillCountry = async (country) => {
    try {
      await country.bulkCreate([
        { name: "Argentina" },
        { name: "Bolivia" },
        { name: "Chile" },
        { name: "Colombia" },
        { name: "Costa Rica" },
        { name: "Cuba" },
        { name: "República Dominicana" },
        { name: "Ecuador" },
        { name: "El Salvador" },
        { name: "España" },
        { name: "Guatemala" },
        { name: "Honduras" },
        { name: "México" },
        { name: "Nicaragua" },
        { name: "Panamá" },
        { name: "Paraguay" },
        { name: "Perú" },
        { name: "Puerto Rico" },
        { name: "Uruguay" },
        { name: "Venezuela" }
      ]);
    } catch (error) {
      console.log(error.message);
    }
  };


  module.exports = {
   fillCountry,
   getCountries
   
  };