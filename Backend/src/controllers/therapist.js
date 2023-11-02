const { Therapist, Category, Country } = require("../db");
const { fillTherapistData } = require("../common/filledDates");
const { Op , fn, where,col} = require("sequelize");
const bcrypt = require("bcryptjs");
const  {tokenSign}  = require('../helpers/generateToken')
// Functions for therapist CRUD


const getTherapists = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;
    const offset = (page - 1) * perPage;
    const limit = perPage;
    const therapists = await Therapist.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
  
        },
      {
        model:Country
      }
      ],
      offset,
      limit,
      order: [["id", "ASC"]],
    });

    const actualPage = page || 1;

    const totalCount = await Therapist.count();

    const totalPages = Math.ceil(totalCount / perPage);
    res.status(200).json({ therapists, totalPages, actualPage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const filterTherapistByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;

    if(!id) return res.status(400).json({ error: "Missing fields" });

    const page = parseInt(req.query.page) || 1;
    const perPage = 6;
    const offset = (page - 1) * perPage;
    const limit = perPage;

    const therapists = await Therapist.findAll({
      where:{CategoryId: id},
      include: [
        {
          model: Category,
          attributes: ["name"],
  
        },],
      offset,
      limit,
      order: [["id", "ASC"]],
    });

    if (!therapists)
      return res.status(404).json({ error: "Therapist not found" });

else{
 

    const actualPage = page || 1;

    const totalCount =  therapists.length;

    const totalPages = Math.ceil(totalCount / perPage);
    res.status(200).json({ therapists, totalPages, actualPage });
}
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const filterTherapists = async(req, res)=>{
  const{CountryId, CategoryId} = req.query;

  const page = parseInt(req.query.page) || 1;
  const perPage = 6;
  const offset = (page - 1) * perPage;
  const limit = perPage;

  if(CountryId && CategoryId){
  try {

    const therapists = await Therapist.findAll({
      where:{CategoryId: Number(CategoryId), CountryId: Number(CountryId)},

      include: [
        {
          model: Category,
          attributes: ["name"],
  
        },
        {
          model: Country
        }
      ],
      offset,
      limit,
      order: [["id", "ASC"]],
    });
    const actualPage = page || 1;
    const therapists2 = await Therapist.findAll({
      where:{CategoryId: Number(CategoryId), CountryId: Number(CountryId)}})


    const totalCount =  therapists2.length;

    const totalPages = Math.ceil(totalCount / perPage);

    res.status(200).json({ therapists, totalPages, actualPage });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  }else if(CategoryId){
    try {

      const therapists = await Therapist.findAll({
        where:{CategoryId: Number(CategoryId)},
  
        include: [
          {
            model: Category,
            attributes: ["name"],
    
          },
          {
            model: Country
          }
        ],
        offset,
        limit,
        order: [["id", "ASC"]],
      });
     const actualPage = page || 1;

     const therapists2 = await Therapist.findAll({
      where:{CategoryId: Number(CategoryId)}})


    const totalCount =  therapists2.length;
      
    const totalPages = Math.ceil(totalCount / perPage);
    console.log(totalCount +" " + perPage+ " " + totalPages)
      res.status(200).json({ therapists, totalPages, actualPage });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }


  }else if(CountryId){
    try {

      const therapists = await Therapist.findAll({
        where:{CountryId: Number(CountryId)},
  
        include: [
          {
            model: Category,
            attributes: ["name"],
    
          },
          {
            model: Country
          }
        ],
        offset,
        limit,
        order: [["id", "ASC"]],
      });
      const actualPage = page || 1;
  
      const therapists2 = await Therapist.findAll({
        where:{CountryId: Number(CountryId)}})
  
  
      const totalCount =  therapists2.length;
  
      const totalPages = Math.ceil(totalCount / perPage);
  
      res.status(200).json({ therapists, totalPages, actualPage });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

const logInTherapist = async (req, res) => {
  try {
    const { email, password } = req.body;
    const therapistExist = await Therapist.findOne({
      where: { email },
    });

    if (therapistExist) {
      const ValidatePassword = await bcrypt.compareSync(
        password,
        therapistExist.password
      );

      const tokenSession = await tokenSign(therapistExist) //Token

      if (ValidatePassword){
        res.status(200).json({
          data:therapistExist,
          tokenSession
        })
      }else if(!ValidatePassword){
        if(password === therapistExist.password){
          res.status(200).json({
            data:therapistExist,
            tokenSession
          })
        }
      }
      
      else{
        res.status(400).send("Wrong Password")
      }
      
    } else {
      res.status(400).json(false);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createTherapist = async (req, res) => {
  try {
    const {
      name,
      lastName,
      adress,
      price,
      phone,
      image,
      description,
      email,
      password,
      CategoryId,
      CountryId,
      PlanId,
      linkedIn,
    } = req.body;


    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(password, salt);
   
    const therapist = await Therapist.create({
      name,
      lastName,
      adress,
      price,
      phone,
      image,
      description,
      email,
      password: encryptPassword,
      CategoryId,
      CountryId,
      PlanId,
      linkedIn

    });
    res.status(200).json(therapist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const updateTherapist = async (req, res) => {
  try {
    const {
      id,
      name,
      lastName,
      adress,
      price,
      phone,
      image,
      description,
      email,
      CategoryId,
      CountryId,
      PlanId,
      linkedIn,
    } = req.body;

    const therapist = await Therapist.findByPk(id)
   
    const therapist2 = await therapist.update({
      name,
      lastName,
      adress,
      price,
      phone,
      image,
      description,
      email,
      CategoryId,
      CountryId,
      PlanId,
      linkedIn

    });
    res.status(200).json(therapist2);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addInfoTherapist = async (req, res) => {
  try {
    const { id } = req.params;
    const { phone, image, description } = req.body;
    console.log("id", id);

    if (!id || !phone || !image || !description)
      return res.status(400).json({ error: "Missing fields" });

    const therapist = await Therapist.findByPk(id);

    if (!therapist)
      return res.status(404).json({ error: "Therapist not found" });

    await therapist.update({
      phone: phone,
      image: image,
      description: description,
    });

    res.status(202).json({ message: "Therapist updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDescriptionTherapist = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const therapist = await Therapist.findByPk(id);

    if (!therapist)
      return res.status(404).json({ error: "Therapist not found" });

    await therapist.update({
      description: description,
    });

    res.status(202).json({ message: "Description of therapist updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateImgTherapist = async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    if (!id || !image) return res.status(400).json({ error: "Missing fields" });

    const therapist = await Therapist.findByPk(id);

    if (!therapist)
      return res.status(404).json({ error: "Therapist not found" });

    // const updatedTherapist = await therapist.update({
    //     image: image
    // });
    // Ver como funciona el cambio de img con servicios como con cloudinary

    res.status(202).json({ message: "Image of therapist updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar Precios de Terapia -> (Hora)
const updateTherapistPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    if (!price || !id) return res.status(400).json({ error: "Missing fields" });
    if (price < 0) return res.status(406).json({ error: "Price must be > 0" });

    const therapist = await Therapist.findByPk(id);

    if (!therapist)
      return res.status(404).json({ error: "Therapist not found" });

    await therapist.update({
      price: price,
    });

    res.status(202).json({ message: "Price of therapist updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTherapistPriceByPorcent = async (req, res) => {
  try {
    const { id } = req.params;
    const { porcent } = req.body;

    if (!porcent || !id)
      return res.status(400).json({ error: "Missing fields" });
    if (porcent < 0 || porcent > 100)
      return res
        .status(406)
        .json({ error: "Porcent must be between 0 and 100" });
    const therapist = await Therapist.findByPk(id);

    if (!therapist)
      return res.status(404).json({ error: "Therapist not found" });

    const price = Number(therapist.price);
    const newPrice = Number(price) + (Number(price) * Number(porcent) / 100);

    await therapist.update({
      price: newPrice.toFixed(2),
    });

    res
      .status(202)
      .json({ message: `Price of therapist updated in ${porcent}%` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTherapist = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing fields" });

    const therapist = await Therapist.findByPk(id);

    if (!therapist)
      return res.status(404).json({ error: "Therapist not found" });

    await therapist.destroy();


    res.status(204).json({ message: "Therapist deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Aditional functions for therapist
const switchTherapistState = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Missing fields" });

    const therapist = await Therapist.findByPk(id);

    if (!therapist)
      return res.status(404).json({ error: "Therapist not found" });

    await therapist.update({
      isActive: !therapist.isActive,
    });

    res.status(202).json({ message: "Therapist state updated"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTherapistById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que se proporciona un ID válido
    if (!id) {
      return res.status(400).json({ error: "Missing therapist ID" });
    }

    // Buscar al terapeuta por su ID
    const therapist = await Therapist.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
        {
          model: Country,
        },
      ],
    });

    // Verificar si se encontró al terapeuta
    if (!therapist) {
      return res.status(404).json({ error: "Therapist not found" });
    }

    // Si todo está bien, enviar el terapeuta como respuesta
    res.status(200).json(therapist);
  } catch (error) {
    // Manejar errores internos del servidor de manera adecuada
    res.status(500).json({ error: "Internal server error" });
  }
};

// Search functions for therapist

const searchByNameLastName = async (req, res) => {
  try {
    const { search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;
    const offset = (page - 1) * perPage;

  

    const therapists = await Therapist.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
  
        },
      {
        model:Country
      }],
      where: {
        [Op.or]: [
          where(fn('LOWER', col('Therapist.name')), {
            [Op.iLike]: `%${search.toLowerCase()}%`,
          }),
          where(fn('LOWER', col('Therapist.lastName')), {
            [Op.iLike]: `%${search.toLowerCase()}%`,
          }),
        ],
      },
      offset,
      limit: perPage,
    });

    const therapists2 = await Therapist.findAll({
      where: {
        [Op.or]: [
          where(fn('LOWER', col('Therapist.name')), {
            [Op.iLike]: `%${search.toLowerCase()}%`,
          }),
          where(fn('LOWER', col('Therapist.lastName')), {
            [Op.iLike]: `%${search.toLowerCase()}%`,
          }),
        ],
      },
    });


    const actualPage = page || 1;
    const totalCount = therapists2.length;
    const totalPages = Math.ceil(totalCount / perPage);

    res.status(200).json({ therapists, totalPages, actualPage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const searchByPrice = async (req, res) => {
  const { price } = req.params;
  const page = parseInt(req.query.page) || 1;
  const perPage = 2;
  const offset = (page - 1) * perPage;

  if (!price) return res.status(400).json({ error: "Missing fields" });

  if(price < 0) return res.status(406).json({ error: "Price must be > 0" });
  
  try {
    const therapist = await Therapist.findAll({
      where: {
        price: {
          [Op.lte]: price,
        },
      },
      limit: perPage,
      offset,
    });

    if (!therapist)
      return res.status(404).json({ error: "Therapist not found" });

      const totalTherapist = therapist.length;
      const totalPages = Math.ceil(totalTherapist / perPage);
  
      res.status(200).json({ therapist, totalPages, totalTherapist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const searchByUbication = async (req, res) => {
  const { ubication } = req.params;

  const page = parseInt(req.query.page) || 1;
  const perPage = 2;
  const offset = (page - 1) * perPage;

  if (!ubication) return res.status(400).json({ error: "Missing fields" });

  try {
    const therapist = await Therapist.findAll({
      where: {
        adress: {
          [Op.like]: `%${ubication}%`,
        },
      },
      limit: perPage,
      offset,
    });

    if (!therapist)
      return res.status(404).json({ error: "Therapist not found" });

      const totalTherapist = therapist.length;
      const totalPages = Math.ceil(totalTherapist / perPage);
  
      res.status(200).json({ therapist, totalPages, totalTherapist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const searchByCountry = async (req, res) => {
  const { country } = req.params;
  console.log(country)

  const page = parseInt(req.query.page) || 1;
  const perPage = 6;
  const offset = (page - 1) * perPage;

  if (!country) return res.status(400).json({ error: "Missing fields" });

  try {
    const therapist = await Therapist.findAll({
      where: {
        nation: {
          [Op.iLike]: `%${country}%`,
        },
      },
      limit: perPage,
      offset,
    });

    if (!therapist)
      return res.status(404).json({ error: "Therapist not found" });

      const totalTherapist = therapist.length;
      const totalPages = Math.ceil(totalTherapist / perPage);
  
      res.status(200).json({ therapist, totalPages, totalTherapist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --> FILL <--

const fillTherapist = async (Therapist) => {
  try {
    // fillTherapistData --> Array de Objetos
    // Está hecho en /common/filledDates.js
    await Therapist.bulkCreate(fillTherapistData);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getTherapists,
  createTherapist,
  addInfoTherapist,
  updateDescriptionTherapist,
  updateImgTherapist,
  updateTherapistPrice,
  updateTherapistPriceByPorcent,
  deleteTherapist,
  switchTherapistState,
  getTherapistById,
  fillTherapist,
  searchByNameLastName,
  searchByPrice,
  searchByUbication,
  filterTherapistByCategoryId,
  searchByCountry,
  filterTherapists,
  logInTherapist,
  updateTherapist
};