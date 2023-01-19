import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Default from "../templates/Default";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  async function allProducts() {
    const response = await axios.get("http://localhost:3030/products/all", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setProducts(response.data.payload);
  }
  const handleClick = (event) => {
    navigate(`/Description/${event.currentTarget.id}`);
  };

  useEffect(() => {
    allProducts();
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

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
              <Link className="productName">{`${product.name}`}</Link>
              <p className="genero">{`${product.category}`}</p>
              <p className="frete">Frete Gratis</p>
              <p>{`${product.price}`}</p>
              <p className="parcelas">{`${product.billing}`}</p>
            </div>
          ))}
        </section>
        <div className="repagination">
          <button className="refresh" onClick={() => previousPage()}>
            anterior
          </button>
          <button className="refresh" onClick={() => nextPage()}>
            proximo
          </button>
        </div>
      </div>
    </Default>
  );
}
