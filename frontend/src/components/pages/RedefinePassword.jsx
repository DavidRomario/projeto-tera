import React, { useState, useEffect } from "react";
import Default from "../templates/Default";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function RedefinePassword() {
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const getHash = useParams();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  async function verifyHash() {
    const response = await axios.get(
      `http://localhost:3030/login/verify-hash/${getHash.hash}`
    );
    if (response.data.success) {
    }
    // Swal.fire("Hash expirado");
  }

  async function updatePassword() {
    if (password !== repassword) {
      Swal.fire("Oops", "Senhas diferentes.", "error");
    } else {
      const body = {
        password,
        repassword,
      };
      const request = await axios.put(
        `http://localhost:3030/login/redefine/${getHash.hash}`,
        body
      );
      if (request.data.success) {
        Swal.fire({ text: "Senha atualizada com sucesso!", icon: "success" });
        navigate("/login");
      }
    }
  }

  const handleClick = () => {
    updatePassword();
  };

  useEffect(() => {
    verifyHash();
  }, []);
  return (
    <Default>
      <div className="password">
        <h1 id="type">Digite sua nova senha</h1>
        <div className="pass">
          <TextField
            className="input-password"
            type={showPassword ? "text" : "password"}
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleClickShowPassword}>
                  <VisibilityIcon />
                </IconButton>
              ),
            }}
          />
        </div>
        <div className="pass">
          <TextField
            className="input-password"
            type={showPassword ? "text" : "password"}
            placeholder="Confirme nova senha"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <VisibilityIcon onClick={handleClickShowPassword} />
                </IconButton>
              ),
            }}
          />
        </div>
        <div className="btn-confirm">
          <button onClick={handleClick} className="btn-confirm2" type="submit">
            Enviar
          </button>
        </div>
      </div>
    </Default>
  );
}
