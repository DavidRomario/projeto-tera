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
              <div>
                <h1>Seu Pedido</h1>
                <p>NUMERO DO PEDIDO: {`${order.number}`} </p>
                <p>VALOR TOTAL: {`${order.totalValue}`}</p>
                <p>STATUS: {`${order.status}`}</p>
              </div>
              <p id="produto-preco"></p>
            </div>
          ))
        ) : (
          <div>Não há pedidos feitos.</div>
        )}
      </div>
    </Default>
  );
}
