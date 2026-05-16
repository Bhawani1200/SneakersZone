import React from "react";
const btnStyle = "border-[1.2px] border-slate-800 dark:border-zinc-300 dark:text-zinc-300 px-3 py-1 rounded-sm";
const SetQuantity = ({
  quantity,
  cardCounter,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex items-center gap-8 ">
      {cardCounter ? null : <div className="font-semibold">QUANTITY</div>}
      <div className="flex md:flex-row  flex-col gap-4 items-center lg:text-[22px] text-sm">
        <button
          disabled={quantity <= 1}
          className={btnStyle}
          onClick={handleQtyDecrease}
        >
          -
        </button>

        <div className="text-red-500">{quantity}</div>

        <button className={btnStyle} onClick={handleQtyIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
