import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Default from "../templates/Default";

export default function MyAccount() {
  const [userData, setUser] = useState([]);
  const navigate = useNavigate();

  async function getUserInfo() {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`http://localhost:3030/users/${userId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.data.success) {
      setUser(response.data.payload[0]);
    }
  }

  const handleClickToOrders = () => {
    navigate("/order");
  };

  const handleClickToLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <Default>
      <div>
        <main>
          {typeof userData.user !== "undefined" ? (
            <div className="account">
              <div className="userInfo">
                <p className="font">{`${userData.user.name}`}</p>
                <p className="font">{`${userData.user.lastname}`}</p>
                <p className="font1">{`${userData.user.email}`}</p>
                <p className="font">{`${userData.user.documentNumber}`}</p>
                <p className="font">{`${userData.user.telephone}`}</p>
              </div>
              <div className="userAddress">
                <p className="font">{`${userData.address.street}`}</p>
                <p className="font">Nº {`${userData.address.number}`}</p>
                <p className="font">{`${userData.address.city}`}</p>
                <p className="font">{`${userData.address.district}`}</p>
                <p className="font">{`${userData.address.cep}`}</p>
                <p className="font">{`${
                  userData.address.complement === "N/A"
                    ? ""
                    : userData.address.complement
                }`}</p>
              </div>
              <div className="btn-account">
                <button onClick={handleClickToOrders} className="btn-order">
                  Meus Pedidos
                </button>
                <button onClick={handleClickToLogout} className="btn-account2">
                  Sair da conta
                </button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </main>
      </div>
    </Default>
  );
}
