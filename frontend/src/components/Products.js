import React, { useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, clearErrors } from "../actions/prouductActions";
import Product from "./Product";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import { Typography } from "@mui/material";
import { Slider } from "@mui/material";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Gadget",
  "Camera",
  "SmartPhones",
];
function Products() {
  const alert = useAlert();
  const params = useParams();
  const dispatch = useDispatch();
  const [price, setPrice] = useState([0, 25000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const {
    product,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(
      getProducts(
        params.keyword,
        currentPage,
        price[0],
        price[1],
        category,
        ratings
      )
    );
  }, [
    dispatch,
    params.keyword,
    currentPage,
    price,
    category,
    ratings,
    alert,
    error,
  ]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div>
        <h2 className="productsHeading">Products</h2>
        <div className="products">
          {product &&
            product.map((product) => (
              <div>
                <Product key={product._id} product={product} />
              </div>
            ))}
        </div>
        <div className="filterBox">
          <Typography>Price</Typography>
          <Slider
            size="small"
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={25000}
          ></Slider>
          <Typography>Categories</Typography>
          <ul className="categoryBox">
            {categories.map((category) => (
              <li
                className="category-link"
                key={category}
                onClick={() => {
                  setCategory(category);
                }}
              >
                {category}
              </li>
            ))}
          </ul>
          <fieldset>
            <Typography component="legend">Ratings Above</Typography>
            <Slider
              size="small"
              value={ratings}
              onChange={(e, newRating) => {
                setRatings(newRating);
              }}
              aria-labelledby="continuous-slider"
              min={0}
              max={5}
            ></Slider>
          </fieldset>
        </div>
        {resultPerPage < filteredProductsCount && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="PageLinkActive"
            ></Pagination>
          </div>
        )}
      </div>
    );
  }
}

export default Products;
