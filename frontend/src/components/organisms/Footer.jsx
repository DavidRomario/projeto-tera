import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="f1">
      <footer className="id1">
        <ul className="list-footer">
          <Link to="/" className="f">
            <li className="nav-item">Home</li>
          </Link>
          <li className="nav-item">Fale Conosco</li>
          <Link to="/registration" className="f">
            <li className="nav-item">Cadastro</li>
          </Link>
          <li className="nav-item">Política de Privacidade</li>
        </ul>
        <div className="f2"></div>
        <p className="txt-center">© 2022 Company, Inc</p>
      </footer>
    </div>
  );
}
