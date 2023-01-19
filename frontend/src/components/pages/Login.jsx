import React, { useState } from "react";
import Default from "../templates/Default";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

    localStorage.setItem("token", request.data.payload[0].token);

    navigate("/cart");
    return await request.data;
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
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="login-password-input"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="button2">
              <button className="login-btn" type="submit">
                Entrar
              </button>
            </div>
            <div className="button2">
              <button className="create-account-btn">Criar Conta</button>
            </div>
          </form>
        </div>
      </div>
    </Default>
  );
}
