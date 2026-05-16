import React from "react";
import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="min-h-[800px] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-slate-700 dark:text-zinc-300">
          <MdShoppingCart size={80} className="mb-4 text-slate-500 dark:text-zinc-400" />
          Your Cart is Empty.
        </div>
        <div className="text-lg text-slate-500 dark:text-zinc-400 mt-2">
          Add some products to the cart.
        </div>
      </div>
      <div className="mt-6">
        <Link
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition"
          to="/"
        >
          <MdArrowBack size={24} />
          <span className="text-2xl">Start shopping.</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
