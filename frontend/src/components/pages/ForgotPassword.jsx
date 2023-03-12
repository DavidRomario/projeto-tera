import React, { useState } from "react";
import Default from "../templates/Default";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ForgotPassword() {
  const [email, setEmail] = useState([]);
  const navigate = useNavigate();

  async function recoveryUser() {
    const body = { email };
    const request = await axios.post(
      "http://localhost:3030/login/recovery",
      body
    );
    if (request.data.success) {
      Swal.fire(
        "Sucesso!",
        "Redefinição de senha enviada por email.",
        "success"
      );
      navigate("/login");
    }
  }

  const handleClickEmail = (event) => {
    recoveryUser();
  };

  return (
    <Default>
      <div className="forgot">
        <h1 id="type">Digite seu email</h1>
        <input
          value={email}
          className="input-email"
          type="text"
          placeholder=" E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="btn-email">
          <button
            className="btn-email2"
            type="submit"
            onClick={handleClickEmail}
          >
            Enviar
          </button>
        </div>
      </div>
    </Default>
  );
}
