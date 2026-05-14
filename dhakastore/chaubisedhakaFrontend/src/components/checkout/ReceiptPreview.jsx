import React from "react";
import {
  ShoppingCart,
  User,
  Hash,
  Calendar,
  Smartphone,
  Receipt,
} from "lucide-react";

const ReceiptPreview = ({ cart, amount, orderId, user, paymentMethod }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden mb-6">
      {/* Receipt Header */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
        <h3 className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
          <Receipt className="w-5 h-5 text-green-600" />
          Receipt Preview
        </h3>
        <span className="text-xs font-semibold px-2 py-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-full">
          DRAFT
        </span>
      </div>

      {/* Receipt Body */}
      <div className="p-5 space-y-4 text-sm">
        {/* Customer & Order Details */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-dashed border-zinc-200 dark:border-zinc-700">
          <div>
            <span className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider block mb-1">
              Customer
            </span>
            <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-medium">
              <User className="w-4 h-4 text-zinc-400" />
              <span className="truncate">{user?.username || "Guest User"}</span>
            </div>
          </div>
          <div>
            <span className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider block mb-1">
              Order ID
            </span>
            <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-medium">
              <Hash className="w-4 h-4 text-zinc-400" />
              <span className="truncate">{orderId}</span>
            </div>
          </div>
          <div>
            <span className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider block mb-1">
              Date
            </span>
            <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-medium">
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          <div>
            <span className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider block mb-1">
              Payment Method
            </span>
            <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-medium">
              <Smartphone className="w-4 h-4 text-zinc-400" />
              <span>{paymentMethod}</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <span className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider block mb-3 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Order Items
          </span>
          <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
            {cart?.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex flex-col max-w-[70%]">
                    <span className="text-zinc-800 dark:text-zinc-200 font-medium truncate">
                      {item.productName}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400 text-xs">
                      Qty: {item.quantity} × रु. {item.specialPrice}
                    </span>
                  </div>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    रु. {(item.specialPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center text-zinc-500 py-2 text-xs italic">
                No items in cart
              </div>
            )}
          </div>
        </div>

        {/* Total */}
        <div className="pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
          <span className="font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider text-sm">
            Total Amount
          </span>
          <span className="text-xl font-bold text-green-600">
            Rs. {amount?.toFixed(2) || "0.00"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPreview;
