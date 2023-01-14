import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Cart from "./components/pages/Cart";
import Description from "./components/pages/Description";
import Registration from "./components/pages/Registration";
import "./style/home.css";
import "./style/login.css";
import "./style/produto.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Description/:id" element={<Description />} />
        <Route patch="/Registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
