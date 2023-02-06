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
      <div id="pedidos">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div className="pedidos2">
              <div>
                <h1 className="h1">Seu Pedido</h1>
                <p className="p">
                  Numero do pedido:
                  <div className="aleatorio"> {`${order.number}`} </div>
                </p>
                <p className="p">Valor total: R$ {`${order.totalValue},00`}</p>
                <p className="p">Status: {`${order.status}`}</p>
              </div>
              <div className="img-pedidos">
                {order.products.map((product) => (
                  <Link to={`/description/${product._id}`}>
                    <img className="img2" src={`${product.image}`} alt="" />
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>Não há pedidos feitos.</div>
        )}
      </div>
    </Default>
  );
}
