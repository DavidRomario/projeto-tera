import React, { useState } from "react";
import Default from "../templates/Default";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Login() {
  const [email, setEmail] = useState(() => {
    const emailLocalStorage = localStorage.getItem("rememberEmail");
    return emailLocalStorage;
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [password, setPassword] = useState(() => {
    const passwordLocalStorage = localStorage.getItem("rememberPassword");
    return passwordLocalStorage;
  });

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const [remember, setRemember] = useState(() => {
    const rememberLocalStorage = localStorage.getItem("remember");
    return rememberLocalStorage === "true";
  });

  const navigate = useNavigate();

  const toggleRemember = () => {
    if (remember) {
      setRemember(false);
      localStorage.removeItem("remember");
      localStorage.removeItem("rememberEmail");
      localStorage.removeItem("rememberPassword");
    } else {
      setRemember(true);
      localStorage.setItem("remember", "true");
      localStorage.setItem("rememberEmail", email);
      localStorage.setItem("rememberPassword", password);
    }
  };

  const verifyCart = () => {
    const storageProducts = localStorage.getItem("products");

    return storageProducts ? true : false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: email,
      password: password,
    };

    const request = await axios.post("http://localhost:3030/login", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const address = request.data.payload[1].address;

    const fullAddress = `${address.street}, nº ${address.number} - ${address.cep} - ${address.district}, ${address.city} `;
    console.log(fullAddress);
    localStorage.setItem("address", fullAddress);
    localStorage.setItem("token", request.data.payload[0].user.token);
    localStorage.setItem("userId", request.data.payload[0].user.id);
    const productsCart = verifyCart();

    if (productsCart) {
      navigate("/cart");
    } else {
      navigate("/");
    }
    return await request.data;
  };
  const handleEmail = (value) => {
    setEmail(value);
    if (remember) {
      localStorage.setItem("rememberEmail", value);
    }
  };
  const createAccount = () => {
    navigate("/registration");
  };

  return (
    <Default>
      <div>
        <div className="login">
          <h1 id="h1-login">Bem Vindo!</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="pad">
              <TextField
                className="login-user-input"
                type="text"
                placeholder=" E-mail"
                value={email}
                onChange={(e) => handleEmail(e.target.value)}
              />
            </div>
            <div className="pad">
              <TextField
                className="login-password-input"
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleClickShowPassword}>
                      <VisibilityIcon />
                    </IconButton>
                  ),
                }}
              />
            </div>
            <div className="remember">
              <input
                checked={remember}
                onChange={toggleRemember}
                type="checkbox"
              />
              <label>Lembrar login</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Esqueci minha senha
            </Link>
            <div className="button2">
              <button className="login-btn" type="submit">
                Entrar
              </button>
            </div>
          </form>
          <div id="line"></div>
          <div className="button3">
            <button
              onClick={(event) => createAccount()}
              className="create-account-btn"
            >
              Criar Conta
            </button>
          </div>
        </div>
      </div>
    </Default>
  );
}
