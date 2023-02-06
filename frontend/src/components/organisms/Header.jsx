import React from "react";
import logo from "../../images/cart.png";
import login from "../../images/login.png";
import { Link } from "react-router-dom";
import { useApp } from "../../hooks/appContent";

export default function Header() {
  const { setInput } = useApp();
  const isLogged = () => {
    if (localStorage.getItem("token")) {
      return "/my-account";
    } else {
      return "/login";
    }
  };
  return (
    <div>
      <header>
        <Link to="/" className="title">
          <h1>Tenis Store</h1>
        </Link>
        <div id="divBusca">
          <input
            onChange={(event) => setInput(event.target.value)}
            type="text"
            id="txtBusca"
            placeholder="Buscar..."
          />
          <button id="btnBusca">Buscar</button>
        </div>
        <div>
          <Link to="/cart">
            <img id="cart-icon" src={logo} alt="" srcset="" />
          </Link>
          <Link to={isLogged()}>
            <img id="login-icon" src={login} alt="" />
          </Link>
        </div>
      </header>
    </div>
  );
}
