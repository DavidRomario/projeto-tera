import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Default from "../templates/Default";
import { Link } from "react-router-dom";
import axios from "axios";
import { useApp } from "../../hooks/appContent";

export default function Home() {
  const [productsData, setProductsData] = useState([]);
  const { input } = useApp();
  // const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const products = productsData.filter(({ name }) => {
    const nameProduct = `${name.toLowerCase()}`;

    return nameProduct.includes(input);
  });

  async function allProducts() {
    const response = await axios.get("http://localhost:3030/products/all", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setProductsData(response.data.payload);
  }
  const handleClick = (event) => {
    navigate(`/description/${event.currentTarget.id}`);
  };

  useEffect(() => {
    allProducts();
  }, []);

  // const nextPage = () => {
  //   setPage(page + 1);
  // };

  // const previousPage = () => {
  //   if (page !== 1) {
  //     setPage(page - 1);
  //   }
  // };

  return (
    <Default>
      <div>
        <section>
          {products.map((product) => (
            <div
              id={`${product._id}`}
              className="tenis-content"
              onClick={handleClick}
            >
              <Link>
                <img className="image" src={`${product.image}`} alt="" />
              </Link>
              <div className="caracters">
                <Link className="productName">{`${product.name}`}</Link>
                <p className="genero">{`${product.category}`}</p>
                <p className="frete">Frete Gratis</p>
                <p className="price">{`${product.price}`}</p>
                <p className="parcelas">{`${product.billing}`}</p>
              </div>
            </div>
          ))}
        </section>
        {/* <div className="repagination">
          <button className="refresh" onClick={() => previousPage()}>
            anterior
          </button>
          <button className="refresh" onClick={() => nextPage()}>
            proximo
          </button>
        </div> */}
      </div>
    </Default>
  );
}
