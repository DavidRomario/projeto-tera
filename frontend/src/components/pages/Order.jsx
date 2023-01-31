import React, { useState, useEffect } from "react";
import Default from "../templates/Default";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  async function getAllOrders() {
    const response = await axios.get(`http://localhost:3030/order/${userId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.data.success) {
      setOrders(response.data.payload);
    }
  }
  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <Default>
      <div id="produto-carrinho">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div className="product-cart">
              <Link to={`/description/${order.number}`}>
                <img className="photo" src={`${order.totalValue}`} alt="" />
              </Link>
              <Link to={`/description/${order.status}`} className="none">
                <h1 id="produto-nome"></h1>
              </Link>
              <p id="produto-preco"></p>
              {/* <div className="button">
              <button id="bt1"> - </button>
              <input id="campo" type="text" value="1" />
              <button id="bt2"> + </button>
            </div> */}
            </div>
          ))
        ) : (
          <div>Não há produtos no carrinho ainda.</div>
        )}
      </div>
    </Default>
  );
}
