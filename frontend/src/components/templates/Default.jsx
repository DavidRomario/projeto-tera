import React from "react";
import Header from "../organisms/Header";
import List from "../organisms/List";
import Footer from "../organisms/Footer";

export default function Default(props) {
  return (
    <div>
      <Header />
      <List />
      {props.children}
      <Footer />
    </div>
  );
}
