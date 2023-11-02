const { Therapist, Rating, Patient } = require("../db");

const getRatingsByTherapistId = async (req, res) => {
  try {
    const { id } = req.params;
    const ratings = await Rating.findAll({
      where: {
        TherapistId: id,
      },
      include: [
        {
          model: Patient,
          attributes: ['id','name','lastName','email']
        },
      ],
    });

    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRatingsByTherapistIdWithPagination = async (req, res) => {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const perPage = 6;
        const offset = (page - 1) * perPage;
        const limit = perPage;
        const ratings = await Rating.findAll({
        where: {
          TherapistId: id,
        },
        include: [
          {
            model: Patient,
            attributes: ['id','name','lastName','email']
          },
        ],
      offset,
      limit,
      order: [["id", "ASC"]],
    });

    const rating2 = await Rating.findAll({
        where: {
          TherapistId: id,
        }
      });

    const actualPage = page || 1;

    const totalCount = await rating2.length;

    const totalPages = Math.ceil(totalCount / perPage);


    res.status(200).json({ ratings, totalPages, actualPage });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const InsertRating = async (req, res) => {
    try {
      const { TherapistId, comment, rating, PatientId } = req.body;
  
      const therapist = await Therapist.findByPk(TherapistId);
  
      const ratingCreated = await Rating.create({
        comment,
        rating,
        TherapistId,
        PatientId,
      });
      const ratings = await Rating.findAll({
        where: {
            TherapistId,
        },
      });
      let ratings_sum = 0.0;
      let rating_count = 0;
      ratings.forEach((x) => {
        console.log(x.rating);
        ratings_sum += Number(x.rating);
        rating_count++;

      });
      therapist.rating = Number(ratings_sum) / Number(rating_count);
      therapist.rating = therapist.rating.toFixed(2);
      await therapist.save();
  
      const response = await Rating.findByPk(ratingCreated.id, {
        include: [
          {
            model: Therapist,
            attributes: ["rating"],
          },
        ],
      });
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const fillRating = async (Rating) => {
    try {
      await Rating.bulkCreate([
        {
          comment:
            "Mi terapeuta es excepcionalmente comprensivo y me ha ayudado a superar desafíos emocionales difíciles.",
          rating: 4,
          TherapistId: 1,
          PatientId: 1,
        },
        {
          comment:
            "Siempre me siento escuchado y apoyado durante mis sesiones con mi terapeuta.",
          rating: 3,
          TherapistId: 1,
          PatientId: 2,
        },
        {
          comment:
            "La terapia con mi terapeuta me ha ayudado a ganar confianza y afrontar mis miedos.",
          rating: 4,
          TherapistId: 1,
          PatientId: 3,
        },
        {
          comment:
            "Mi terapeuta es muy profesional y me ha brindado herramientas valiosas para lidiar con el estrés.",
          rating: 4,
          TherapistId: 1,
          PatientId: 4,
        },
        {
          comment:
            "Estoy agradecido por el apoyo constante de mi terapeuta en mi viaje hacia el bienestar emocional.",
          rating: 4,
          TherapistId: 1,
          PatientId: 5,
        },
        {
          comment:
            "Mi terapeuta ha sido un faro de luz en tiempos oscuros. Su orientación ha sido invaluable.",
          rating: 5,
          TherapistId: 1,
          PatientId: 6,
        },
        {
          comment:
            "La terapia con mi terapeuta ha transformado mi vida. Estoy emocionado por el futuro.",
          rating: 1,
          TherapistId: 1,
          PatientId: 7,
        },
        {
          comment:
            "Mi terapeuta ha demostrado empatía y paciencia infinita. No podría pedir un terapeuta mejor.",
          rating: 2,
          TherapistId: 1,
          PatientId: 8,
        },
        {
          comment:
            "La terapia con mi terapeuta ha sido un viaje de autodescubrimiento. Ha sido una experiencia reveladora.",
          rating: 4,
          TherapistId: 1,
          PatientId: 9,
        },
        {
          comment:
            "Mi terapeuta ha proporcionado un espacio seguro donde puedo ser yo mismo y abordar mis preocupaciones.",
          rating: 4,
          TherapistId: 1,
          PatientId: 10,
        },
        {
          comment:
            "La terapia con mi terapeuta ha sido un proceso sanador y transformador. Estoy agradecido por su apoyo.",
          rating: 3,
          TherapistId: 2,
          PatientId: 11,
        },
        {
          comment:
            "Mi terapeuta es un guía excepcional en mi búsqueda de bienestar mental. Su apoyo es invaluable.",
          rating: 3,
          TherapistId: 2,
          PatientId: 12,
        },
      ]);
    } catch (error) {
      console.log(error.message);
    }
  };

  
  
  module.exports = {InsertRating, fillRating, getRatingsByTherapistId, getRatingsByTherapistIdWithPagination};


