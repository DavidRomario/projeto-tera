import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Default from "../templates/Default";
import { Link } from "react-router-dom";

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

      setTimeout(() => {
        setProductsOnLocalStorage(response.data.payload[0]);
      }, 3000);
    }
  }

  const handleClick = (event) => {
    navigate(`/cart`);
  };

  const setProductsOnLocalStorage = async (productData) => {
    const selectedProduct = productData;
    const storage = localStorage.getItem("products");
    const productsList = JSON.stringify(selectedProduct);

    if (storage == null) {
      localStorage.setItem("products", productsList);
    } else {
      const products = [];
      const storageProducts = storage;

      products.push(storageProducts);
      products.push(productsList);

      localStorage.setItem("products", products);
    }
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
              <Link>
                <button className="press" onClick={handleClick}>
                  Adicionar ao carrinho
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </Default>
  );
}
