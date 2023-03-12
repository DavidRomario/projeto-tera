import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Default from "../templates/Default";

export default function Description() {
  const [product, setProduct] = useState([]);
  const { productId } = useParams();
  const navigate = useNavigate();

  async function getProduct() {
    const response = await axios.get(
      `http://localhost:3030/products/${productId}`
    );
    if (response.data.success) {
      setProduct(response.data.payload[0]);
    }
  }

  const handleClick = () => {
    setProductsOnLocalStorage();
    navigate("/cart");
  };

  const setProductsOnLocalStorage = async () => {
    const products = localStorage.getItem("products");
    const insertProducts = [];
    if (!products) {
      insertProducts.push(product);
      localStorage.setItem("products", JSON.stringify(insertProducts));
    } else {
      const listProducts = JSON.parse(products);
      listProducts.push(product);
      localStorage.setItem("products", JSON.stringify(listProducts));
    }
    const products2 = localStorage.getItem("products");

    console.log(products2);
  };

  const getProductsFromLocalStorage = () => {
    const products = localStorage.getItem("products");
  };

  useEffect(() => {
    getProduct();
    getProductsFromLocalStorage();
  }, []);
  return (
    <Default>
      <div>
        <main>
          <div className="product">
            <img className="img" src={`${product.image}`} alt="" />
            <p className="name">{`${product.name}`}</p>
            <p className="preço">{`${product.price}`}</p>
            <p className="descricao">{`${product.description}`}</p>
            <div>
              <button className="press" onClick={(e) => handleClick()}>
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </main>
      </div>
    </Default>
  );
}
