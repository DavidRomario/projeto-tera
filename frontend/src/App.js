import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Cart from "./components/pages/Cart";
import Description from "./components/pages/Description";
import Registration from "./components/pages/Registration";
import Order from "./components/pages/Order";
import MyAccount from "./components/pages/MyAccount";
import ForgotPassword from "./components/pages/ForgotPassword";
import EditUser from "./components/pages/EditUser";
import RedefinePassword from "./components/pages/RedefinePassword";
import { AppProvider } from "./hooks/appContent";

import "./style/home.css";
import "./style/login.css";
import "./style/produto.css";
import "./style/carrinho.css";
import "./style/myaccount.css";
import "./style/order.css";
import "./style/forgot-password.css";
import "./style/redefinepassword.css";

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
          <Route path="/order" element={<Order />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/edit-user/:userId" element={<EditUser />} />
          <Route path="/password/:hash" element={<RedefinePassword />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
export default App;
