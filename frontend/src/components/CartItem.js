import React from "react";
function CartItem({ item }) {
  return (
    <div className="p-3 ml-5 m-4 w-full md:w-4/5 lg:w-3/5 rounded shadow">
      <div className="flex flex-col md:flex-row">
        <div className="max-w-[200px] max-h-[200px] overflow-hidden">
          <img src={item.imageUrl} alt="" />
        </div>
        <div className="pl-7 mt-3 flex-1">
          <h3 className="font-sans font-semibold">{item.title}</h3>
          <div className="flex py-2">
            {Array(item.rating)
              .fill()
              .map((_) => (
                <p>⭐</p>
              ))}
          </div>
          <div className="flex items-center w-full">
            <p className="text-lg">
              Price : <strong className="text-xl">&#x20b9;{item.price}</strong>
            </p>
            <button className="p-2 bg-yellow-600 rounded text-white ml-auto">
              Remove from cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
