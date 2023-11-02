const { Plan } = require("../db");
const { Op } = require("sequelize");






  const fillPlan = async (plan) => {
    try {
      await plan.bulkCreate([
        {
            name: "Basico",
          },
          {
            name: "Premium",
            
          },
          {
            name: "Profesional",
          },
          
      ]);
    } catch (error) {
      console.log(error.message);
    }
  };


  module.exports = {
   fillPlan
   
  };