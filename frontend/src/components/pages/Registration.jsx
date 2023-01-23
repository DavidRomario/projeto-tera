import React from "react";
import Default from "../templates/Default";
import axios from "axios";
import { useState } from "react";

export default function Registration() {
  const [users, setUsers] = useState("");

  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [document, setDocument] = useState("");
  const [telephone, setTelephone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [street, setStreet] = useState("");
  const [cep, setCep] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");

  async function createUser() {}

  return (
    <Default>
      <div id="all-content">
        <section id="section-form">
          <form name="meuForm" method="post" id="formulario">
            <label>
              <span>Nome</span>
              <input type="text" className="input_text" name="nome" id="name" />
            </label>
            <label>
              <span>Sobrenome</span>
              <input
                type="text"
                className="input_text"
                name="sobrenome"
                id="name"
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="text"
                className="input_text"
                name="email"
                id="email"
              />
            </label>
            <label>
              <span>Senha</span>
              <input
                type="text"
                className="input_text"
                name="senha"
                id="senha"
              />
            </label>
            <label>
              <span>CPF</span>
              <input type="text" className="input_text" name="cpf" id="cpf" />
            </label>
            <label>
              <span>Telefone</span>
              <input
                type="tel"
                className="input_text"
                name="telefone"
                required
                placeholder="(xx) xxxxx-xxxx"
                id="subject"
              />
            </label>
            <label>
              <span>Data de Nascimento</span>
              <input type="text" className="input_text" name="data" id="data" />
            </label>
            <label>
              <span>Rua</span>
              <input type="text" className="input_text" name="Rua" id="rua" />
            </label>
            <label>
              <span>CEP</span>
              <input type="text" className="input_text" name="cep" id="cep" />
            </label>
            <label>
              <span>Nº</span>
              <input
                type="text"
                className="input_text"
                name="numero"
                id="numero"
              />
            </label>
            <label>
              <span>Complemento</span>
              <input
                type="text"
                className="input_text"
                name="complemento"
                id="complemento"
              />
            </label>
            <input type="button" className="update" value="Enviar" />
          </form>
        </section>
      </div>
    </Default>
  );
}
