import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Default from "../templates/Default";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentsProduct, setCurrentUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/products/all")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleClick = (event) => {
    navigate(`/Description/${event.currentTarget.id}`);
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
              <a href="">
                <img
                  className="image"
                  src={`${product.imagem}`}
                  alt=""
                  href=""
                />
              </a>
              <a href="" className="name">
                {`${product.nome}`}
              </a>
              <p className="genero">{`${product.genero}`}</p>
              <p className="frete">Frete Gratis</p>
              <p>{`${product.valor}`}</p>
              <p className="parcelas">{`${product.parcela}`}</p>
            </div>
          ))}
        </section>
      </div>
    </Default>
  );
}
