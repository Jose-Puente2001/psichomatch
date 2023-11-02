const { Availability, Hour } = require("../db");
const { Op } = require("sequelize");

const getAvailabilityByTherapistId = async (req, res) => {
  try {
    const { id } = req.params;
    const availability = await Availability.findAll({
      where: { TherapistId: id },
    });
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAvailabilityByTherapistIdAndDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;
    const availability = await Availability.findAll({
      where: { TherapistId: id, date },
      include: [{ model: Hour, attributes: ["hour"] }],
      order: [
        ["HourId", "ASC"] // Order by HourId in ascending order
      ]
    });
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAvailabilityHourByTherapistIDByDateBy = async (req, res) => {
  try {
    const { TherapistId, date, HourId } = req.body;
    const availability = await Availability.findOne({
      where: { TherapistId, date, HourId },
    });

    if (availability) res.status(200).json(true);
    else res.status(200).json(false);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const get4AvailabilityByTherapistIdAndDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;

    const nextDate = (num, date) => {
      const fechaSiguiente = new Date(date);
      fechaSiguiente.setDate(fechaSiguiente.getDate() + num);
      const fechaSolo = new Date(
        fechaSiguiente.getFullYear(),
        fechaSiguiente.getMonth(),
        fechaSiguiente.getDate()
      );
      return fechaSolo;
    };

    const availabilityPromises = [0, 1, 2, 3].map(async (x) => {
      return await Availability.findAll({
        where: { TherapistId: id, date: nextDate(x, date) },
        include: [{ model: Hour, attributes: ["hour"] }],
      });
    });

    const availability = await Promise.all(availabilityPromises);
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const insertAvailability = async (req, res) => {
  try {
    const { date, TherapistId, HourId } = req.body;
    const availability = await Availability.create({
      date,
      TherapistId,
      HourId,
    });
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteAvailability = async (req, res) => {
  try {
    const { date, TherapistId, HourId } = req.query;
    const availability = await Availability.destroy({

      where:{date, TherapistId, HourId}
      
    });
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const fillAvailability = async (Availability) => {
  try {
    await Availability.bulkCreate([
      {
        TherapistId: 1,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 1,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },

      {
        TherapistId: 1,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 1,
        HourId: 7,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 1,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 1,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },

      {
        TherapistId: 1,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 1,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },

      {
        TherapistId: 1,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },

      {
        TherapistId: 1,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 1,
        HourId: 8,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 1,
        HourId: 8,
        date: new Date(2023, 10 - 1, 25),
      },

      {
        TherapistId: 1,
        HourId: 5,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 1,
        HourId: 2,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 1,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 1,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },

      {
        TherapistId: 1,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 1,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },

      {
        TherapistId: 1,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },

      {
        TherapistId: 1,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },

      {
        TherapistId: 2,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 2,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },

      {
        TherapistId: 2,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 2,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 2,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 2,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },

      {
        TherapistId: 2,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 2,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },

      {
        TherapistId: 2,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },

      {
        TherapistId: 3,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 3,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 3,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 3,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 3,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 3,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 3,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 3,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 3,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 3,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 3,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },

      {
        TherapistId: 3,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },

      {
        TherapistId: 3,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },

      {
        TherapistId: 3,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },

      {
        TherapistId: 3,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },

      {
        TherapistId: 3,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },

      {
        TherapistId: 3,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },

      {
        TherapistId: 3,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },

      {
        TherapistId: 3,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },

      {
        TherapistId: 3,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },

      {
        TherapistId: 3,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },

      {
        TherapistId: 3,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },

      {
        TherapistId: 3,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },

      {
        TherapistId: 3,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },

      {
        TherapistId: 3,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },

      {
        TherapistId: 3,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },

      {
        TherapistId: 3,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },

      {
        TherapistId: 3,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },

      {
        TherapistId: 3,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },

      {
        TherapistId: 3,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },

      {
        TherapistId: 3,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },

      {
        TherapistId: 3,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },

      {
        TherapistId: 3,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },

      {
        TherapistId: 3,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },

      {
        TherapistId: 3,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },

      {
        TherapistId: 3,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },

      {
        TherapistId: 3,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },

      {
        TherapistId: 3,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },

      {
        TherapistId: 3,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },

      {
        TherapistId: 3,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },

      {
        TherapistId: 3,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },

      {
        TherapistId: 3,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },

      {
        TherapistId: 3,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },

      {
        TherapistId: 3,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },

      {
        TherapistId: 3,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },

      {
        TherapistId: 4,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 4,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 4,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 4,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 4,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 4,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 4,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 4,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 4,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 4,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 4,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 4,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 4,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 4,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 4,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 4,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 4,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 4,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 4,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 4,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 4,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 4,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 4,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 4,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 4,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 4,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 4,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 4,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 4,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 4,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 4,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 4,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 4,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 4,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 4,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 4,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 4,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 4,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 4,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 4,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 4,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 4,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 4,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 4,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 4,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },

      {
        TherapistId: 5,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 5,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 5,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 5,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 5,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 5,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 5,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 5,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 5,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 5,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 5,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 5,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 5,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 5,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 5,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 5,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 5,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 5,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 5,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 5,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 5,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 5,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 5,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 5,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 5,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 5,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 5,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 5,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 5,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 5,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 5,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 5,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 5,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 5,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 5,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 5,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 5,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 5,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 5,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 5,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 5,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 5,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 5,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 5,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 5,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },

      {
        TherapistId: 6,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 6,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 6,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 6,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 6,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 6,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 6,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 6,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 6,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 6,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 6,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 6,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 6,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 6,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 6,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 6,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 6,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 6,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 6,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 6,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 6,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 6,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 6,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 6,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 6,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 6,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 6,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 6,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 6,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 6,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 6,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 6,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 6,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 6,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 6,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 6,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 6,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 6,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 6,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 6,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 6,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 6,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 6,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 6,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 6,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 7,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 7,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 7,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 7,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 7,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 7,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 7,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 7,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 7,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 7,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 7,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 7,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 7,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 7,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 7,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 7,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 7,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 7,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 7,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 7,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 7,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 7,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 7,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 7,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 7,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 7,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 7,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 7,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 7,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 7,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 7,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 7,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 7,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 7,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 7,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 7,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 7,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 7,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 7,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 7,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 7,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 7,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 7,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 7,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 7,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 8,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 8,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 8,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 8,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 8,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 8,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 8,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 8,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 8,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 8,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 8,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 8,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 8,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 8,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 8,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 8,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 8,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 8,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 8,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 8,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 8,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 8,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 8,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 8,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 8,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 8,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 8,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 8,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 8,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 8,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 8,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 8,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 8,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 8,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 8,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 8,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 8,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 8,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 8,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 8,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 8,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 8,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 8,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 8,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 8,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 9,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 9,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 9,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 9,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 9,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 9,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 9,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 9,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 9,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 9,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 9,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 9,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 9,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 9,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 9,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 9,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 9,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 9,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 9,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 9,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 9,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 9,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 9,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 9,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 9,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 9,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 9,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 9,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 9,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 9,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 9,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 9,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 9,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 9,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 9,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 9,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 9,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 9,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 9,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 9,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 9,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 9,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 9,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 9,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 9,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 10,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 10,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 10,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 10,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 10,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 10,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 10,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 10,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 10,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 10,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 10,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 10,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 10,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 10,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 10,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 10,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 10,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 10,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 10,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 10,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 10,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 10,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 10,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 10,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 10,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 10,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 10,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 10,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 10,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 10,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 10,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 10,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 10,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 10,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 10,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 10,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 10,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 10,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 10,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 10,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 10,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 10,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 10,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 10,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 10,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 11,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 11,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 11,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 11,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 11,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 11,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 11,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 11,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 11,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 11,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 11,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 11,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 11,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 11,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 11,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 11,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 11,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 11,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 11,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 11,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 11,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 11,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 11,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 11,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 11,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 11,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 11,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 11,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 11,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 11,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 11,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 11,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 11,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 11,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 11,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 11,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 11,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 11,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 11,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 11,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 11,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 11,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 11,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 11,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 11,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 12,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 12,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 12,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 12,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 12,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 12,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 12,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 12,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 12,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 12,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 12,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 12,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 12,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 12,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 12,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 12,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 12,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 12,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 12,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 12,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 12,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 12,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 12,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 12,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 12,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 12,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 12,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 12,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 12,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 12,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 12,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 12,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 12,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 12,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 12,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 12,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 12,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 12,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 12,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 12,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 12,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 12,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 12,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 12,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 12,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 13,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 13,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 13,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 13,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 13,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 13,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 13,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 13,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 13,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 13,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 13,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 13,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 13,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 13,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 13,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 13,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 13,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 13,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 13,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 13,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 13,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 13,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 13,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 13,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 13,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 13,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 13,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 13,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 13,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 13,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 13,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 13,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 13,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 13,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 13,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 13,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 13,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 13,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 13,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 13,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 13,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 13,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 13,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 13,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 13,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 14,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 14,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 14,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 14,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 14,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 14,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 14,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 14,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 14,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 14,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 14,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 14,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 14,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 14,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 14,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 14,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 14,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 14,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 14,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 14,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 14,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 14,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 14,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 14,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 14,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 14,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 14,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 14,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 14,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 14,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 14,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 14,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 14,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 14,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 14,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 14,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 14,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 14,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 14,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 14,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 14,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 14,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 14,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 14,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 14,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 15,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 15,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 15,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 15,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 15,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 15,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 15,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 15,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 15,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 15,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 15,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 15,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 15,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 15,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 15,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 15,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 15,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 15,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 15,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 15,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 15,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 15,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 15,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 15,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 15,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 15,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 15,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 15,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 15,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 15,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 15,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 15,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 15,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 15,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 15,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 15,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 15,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 15,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 15,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 15,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 15,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 15,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 15,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 15,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 15,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 16,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 16,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 16,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 16,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 16,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 16,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 16,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 16,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 16,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 16,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 16,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 16,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 16,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 16,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 16,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 16,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 16,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 16,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 16,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 16,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 16,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 16,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 16,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 16,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 16,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 16,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 16,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 16,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 16,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 16,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 16,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 16,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 16,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 16,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 16,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 16,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 16,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 16,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 16,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 16,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 16,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 16,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 16,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 16,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 16,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 17,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 17,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 17,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 17,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 17,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 17,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 17,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 17,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 17,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 17,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 17,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 17,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 17,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 17,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 17,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 17,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 17,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 17,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 17,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 17,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 17,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 17,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 17,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 17,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 17,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 17,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 17,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 17,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 17,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 17,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 17,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 17,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 17,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 17,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 17,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 17,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 17,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 17,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 17,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 17,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 17,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 17,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 17,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 17,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 17,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 18,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 18,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 18,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 18,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 18,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 18,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 18,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 18,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 18,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 18,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 18,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 18,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 18,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 18,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 18,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 18,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 18,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 18,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 18,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 18,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 18,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 18,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 18,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 18,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 18,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 18,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 18,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 18,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 18,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 18,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 18,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 18,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 18,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 18,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 18,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 18,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 18,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 18,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 18,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 18,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 18,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 18,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 18,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 18,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 18,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 19,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 19,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 19,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 19,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 19,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 19,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 19,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 19,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 19,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 19,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 19,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 19,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 19,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 19,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 19,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 19,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 19,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 19,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 19,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 19,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 19,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 19,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 19,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 19,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 19,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 19,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 19,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 19,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 19,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 19,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 19,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 19,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 19,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 19,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 19,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 19,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 19,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 19,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 19,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 19,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 19,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 19,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 19,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 19,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 19,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },

      {
        TherapistId: 20,
        HourId: 12,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 20,
        HourId: 1,
        date: new Date(2023, 10 - 1, 24),
      },
      {
        TherapistId: 20,
        HourId: 2,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 20,
        HourId: 4,
        date: new Date(2023, 10 - 1, 25),
      },
      {
        TherapistId: 20,
        HourId: 1,
        date: new Date(2023, 10 - 1, 26),
      },
      {
        TherapistId: 20,
        HourId: 1,
        date: new Date(2023, 10 - 1, 27),
      },
      {
        TherapistId: 20,
        HourId: 1,
        date: new Date(2023, 10 - 1, 28),
      },
      {
        TherapistId: 20,
        HourId: 20,
        date: new Date(2023, 10 - 1, 29),
      },
      {
        TherapistId: 20,
        HourId: 18,
        date: new Date(2023, 10 - 1, 30),
      },
      {
        TherapistId: 20,
        HourId: 17,
        date: new Date(2023, 10 - 1, 31),
      },
      {
        TherapistId: 20,
        HourId: 4,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 20,
        HourId: 5,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 20,
        HourId: 6,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 20,
        HourId: 7,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 20,
        HourId: 8,
        date: new Date(2023, 11 - 1, 1),
      },
      {
        TherapistId: 20,
        HourId: 4,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 20,
        HourId: 5,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 20,
        HourId: 6,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 20,
        HourId: 7,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 20,
        HourId: 8,
        date: new Date(2023, 11 - 1, 2),
      },
      {
        TherapistId: 20,
        HourId: 4,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 20,
        HourId: 5,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 20,
        HourId: 6,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 20,
        HourId: 7,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 20,
        HourId: 8,
        date: new Date(2023, 11 - 1, 3),
      },
      {
        TherapistId: 20,
        HourId: 4,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 20,
        HourId: 5,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 20,
        HourId: 6,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 20,
        HourId: 7,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 20,
        HourId: 8,
        date: new Date(2023, 11 - 1, 4),
      },
      {
        TherapistId: 20,
        HourId: 4,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 20,
        HourId: 5,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 20,
        HourId: 6,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 20,
        HourId: 7,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 20,
        HourId: 8,
        date: new Date(2023, 11 - 1, 5),
      },
      {
        TherapistId: 20,
        HourId: 4,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 20,
        HourId: 5,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 20,
        HourId: 6,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 20,
        HourId: 7,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 20,
        HourId: 8,
        date: new Date(2023, 11 - 1, 6),
      },
      {
        TherapistId: 20,
        HourId: 4,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 20,
        HourId: 5,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 20,
        HourId: 6,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 20,
        HourId: 7,
        date: new Date(2023, 11 - 1, 7),
      },
      {
        TherapistId: 20,
        HourId: 8,
        date: new Date(2023, 11 - 1, 7),
      },
    ]);
  } catch (error) {
    console.log({ error: error.message });
  }
};

module.exports = {
  getAvailabilityByTherapistId,
  insertAvailability,
  getAvailabilityByTherapistIdAndDate,
  fillAvailability,
  get4AvailabilityByTherapistIdAndDate,
  getAvailabilityHourByTherapistIDByDateBy,
  deleteAvailability
};

  
    
    
      