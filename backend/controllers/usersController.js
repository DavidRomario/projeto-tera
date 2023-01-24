const bcrypt = require("bcrypt");
const models = require("../models/index");
const Op = require("sequelize").Op;

async function createUser(req, res) {
  try {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const documentNumber = req.body.documentNumber;
    const birthdate = req.body.birthdate;
    const telephone = req.body.telephone;
    const street = req.body.street;
    const number = req.body.number;
    const city = req.body.city;
    const district = req.body.district;
    const complement = req.body.complement;
    const cep = req.body.cep;

    const verifyUser = await models.User.findOne({
      where: {
        [Op.or]: [
          { documentNumber: documentNumber },
          { email: email },
          { telephone: telephone },
        ],
      },
    });
    if (verifyUser !== null) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
        payload: [],
      });
    }
    if (verifyUser === null) {
      const user = await models.User.create({
        name: name,
        lastname: lastname,
        email: email,
        password: await bcrypt.hashSync(password, 10),
        documentNumber: documentNumber,
        birthdate: birthdate,
        telephone: telephone,
      });

      const address = await models.Address.create({
        street,
        city,
        cep,
        number,
        district,
        complement: complement ? complement : "N/A",
        users_id: user.id,
      });

      return res.status(200).json({
        success: true,
        message: "User created successfully",
        payload: [{ user: user, address: address }],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error on api",
      payload: [],
    });
  }
}

async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await models.User.findOne({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        payload: [],
      });
    }
    const address = await models.Address.findOne({
      where: {
        users_id: parseInt(id),
      },
    });
    return res.status(200).json({
      success: true,
      message: "User found",
      payload: [{ user: user, address: address }],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error on api",
      payload: [],
    });
  }
}

async function getUsers(req, res) {
  try {
    const users = await models.User.findAll();
    return res.status(200).json({
      success: true,
      message: "Users found",
      payload: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error on api",
      payload: [],
    });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const documentNumber = req.body.documentNumber;
    const birthdate = req.body.birthdate;
    const telephone = req.body.telephone;

    const verifyUser = await models.User.findOne({
      where: {
        id: parseInt(id),
      },
    });
    if (!verifyUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        payload: [],
      });
    }
    await models.User.update(
      {
        name: name,
        lastname: lastname,
        email: email,
        documentNumber: documentNumber,
        birthdate: birthdate,
        telephone: telephone,
      },
      {
        where: {
          id: parseInt(id),
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "user updated",
      payload: [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error on api",
      payload: [],
    });
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;

    const user = await models.User.findOne({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        payload: [],
      });
    }
    await models.User.destroy({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      payload: [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error on api",
      payload: [],
    });
  }
}

module.exports = { createUser, getUserById, getUsers, updateUser, deleteUser };
