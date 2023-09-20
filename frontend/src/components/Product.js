import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
function Product({ product }) {
  const imageUrl = product.images[0].url;
  const name = product.name;
  const price = product.price;
  const ratings = product.ratings;

  const options = {
    color: "rgba(20, 20, 20, 0.2)",
    activeColor: "tomato",
    value: ratings,
    count: 5,
    size: 25,
    isHalf: true,
  };

  return (
    <div className="p-5 bg-white box-shadow z-10 flex flex-col justify-between product">
      <Link to={`/product/${product._id}`}>
        <div className="mb-2 p-2">
          <img
            src={imageUrl}
            alt="Products"
            className="w-[150px] mx-auto hover:scale-[1.2] duration-100 mx-auto w-[130px] h-[170px]"
          />
        </div>
      </Link>
      <div className="text-center">
        <p className="font-sans pb-2 text-left font-semibold">{name}</p>
        <div className="flex justify-between">
          <ReactStars {...options} />
          <p className="">
            <strong className="text-xl text-[#222]">&#x20b9;{price}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Product;
