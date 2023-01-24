import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Cart from "./components/pages/Cart";
import Description from "./components/pages/Description";
import Registration from "./components/pages/Registration";
import { AppProvider } from "./hooks/appContent";

import "./style/home.css";
import "./style/login.css";
import "./style/produto.css";
import "./style/carrinho.css";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/description/:productId" element={<Description />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
export default App;
