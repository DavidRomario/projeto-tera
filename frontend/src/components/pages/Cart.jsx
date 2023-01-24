import React, { useEffect, useState } from "react";
import Default from "../templates/Default";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  // criar constantes com os dados dos cartoes

  const getProductsFromLocalStorage = () => {
    const productsFromStorage = localStorage.getItem("products");

    setProducts(JSON.parse(productsFromStorage));
  };

  const finishPayment = () => {
    const isLogged = localStorage.getItem("token");
    if (isLogged !== null) {
      const body = {};

      const request = {
        success: true,
      };
      // const request = fazer post com axios para endpoint de pagamento
      if (request.success) {
        Swal.fire(
          "Pagamento finalizado com sucesso!",
          "Pedido foi gerado",
          "success"
        );
        localStorage.removeItem("products");
        navigate("/");
        // navigate("/orders")
      }
    } else {
      Swal.fire(
        "Faça login para continuar",
        "Ou cadastre-se se não houver conta. ",
        "warning"
      );
      navigate("/login");
    }
  };

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
          <p>Dados para pagamento:</p>
          <form className="form-payment" action="">
            <input className="form-payment" type="text" />
          </form>
          <p>Endereço de entrega:</p>
          <p>disdeffe</p>
          <p>Valor total:</p>
          <p>R$3000,00</p>
          <div className="button2">
            <button onClick={finishPayment} className="payment">
              Finalizar Pagamento
            </button>
            <Link to="/">
              <button className="payment">Continuar comprando</button>
            </Link>
          </div>
        </div>
      </div>
    </Default>
  );
}
