import React, { useEffect, useState } from "react";
import Default from "../templates/Default";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IMaskInput } from "react-imask";
import axios from "axios";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [cvv, setCvv] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [address, setAddress] = useState("-");
  const [cartValue, setCartValue] = useState(0);
  const navigate = useNavigate();

  const getProductsFromLocalStorage = () => {
    const productsFromStorage = localStorage.getItem("products");
    if (productsFromStorage) {
      setProducts(JSON.parse(productsFromStorage));

      const cartProducts = JSON.parse(productsFromStorage);
      const getPrices = [];
      cartProducts.map((product) => {
        getPrices.push(product.number_price);
      });

      const finishValue = getPrices.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      setCartValue(finishValue);
    }
  };

  const getAddress = () => {
    const address = localStorage.getItem("address");
    if (address) {
      setAddress(address);
    }
  };

  async function finishPayment(e) {
    e.preventDefault();
    const isLogged = localStorage.getItem("token");
    if (isLogged !== null) {
      const body = {
        cvv,
        cardNumber,
        cardName,
        cardExpiration,
      };

      const request = await axios.post("http://localhost:3030/payment", body, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (request.data.success) {
        Swal.fire(
          "Pagamento finalizado com sucesso!",
          "Pedido foi gerado",
          "success"
        );
        const body = {
          products: products,
          totalValue: cartValue,
          user_id: localStorage.getItem("userId"),
        };
        const requestOrder = await axios.post(
          "http://localhost:3030/order",
          body,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(requestOrder, "121313");
        // request com axios, metodo post pra api com dados do body onde body terá:
        // o array de produtos, o cartValue e o userId (que está no localstorage)

        localStorage.removeItem("products");
        navigate("/order");
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
    getAddress();
  }, []);
  return (
    <Default>
      <div id="main-content">
        <div id="produto-carrinho">
          {products.length > 0 ? (
            products.map((product) => (
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
            ))
          ) : (
            <div>Não há produtos no carrinho ainda.</div>
          )}
        </div>
        {products.length > 0 ? (
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
                <IMaskInput
                  mask="00/00"
                  type="text"
                  className="checkout-input checkout-exp"
                  placeholder="MM/YY"
                  value={cardExpiration}
                  onChange={(e) => setCardExpiration(e.target.value)}
                />
              </p>
              <p>
                <IMaskInput
                  type="text"
                  className="checkout-input checkout-card"
                  mask="0000 0000 0000 0000"
                  placeholder="4111 1111 1111 1111"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <IMaskInput
                  mask="000"
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
              <p className="entrega">Endereço de entrega:</p>
              <p className="adress">{address}</p>
              <p className="total">Valor total:</p>
              <p className="total2">{`R$ ${cartValue},00`}</p>
            </form>
            <div className="button2">
              <Link to="/" className="payment">
                <button className="payment">Continuar comprando</button>
              </Link>
            </div>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    </Default>
  );
}
