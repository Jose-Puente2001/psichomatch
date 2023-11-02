const { Hour } = require("../db");


const gethours = async (req, res) =>{
    try {
        const hours = await Hour.findAll();
        res.status(200).json(hours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const fillHour = async (Hour) => {
  try {
    await Hour.bulkCreate([
      { hour: "00:00" },
      { hour: "01:00" },
      { hour: "02:00" },
      { hour: "03:00" },
      { hour: "04:00" },
      { hour: "05:00" },
      { hour: "06:00" },
      { hour: "07:00" },
      { hour: "08:00" },
      { hour: "09:00" },
      { hour: "10:00" },
      { hour: "11:00" },
      { hour: "12:00" },
      { hour: "13:00" },
      { hour: "14:00" },
      { hour: "15:00" },
      { hour: "16:00" },
      { hour: "17:00" },
      { hour: "18:00" },
      { hour: "19:00" },
      { hour: "20:00" },
      { hour: "21:00" },
      { hour: "22:00" },
      { hour: "23:00" },
      { hour: "24:00" },
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  fillHour,
  gethours
};
