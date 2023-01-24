import React, { useState } from "react";
import Default from "../templates/Default";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState(() => {
    const emailLocalStorage = localStorage.getItem("rememberEmail");
    return emailLocalStorage;
  });

  const [password, setPassword] = useState(() => {
    const passwordLocalStorage = localStorage.getItem("rememberPassword");
    return passwordLocalStorage;
  });

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
    localStorage.setItem(
      "address",
      JSON.stringify(request.data.payload[0].address)
    );
    localStorage.setItem("token", request.data.payload[0].user.token);
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
            <input
              className="login-user-input"
              type="text"
              placeholder=" E-mail"
              value={email}
              onChange={(e) => handleEmail(e.target.value)}
            />
            <input
              className="login-password-input"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="remember">
              <input
                checked={remember}
                onChange={toggleRemember}
                type="checkbox"
              />
              <label>remember me</label>
            </div>

            <div className="button2">
              <button className="login-btn" type="submit">
                Entrar
              </button>
            </div>
          </form>
          <div className="button2">
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
