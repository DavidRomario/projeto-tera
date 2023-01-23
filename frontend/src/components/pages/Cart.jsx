import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Default from "../templates/Default";

export default function Cart() {
  const [products, setProducts] = useState([]);

  const getProductsFromLocalStorage = () => {
    const productsFromStorage = localStorage.getItem("products");

    setProducts(JSON.parse(productsFromStorage));
  };

  useEffect(() => {
    getProductsFromLocalStorage();
  }, []);
  return (
    <Default>
      <div>
        <section>
          {products.map((product) => (
            <div id={`${product._id}`} className="tenis-content">
              <img className="image" src={`${product.image}`} alt="" />

              <Link className="productName">{`${product.name}`}</Link>
              <p className="genero">{`${product.category}`}</p>
              <p className="frete">Frete Gratis</p>
              <p>{`${product.price}`}</p>
              <p className="parcelas">{`${product.billing}`}</p>
            </div>
          ))}
        </section>
      </div>
    </Default>
  );
}
