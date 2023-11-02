const { Contact } = require("../db");
const { Op } = require("sequelize");

const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .min(3)
    .max(30)
    .required(),
  phone: Joi.string()
    .regex(/^\d{3}-\d{3}-\d{4}$/)
    .required(),
});

const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;
    const offset = (page - 1) * perPage;
    const limit = perPage;
    const contacts = await Contact.findAll({
      offset,
      limit,
      order: [["id", "ASC"]],
    });

    const totalCount = await Contact.count();

    const totalPages = Math.ceil(totalCount / perPage);
    res.status(200).json({ contacts, totalPages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchContact = async (req, res) => {
  try {
    const name = req.query.name;
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;
    const offset = (page - 1) * perPage;
    const limit = perPage;
    const contacts = await Contact.findAll({
      offset,
      limit,
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });
    const constacts2 = await Contact.findAll({where: {
      name: { [Op.iLike]: `%${name}%` },
    },});

    const totalCount = constacts2.length

    const totalPages = Math.ceil(totalCount / perPage);
    res.status(200).json({ contacts, totalPages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sortContactByName = async (req, res) => {
  try {
    const sort = req.query.sort; //ASC or DESC
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;
    const offset = (page - 1) * perPage;
    const limit = perPage;
    const contacts = await Contact.findAll({
      offset,
      limit,
      order: [[`name`, `${sort}`]],
    });

    

    const totalCount = await Contact.count();

    const totalPages = Math.ceil(totalCount / perPage);
    res.status(200).json({ contacts, totalPages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.destroy({
      where: { id },
    });

    res.status(200).json(deletedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const insertContact = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const { error } = await schema.validate(
      { name, phone },
      { abortEarly: false }
    );

    if (error) {
      //throw new Error(error.details[0].message);
      const errorDetails = error.details.map((err) => err.message);
      res.status(500).json(errorDetails);
    } else {
      const contact = await Contact.create({ name, phone });
      res.status(200).json(contact);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, phone } = req.body;
    const { error } = await schema.validate(
      { name, phone },
      { abortEarly: false }
    );

    if (error) {
      const errorDetails = error.details.map((err) => err.message);
      res.status(500).json(errorDetails);
    }else{
      const contact = await Contact.findByPk(id);

      await contact.update({ name, phone });
      res.status(200).json(contact);
    }
    

    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fillContact = async (Contact) => {
  try {
    await Contact.bulkCreate([
      { name: "Kevin", phone: "809-689-5888" },
      { name: "Ludovino", phone: "809-189-5888" },
      { name: "Cesar", phone: "809-289-5888" },
      { name: "Carolina", phone: "809-789-1234" },
      { name: "Alex", phone: "809-456-7890" },
      { name: "Maria", phone: "809-111-2222" },
      { name: "Pedro", phone: "809-333-4444" },
      { name: "Laura", phone: "809-555-6666" },
      { name: "Rafael", phone: "809-777-8888" },
      { name: "Gabriela", phone: "809-999-0000" },
      { name: "Santiago", phone: "809-121-2121" },
      { name: "Ana", phone: "809-343-4343" },
      { name: "Diego", phone: "809-565-6767" },
      { name: "Isabel", phone: "809-787-8989" },
      { name: "Hector", phone: "809-909-2323" },
      { name: "Valeria", phone: "809-434-2323" },
      { name: "Antonio", phone: "809-676-9898" },
      { name: "Marta", phone: "809-898-9898" },
      { name: "Oscar", phone: "809-787-6767" },
      { name: "Julia", phone: "809-565-4343" },
      { name: "Fernando", phone: "809-343-6767" },
      { name: "Luisa", phone: "809-787-1212" },
      { name: "Gustavo", phone: "809-909-7878" },
      { name: "antoni", phone: "809-909-7877" },
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getContacts,
  deleteContact,
  insertContact,
  updateContact,
  fillContact,
  getContactById,
  searchContact,
  sortContactByName,
};
