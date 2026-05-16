import React from "react";
import { formatPrice, formatPriceCalculation } from "../../utils/formatPrice";
import { formatImageUrl } from "../../utils/formatImageUrl";

const OrderSummary = ({ totalPrice, address, cart, paymentMethod }) => {
  return (
    <div className="container mx-auto px-4 mt-14 mb-8">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 pr-4">
          <div className="space-y-4">
            <div className="p-4 border dark:border-zinc-800 dark:bg-zinc-900 rounded-lg shadow-xs">
              <h2 className="text-2xl font-semibold mb-2">Billing Address</h2>
              <p>
                <strong>Building Name:</strong>
              </p>
              <p>
                <strong>City: </strong>
                {address?.city}
              </p>
              <p>
                <strong>Street: </strong>
                {address?.street}
              </p>
              <p>
                <strong>State: </strong>
                {address?.state}
              </p>
              <p>
                <strong>Pincode: </strong>
                {address?.pincode}
              </p>
              <p>
                <strong>Country: </strong>
                {address?.country}
              </p>
              <p>
                <strong>NagarOrGaupalika: </strong>
                {address?.nagarOrGaupalika}
              </p>
              <p>
                <strong>WardNo: </strong>
                {address?.wardNo}
              </p>
            </div>
            <div className="p-4 border dark:border-zinc-800 dark:bg-zinc-900 rounded-lg shadow-xs">
              <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </div>

            <div className="p-4 border dark:border-zinc-800 dark:bg-zinc-900 rounded-lg shadow-xs mb-6">
              <h2 className="text-2xl font-semibold mb-2">Order Items</h2>
              <div className="space-y-2">
                {cart?.map((item) => (
                  <div key={item?.productId} className="flex items-center">
                    <img
                      src={formatImageUrl(item?.image)}
                      // alt="Product"
                      className="w-12 h-12 rounded-sm"
                    ></img>
                    <div className="text-gray-500">
                      <p>{item?.productName}</p>
                      <p>
                        {item?.quantity} x रु.{item?.specialPrice}=रु.
                        {formatPriceCalculation(
                          item?.quantity,
                          item?.specialPrice,
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-4/12 mt-4 lg:mt-0">
          <div className="border dark:border-zinc-800 dark:bg-zinc-900 rounded-lg shadow-xs p-4 space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Products</span>
                <span>रु.{formatPriceCalculation(totalPrice, 1)}</span>
                <span>{(totalPrice, 1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (0%)</span>
                <span>0.00</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>SubTotal</span>
                <span>रु.{formatPriceCalculation(totalPrice, 1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
