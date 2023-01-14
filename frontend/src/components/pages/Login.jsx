import React from "react";
import Default from "../templates/Default";

export default function Login() {
  return (
    <Default>
      <div>
        <div className="login">
          <h1 id="h1-login">Bem Vindo!</h1>
          <input
            className="login-user-input"
            type="text"
            placeholder="CPF/CNPJ ou E-mail"
          />
          <input
            className="login-password-input"
            type="text"
            placeholder="Senha"
          />

          <div className="button2">
            <button className="login-btn">Entrar</button>
          </div>
          <div className="button2">
            <button className="create-account-btn">Criar Conta</button>
          </div>
        </div>
      </div>
    </Default>
  );
}
