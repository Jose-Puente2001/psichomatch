const { Patient } = require("../db");
const {
  main,
  mainRecovery,
  mainRecovery2,
} = require("../middlewares/nodeMailer");
const bcrypt = require("bcryptjs");
const generateRandomPassword = require("../middlewares/password");
const { CHANGE_PASS } = process.env;
const patientEmail = "";
const  {tokenSign}  = require('../helpers/generateToken')

const { Op } = require("sequelize");

const getpatients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;
    const offset = (page - 1) * perPage;
    const limit = perPage;
    const patients = await Patient.findAll({
      offset,
      limit,
      order: [["id", "ASC"]],
    });

    const totalCount = await Patient.count();
    const actualPage = page || 1;
    const totalPages = Math.ceil(totalCount / perPage);
    res.status(200).json({ patients, totalPages, actualPage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPatient = await Patient.destroy({
      where: { id },
    });

    res.status(200).json(deletedPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const inserNewPatient = async (req, res) => {
  try {
    const { name, lastName, phone, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(password, salt);
    const patient = await Patient.create({
      name,
      lastName,
      phone,
      email,
      password: encryptPassword,
    });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const insertPatient = async (req, res) => {
  try {
    const { patientEmail, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(password, salt);

    const patientExist = await Patient.findOne({
      where: {
        email: patientEmail,
      },
    });
    if (patientExist) res.status(400).send("Patient already Exist");
    await Patient.create({
      email: patientEmail,
      password: encryptPassword,
    });
    main(patientEmail, password);

    res.status(200).send("Patient Registered, please check you email");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const logInPatient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const patientExist = await Patient.findOne({
      where: { email },
    });

    if (patientExist) {
      const ValidatePassword = await bcrypt.compareSync(
        password,
        patientExist.password
      );

      const tokenSession = await tokenSign(patientExist) //Token

      if (ValidatePassword){
        res.status(200).json({
          data:patientExist,
          tokenSession
        })
      } else if(!ValidatePassword){
        if(password === patientExist.password){
          res.status(200).json({
            data:patientExist,
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


const loginPatientGoogle = async (req, res) => {
  try {
    const  {id}  = req.body;
    const patientExist = await Patient.findOne({
      where: { id },
    });

    console.log(patientExist)
    
      if (patientExist.session){
        res.status(200).json({
          data:patientExist,
          tokenSession:patientExist.session
        })
      } else{
        res.status(400).send("Wrong Password")
      }
      
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const recoverPass = async (req, res) => {
  try {
    const { patientEmail } = req.body;
    const patientExist = await Patient.findOne({
      where: {
        email: patientEmail,
      },
    });

    const id = patientExist.id;

    if (patientExist) {
      const link = `${CHANGE_PASS}`;
      await mainRecovery(patientEmail, link, id);

      res.status(200).send("Please check you email");
    } else {
      res.status(400).send("The Email doesn't exist");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const recoverPass2 = async (req, res) => {
  try {
    const { id } = req.params;

    const password = generateRandomPassword();
    const patientExist = await Patient.findByPk(id);
    const patientEmail = patientExist.email;

    mainRecovery2(patientEmail, password);

    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(password, salt);

    await Patient.update(
      { password: encryptPassword },
      {
        where: {
          id: id, // Utiliza el ID del paciente para identificar al paciente a actualizar
        },
      }
    );

    res.status(200).send("Please check you email");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updatePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, lastName, phone, email, password } = req.body;
    const patient = await Patient.findByPk(id);
    await patient.update({ name, lastName, phone, email, password });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fillPatient = async (Patient) => {
  try {
    await Patient.bulkCreate([
      {
        name: "Kevin",
        lastName: "Apellido1",
        phone: "809-689-5888",
        email: "kevin@example.com",
        password: "password123",
      },
      {
        name: "Ludovino",
        lastName: "Apellido2",
        phone: "809-189-5888",
        email: "ludovino@example.com",
        password: "password456",
      },
      {
        name: "Cesar",
        lastName: "Apellido3",
        phone: "809-289-5888",
        email: "cesar@example.com",
        password: "password789",
      },
      {
        name: "Carolina",
        lastName: "Apellido4",
        phone: "809-789-1234",
        email: "carolina@example.com",
        password: "password321",
      },
      {
        name: "Alex",
        lastName: "Apellido5",
        phone: "809-456-7890",
        email: "alex@example.com",
        password: "password654",
      },
      {
        name: "Maria",
        lastName: "Apellido6",
        phone: "809-111-2222",
        email: "maria@example.com",
        password: "password987",
      },
      {
        name: "Pedro",
        lastName: "Apellido7",
        phone: "809-333-4444",
        email: "pedro@example.com",
        password: "password789",
      },
      {
        name: "Laura",
        lastName: "Apellido8",
        phone: "809-555-6666",
        email: "laura@example.com",
        password: "password123",
      },
      {
        name: "Rafael",
        lastName: "Apellido9",
        phone: "809-777-8888",
        email: "rafael@example.com",
        password: "password456",
      },
      {
        name: "Gabriela",
        lastName: "Apellido10",
        phone: "809-999-0000",
        email: "gabriela@example.com",
        password: "password789",
      },
      {
        name: "Santiago",
        lastName: "Apellido11",
        phone: "809-121-2121",
        email: "santiago@example.com",
        password: "password321",
      },
      {
        name: "Ana",
        lastName: "Apellido12",
        phone: "809-343-4343",
        email: "ana@example.com",
        password: "password654",
      },
      {
        name: "Diego",
        lastName: "Apellido13",
        phone: "809-565-6767",
        email: "diego@example.com",
        password: "password987",
      },
      {
        name: "Isabel",
        lastName: "Apellido14",
        phone: "809-787-8989",
        email: "isabel@example.com",
        password: "password789",
      },
      {
        name: "Hector",
        lastName: "Apellido15",
        phone: "809-909-2323",
        email: "hector@example.com",
        password: "password123",
      },
      {
        name: "Valeria",
        lastName: "Apellido16",
        phone: "809-434-2323",
        email: "valeria@example.com",
        password: "password456",
      },
      {
        name: "Antonio",
        lastName: "Apellido17",
        phone: "809-676-9898",
        email: "antonio@example.com",
        password: "password789",
      },
      {
        name: "Marta",
        lastName: "Apellido18",
        phone: "809-898-9898",
        email: "marta@example.com",
        password: "password321",
      },
      {
        name: "Oscar",
        lastName: "Apellido19",
        phone: "809-787-6767",
        email: "oscar@example.com",
        password: "password654",
      },
      {
        name: "Julia",
        lastName: "Apellido20",
        phone: "809-565-4343",
        email: "julia@example.com",
        password: "password987",
      },
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getpatients,
  fillPatient,
  updatePatient,
  deletePatient,
  recoverPass,
  recoverPass2,
  insertPatient,
  getPatientById,
  logInPatient,
  inserNewPatient,
  loginPatientGoogle
};