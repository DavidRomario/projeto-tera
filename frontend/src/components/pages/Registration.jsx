import React, { useState } from "react";
import Default from "../templates/Default";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";
import Swal from "sweetalert2";
import validator from "validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Registration() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [telephone, setTelephone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [street, setStreet] = useState("");
  const [cep, setCep] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function handleEmailChange(event) {
    const validate = validateEmail(event.target.value);
    if (validate) {
      console.log("valido");
      event.target.setCustomValidity("");
    } else {
      console.log("error");
      event.target.setCustomValidity("Email inválido");
      event.target.reportValidity();
      event.preventDefault();
    }

    setEmail(event.target.value);
  }

  function validateEmail(email) {
    return /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);
  }

  const handleValidatePassword = (event) => {
    const verifyPassword = validator.isStrongPassword(event.target.value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    if (!verifyPassword) {
      event.target.setCustomValidity(
        "Insira pelo menos 8 caracteres, 1 maiúsculo, 1 minúsculo, 1 número e um caracter especial."
      );
      event.target.reportValidity();
      event.preventDefault();
    } else {
      event.target.setCustomValidity("");
    }
    setPassword(event.target.value);
  };

  function handleCpfChange(event) {
    if (documentNumber.length !== 11) {
      console.log("error");
      event.target.setCustomValidity("Insira os 11 números do seu CPF.");
      event.target.reportValidity();
      event.preventDefault();
    } else {
      event.target.setCustomValidity("");
    }
    setDocumentNumber(event.target.value);
  }

  async function createUser() {
    const body = {
      name,
      lastname,
      email,
      password,
      documentNumber,
      telephone,
      birthdate,
      street,
      cep,
      number,
      complement,
      city,
      district,
    };

    try {
      const request = await axios.post("http://localhost:3030/users/", body, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (request.data.success) {
        localStorage.setItem(
          "address",
          JSON.stringify(request.data.payload[0].address)
        );
        Swal.fire("Sucesso!", "Usuário cadastrado com sucesso.", "success");
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 409) {
        Swal.fire("Usuário já cadastrado!");
      }
      if (error.response.status === 500) {
        Swal.fire("Falha no servidor", "Tente novamente mais tarde.", "error");
      }
    }
  }

  const handleClick = () => {
    createUser();
  };

  return (
    <Default>
      <div id="all-content">
        <div id="section-form">
          <form name="meuForm" method="post" id="formulario">
            <label>
              <span>Nome</span>
              <input
                value={name}
                type="text"
                className="input_text"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <span>Sobrenome</span>
              <input
                value={lastname}
                type="text"
                className="input_text"
                name="sobrenome"
                onChange={(e) => setLastname(e.target.value)}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                value={email}
                type="text"
                className="input_text"
                name="email"
                onChange={handleEmailChange}
                required
              />
            </label>
            <label>
              <span>Senha</span>
              <input
                value={password}
                type={showPassword ? "text" : "password"}
                className="input_text"
                name="senha"
                onChange={handleValidatePassword}
              />
              <span className="icon">
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={handleClickShowPassword}
                />
              </span>
            </label>
            <label>
              <span>CPF</span>
              <IMaskInput
                mask="000.000.000-00"
                value={documentNumber}
                type="text"
                className="input_text"
                name="cpf"
                onChange={handleCpfChange}
                required
              />
            </label>
            <label>
              <span>Telefone</span>
              <IMaskInput
                mask="(00) 00000-0000"
                value={telephone}
                type="tel"
                className="input_text"
                name="telefone"
                required
                placeholder="(xx) xxxxx-xxxx"
                onChange={(e) => setTelephone(e.target.value)}
              />
            </label>
            <label>
              <span>Data de Nascimento</span>
              <IMaskInput
                mask="00/00/0000"
                value={birthdate}
                type="text"
                className="input_text"
                name="data"
                placeholder="dd/mm/aaaa"
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </label>
          </form>
        </div>
        <div id="user-view">
          <label>
            <span>Rua</span>
            <input
              value={street}
              type="text"
              className="input_text"
              name="rua"
              onChange={(e) => setStreet(e.target.value)}
            />
          </label>
          <label>
            <span>CEP</span>
            <IMaskInput
              mask="00000-000"
              value={cep}
              type="text"
              className="input_text"
              name="cep"
              onChange={(e) => setCep(e.target.value)}
            />
          </label>
          <label>
            <span>Nº</span>
            <input
              value={number}
              type="text"
              className="input_text"
              name="numero"
              onChange={(e) => setNumber(e.target.value)}
            />
          </label>
          <label>
            <span>Cidade</span>
            <input
              value={city}
              type="text"
              className="input_text"
              name="cidade"
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label>
            <span>Bairro</span>
            <input
              value={district}
              type="text"
              className="input_text"
              name="bairro"
              onChange={(e) => setDistrict(e.target.value)}
            />
          </label>
          <label>
            <span>Complemento</span>
            <input
              value={complement}
              type="text"
              className="input_text"
              name="complemento"
              onChange={(e) => setComplement(e.target.value)}
            />
          </label>
          <input
            type="button"
            className="update"
            value="Cadastrar"
            onClick={handleClick}
          />
        </div>
      </div>
    </Default>
  );
}
