const models = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generator = require("generate-password");
const nodemailer = require("nodemailer");
const sha256 = require("sha256");

const SECRET = process.env.SECRET
  ? process.env.SECRET
  : "skaiokaopskalsoaksosoakspokkofiashiufasnieql";

async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await models.User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        payload: [],
      });
    }

    const comparePassword = await bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Incorret email or password",
        payload: [],
      });
    }

    const token = await jwt.sign({ payload: new Date() }, SECRET);
    user.token = token;
    await user.save();
    const address = await models.Address.findOne({
      where: {
        users_id: user.id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      payload: [{ user: user }, { address: address }],
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

async function recoveryPassword(req, res) {
  try {
    const email = req.body.email;
    const user = await models.User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "",
        payload: [],
      });
    }
    // lib que gera string aleatoria
    const randomString = generator.generate({
      length: 10,
      numbers: true,
    });

    // gerar hash da string aleatoria
    const hash = sha256(randomString);

    // fazer update na model de users onde email = email passando campo hash = hash
    await models.User.update(
      {
        hash: hash,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    // enviar email para usuário com a nova senha usando a lib de envio de emailnpm install generate-password --save
    let transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "davidr.castro1997@gmail.com",
        pass: "fortnite123",
      },
    });
    const mailOptions = {
      from: "romario.david1997@hotmail.com", // sender address
      to: email, // receiver (use array of string for a list)
      subject: "Redefinir senha", // Subject line
      html: `<p>Aqui está o link de acesso para redefinir sua nova senha: http://localhost:3000/password/${hash}</p>`, // plain text body
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "error on api",
          payload: [],
        });
      } else console.log(info);
    });
    return res.status(200).json({
      success: true,
      message: "",
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

async function getVerifyHash(req, res) {
  try {
    // receber hash via params
    const hashUser = req.params.hash;
    // buscar na tabela de users se hash = hash
    const verifyHash = await models.User.findOne({
      where: {
        hash: hashUser,
      },
    });

    // se houver resultado, hash está válida e retorna 200
    if (!!verifyHash) {
      return res.status(200).json({
        success: true,
        message: "Hash valida",
        payload: [],
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Hash invalida",
        payload: [],
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

  // se não houver resultado, hash inválida e retorna 400
}

async function updatePassword(req, res) {
  try {
    const hashUser = req.params.hash;
    // receber password no body
    const password = req.body.password;
    // buscar na tabela de users se hash = hash
    const verifyHash = await models.User.findOne({
      where: {
        hash: hashUser,
      },
    });
    if (!verifyHash) {
      return res.status(404).json({
        success: false,
        message: "Hash not found",
        payload: [],
      });
    }
    // se houver resultado, faz o update de password = bcrypt(password)
    await models.User.update(
      {
        password: await bcrypt.hashSync(password, 10),
      },
      {
        where: { hash: hashUser },
      }
    );

    return res.status(200).json({
      success: true,
      message: "password updated",
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
  // receber hash via params
}

module.exports = { login, recoveryPassword, updatePassword, getVerifyHash };
