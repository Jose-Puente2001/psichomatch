const { Category } = require("../db");
const { Op } = require("sequelize");


  const getCategories = async (req, res) =>{
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }




  const fillCategory = async (category) => {
    try {
      await category.bulkCreate([
        {
            name: "Terapia psicoanalítica",
          },
          {
            name: "Terapia cognitivo-conductual",
            
          },
          {
            name: "Terapia sistémica breve",
          },
          {
            name: "Terapia cognitiva",
          },
          {
            name: "Counseling",
          },
          {
            name: "Terapia neuropsicológica",
          },
          {
            name: "Arte y musicoterapia",
          },
      ]);
    } catch (error) {
      console.log(error.message);
    }
  };


  module.exports = {
   fillCategory,
   getCategories
   
  };