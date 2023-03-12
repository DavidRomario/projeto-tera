import React, { useEffect, useState } from "react";
import Default from "../templates/Default";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IMaskInput } from "react-imask";
import Swal from "sweetalert2";

export default function EditUser() {
  const [user, setUser] = useState([]);
  const [address, setAddress] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  async function getUser() {
    const response = await axios.get(`http://localhost:3030/users/${userId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.data.success) {
      const user = response.data.payload[0].user;
      response.data.payload[0].user.birthdate = user.birthdate
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/");
      setUser(response.data.payload[0].user);
      setAddress(response.data.payload[0].address);
    }
  }

  function handleChangeUser(event) {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  function handleChangeAddress(event) {
    const { name, value } = event.target;
    setAddress({
      ...address,
      [name]: value,
    });
  }

  async function edit() {
    const body = {
      user: user,
      address: address,
    };
    return await axios.put(`http://localhost:3030/users/${userId}`, body);
  }

  const handleConfirm = async () => {
    const editUser = await edit();
    if (editUser.data.success) {
      Swal.fire("Usuário editado");
      navigate("/my-account");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Default>
      <div id="all-content">
        <div id="section-form">
          <form onSubmit={edit} name="meuForm" method="post" id="formulario">
            <label>
              <span>Nome</span>
              <input
                value={user.name}
                type="text"
                className="input_text"
                name="name"
                onChange={handleChangeUser}
              />
            </label>
            <label>
              <span>Sobrenome</span>
              <input
                value={user.lastname}
                type="text"
                className="input_text"
                name="lastname"
                onChange={handleChangeUser}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                value={user.email}
                type="text"
                className="input_text"
                name="email"
                onChange={handleChangeUser}
              />
            </label>
            <label>
              <span>Senha</span>
              <input type="password" className="input_text" name="senha" />
            </label>
            <label>
              <span>CPF</span>
              <IMaskInput
                value={user.documentNumber}
                mask="000.000.000-00"
                type="text"
                className="input_text"
                name="documentNumber"
                onChange={handleChangeUser}
              />
            </label>
            <label>
              <span>Telefone</span>
              <IMaskInput
                value={user.telephone}
                mask="(00) 00000-0000"
                type="tel"
                className="input_text"
                name="telephone"
                required
                placeholder="(xx) xxxxx-xxxx"
                onChange={handleChangeUser}
              />
            </label>
            <label>
              <span>Data de Nascimento</span>
              <IMaskInput
                value={user.birthdate}
                type="text"
                className="input_text"
                name="birthdate"
                placeholder="dd/mm/aaaa"
                onChange={handleChangeUser}
              />
            </label>
          </form>
        </div>
        <div id="user-view">
          <label>
            <span>Rua</span>
            <input
              value={address.street}
              type="text"
              className="input_text"
              name="street"
              onChange={handleChangeAddress}
            />
          </label>
          <label>
            <span>CEP</span>
            <IMaskInput
              value={address.cep}
              mask="00000-000"
              type="text"
              className="input_text"
              name="cep"
              onChange={handleChangeAddress}
            />
          </label>
          <label>
            <span>Nº</span>
            <input
              value={address.number}
              type="text"
              className="input_text"
              name="number"
              onChange={handleChangeAddress}
            />
          </label>
          <label>
            <span>Cidade</span>
            <input
              value={address.city}
              type="text"
              className="input_text"
              name="city"
              onChange={handleChangeAddress}
            />
          </label>
          <label>
            <span>Bairro</span>
            <input
              value={address.district}
              type="text"
              className="input_text"
              name="district"
              onChange={handleChangeAddress}
            />
          </label>
          <label>
            <span>Complemento</span>
            <input
              value={address.complement === "N/A" ? "" : address.complement}
              type="text"
              className="input_text"
              name="complement"
              onChange={handleChangeAddress}
            />
          </label>
          <input
            type="button"
            className="update"
            value="Confirmar"
            onClick={handleConfirm}
          />
        </div>
      </div>
    </Default>
  );
}
