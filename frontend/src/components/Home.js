import React, { useEffect } from "react";
import Banner from "./Banner";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import Loader from "../loader/Loader";
import Product from "./Product";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/prouductActions";

function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { product, loading, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="home pb-6">
        <Banner />
        <div className="pr-4 bg-[rgba(0, 0, 0, 0.3)]">
          <div className="homeProduct container mx-auto gap-3">
            {product &&
              product.map((product) => (
                <Product
                  key={product._id}
                  className="homeItem"
                  product={product}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
