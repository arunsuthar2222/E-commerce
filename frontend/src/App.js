import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Catagory from "./components/Catagory";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
import ProductDetail from "./components/ProductDetail";
import Footer from "./components/Footer";
import Products from "./components/Products";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header />
                <Catagory />
                <Home />
                <Footer />
              </>
            }
          ></Route>
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route
            exact
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
                <Footer />
              </>
            }
          ></Route>
          <Route
            exact
            path="product/:productId"
            element={
              <>
                <Header />
                <ProductDetail />
                <Footer />
              </>
            }
          ></Route>

          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
