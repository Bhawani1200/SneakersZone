import React from "react";
import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.carts);
  const newCart = { ...cart };

  newCart.totalPrice = cart?.reduce(
    (acc, cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity),
    0
  );

  if (!cart || cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="lg:px-14 md:px-8 px-4 py-10">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold flex items-center text-gray-900 dark:text-white gap-3">
          <MdShoppingCart size={45} className="text-gray-700 dark:text-zinc-300" />
          Your Cart
        </h1>
        <p className="font-lg text-gray-600 dark:text-zinc-400 mt-2">All your selected items</p>
      </div>
      <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold items-center">
        <div className="md:col-span-2 justify-self-start text-lg text-slate-800 dark:text-zinc-200 lg:ps-4">
          Product
        </div>
        <div className="justify-self-center text-slate-800 dark:text-zinc-200">Price</div>

        <div className="justify-self-center text-slate-800 dark:text-zinc-200">Quantity</div>
        <div className="justify-self-center text-slate-800 dark:text-zinc-200">Total</div>
      </div>

      <div>
        {cart &&
          cart.length > 0 &&
          cart.map((item, i) => <ItemContent key={i} {...item} />)}
      </div>

      <div className="border-t-[1.5px] border-slate-200 dark:border-zinc-800 py-4 flex sm:flex-row sm:px-0 px-2 flex-cl sm:justify-between gap-4 ">
        <div></div>
        <div className="flex test-sm gap-1 flex-col">
          <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
            <span>Sub-total</span>
            <span>{formatPrice(newCart?.totalPrice)}</span>
          </div>
          <p className="text-slate-500 dark:text-zinc-400">
            Shipping and taxes calculated at checkout
          </p>
          <Link className="w-full flex justify-end" to="/checkout">
            <button className="text-1.5xl font-semibold w-[300px] py-2 px-4 rounded-md bg-blue-600 text-white flex items-center justify-center gap-2 hover:text-gray-300 transition duration-500">
              <MdShoppingCart size={25} />
              Checkout
            </button>
          </Link>
          <Link
            className="flex items-center mt-2 gap-2 text-slate-500 dark:text-zinc-400"
            to="/products"
          >
            <span className="flex items-center gap-2">
              <MdArrowBack />
              Continue shopping
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
