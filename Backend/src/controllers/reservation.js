const {
  Reservation,
  Availability,
  Hour,
  Patient,
  Therapist,
} = require("../db");
const { Op } = require("sequelize");



// Email Notification
const {
  addReservationTerapist,
  addReservationPatient
} = require("../middlewares/nodeMailer");

const addReservation = async (req, res) => {
  const { AvailabilityId, PatientId, TherapistId } = req.body;
  try {
    const availability = await Availability.findByPk(AvailabilityId);

    if (!availability.status) {
      const reservation = await Reservation.create({
        AvailabilityId,
        PatientId,
        TherapistId,
      });
      await availability.update({ status: true });

      const patientExist = await Patient.findOne({
        where: {
          id: PatientId,
        },
      });
      const therapistExist = await Patient.findOne({
        where: {
          id: TherapistId,
        },
      });

      const SelectedHour = await Hour.findOne({
        where: {
          id: availability.HourId,
        },
      });

      const patientEmail = patientExist.email
      const patientName = patientExist.name
      const therapistEmail = therapistExist.email
      const therapistName = therapistExist.name
      //Emails
      addReservationTerapist(SelectedHour,availability, patientEmail,patientName,therapistEmail,therapistName)
      addReservationPatient(SelectedHour,availability, patientEmail,patientName,therapistEmail,therapistName)

      res.status(200).json(reservation);
    } else {
      res.status(400).json(false);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReservationByTherapistId = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findAll({
      where: { TherapistId: id },
      include: [
        {
          model: Availability,
          include: Hour,
        },
        { model: Patient },
      ],
    });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReservationByPatientId = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findAll({
      where: { PatientId: id },
      include: [
        {
          model: Availability,
          include: Hour,
        },
        { model: Therapist },
      ],
    });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findOne({
      where: { id },
    });

    if (reservation) {
      const reservation2 = await Reservation.destroy({
        where: { id },
      });

      const availability = await Availability.findOne({
        where: { id: reservation.AvailabilityId },
      });

      await availability.update({ status: false });

      res.status(200).json(reservation2);
    } else {
      res.status(400).json("Not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addReservation,
  getReservationByTherapistId,
  getReservationByPatientId,
  deleteReservation,
};
