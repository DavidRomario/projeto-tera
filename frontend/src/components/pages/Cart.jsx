import React, { useEffect, useState } from "react";
import Default from "../templates/Default";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [cvv, setCvv] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const navigate = useNavigate();

  const getProductsFromLocalStorage = () => {
    const productsFromStorage = localStorage.getItem("products");

    setProducts(JSON.parse(productsFromStorage));
  };

  async function finishPayment() {
    const isLogged = localStorage.getItem("token");
    if (isLogged !== null) {
      const body = {
        cvv,
        cardNumber,
        cardName,
        cardExpiration,
      };

      // const request = {
      //   success: true,
      // };
      const request = await axios.post("http://localhost:3030/payment", body, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        success: true,
      });
      if (request.success) {
        Swal.fire(
          "Pagamento finalizado com sucesso!",
          "Pedido foi gerado",
          "success"
        );
        localStorage.removeItem("products");
        navigate("/orders");
      }
    } else {
      Swal.fire(
        "Faça login para continuar",
        "Ou cadastre-se se não houver conta. ",
        "warning"
      );
      navigate("/login");
    }
  }

  useEffect(() => {
    getProductsFromLocalStorage();
  }, []);
  return (
    <Default>
      <div id="main-content">
        <div id="produto-carrinho">
          {products.map((product) => (
            <div className="product-cart">
              <Link to={`/description/${product._id}`}>
                <img className="photo" src={`${product.image}`} alt="" />
              </Link>
              <Link to={`/description/${product._id}`} className="none">
                <h1 id="produto-nome">{`${product.name}`}</h1>
              </Link>
              <p id="produto-preco">{`${product.price}`}</p>
              {/* <div className="button">
              <button id="bt1"> - </button>
              <input id="campo" type="text" value="1" />
              <button id="bt2"> + </button>
            </div> */}
            </div>
          ))}
        </div>
        <div id="payment-total">
          <form className="checkout">
            <div className="checkout-header">
              <h1 className="checkout-title">Dados para pagamento:</h1>
            </div>
            <p>
              <input
                type="text"
                className="checkout-input checkout-name"
                placeholder="Your Name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              <input
                type="text"
                className="checkout-input checkout-exp"
                placeholder="YY"
                value={cardExpiration}
                onChange={(e) => setCardExpiration(e.target.value)}
              />
            </p>
            <p>
              <input
                type="text"
                className="checkout-input checkout-card"
                placeholder="4111 1111 1111 1111"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <input
                type="text"
                className="checkout-input checkout-cvc"
                placeholder="CVC"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </p>
            <p>
              <input
                type="submit"
                value="Purchase"
                onClick={finishPayment}
                className="checkout-btn"
              />
            </p>
          </form>
          <form className="checkout">
            <p>Endereço de entrega:</p>
            <p>disdeffe</p>
            <p>Valor total:</p>
            <p>R$3000,00</p>
          </form>
          <div className="button2">
            <Link to="/">
              <button className="payment">Continuar comprando</button>
            </Link>
          </div>
        </div>
      </div>
    </Default>
  );
}
