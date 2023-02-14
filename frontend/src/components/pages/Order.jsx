import React, { useState, useEffect } from "react";
import Default from "../templates/Default";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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

  async function cancelOrder(orderId) {
    const request = await axios.put(
      `http://localhost:3030/order/${orderId}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(request);
  }

  const handleCancelClick = (order) => {
    Swal.fire({
      title: "Tem certeza que deseja cancelar o pedido?",
      text: "Após o cancelamento não terá como reverter.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelOrder(order._id);

        window.location.reload();
      }
    });
  };

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
                <p
                  id="result"
                  className="p"
                  style={{
                    color: order.status === "Cancelado" ? "red" : "green",
                  }}
                >{`${order.status}`}</p>
                {order.status !== "Cancelado" ? (
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => handleCancelClick(order)}
                  >
                    Cancelar pedido
                  </button>
                ) : (
                  <div></div>
                )}
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
