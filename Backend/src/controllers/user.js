const { User } = require("../db");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const deletedUser = await user.update({
      state: false,
    });

    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const insertUser = async (req, res) => {
  try {
    const { name, isAdmin, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
      name,
      isAdmin,
      password: encryptPassword,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, password, isAdmin } = req.body;

    const user = await User.findByPk(id);
    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(password, salt);
    await user.update({ name, password: encryptPassword, isAdmin });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fillUser = async (User) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    await User.bulkCreate([
      { name: "Kevin", isAdmin: true, password: bcrypt.hashSync("123", salt) },
      {
        name: "Ludovino",
        isAdmin: true,
        password: bcrypt.hashSync("123", salt),
      },
      { name: "Cesar", isAdmin: true, password: bcrypt.hashSync("123", salt) },
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

const AuthUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ where: { name } });
    //res.status(200).json(user)

    if (user) {
      const ValidatePassword = await bcrypt.compareSync(
        password,
        user.password
      );

      if (ValidatePassword) res.status(200).json(true);
      else res.status(400).json(false);
    } else {
      res.status(400).json(false);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  insertUser,
  updateUser,
  fillUser,
  AuthUser,
};
