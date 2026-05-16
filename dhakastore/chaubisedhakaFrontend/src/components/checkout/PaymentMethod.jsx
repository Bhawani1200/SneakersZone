import React, { useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod, createUserCart } from "../../store/actions";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector((state) => state.payment);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { cart, cartId } = useSelector((state) => state.carts);

  useEffect(() => {
    if (cart.length > 0 && !cartId && !errorMessage) {
      const sendCartItems = cart.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      });

      dispatch(createUserCart(sendCartItems));
    }
  }, [dispatch, cartId]);

  const paymentMethodHandler = (method) => {
    dispatch(addPaymentMethod(method));
  };

  return (
    <div className="max-w-3xl mx-auto p-5 bg-white dark:bg-zinc-900 shadow-md rounded-lg mt-16 border dark:border-zinc-800">
      <h1 className="font-semibold text-2xl mb-4">Select Payment method</h1>
      <FormControl>
        <FormControl>
          <RadioGroup
            aria-label="payment method"
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => paymentMethodHandler(e.target.value)}
          >
            <FormControlLabel
              value="Esewa"
              control={<Radio color="primary" />}
              label="Esewa"
              className="text-gray-700"
            />
            <FormControlLabel
              value="Khalti"
              control={<Radio color="primary" />}
              label="Khalti"
              className="text-gray-700"
            />
            <FormControlLabel
              value="Bank Transfer"
              control={<Radio color="primary" />}
              label="Bank Transfer (Nabil Bank)"
              className="text-gray-700"
            />
          </RadioGroup>
        </FormControl>
      </FormControl>
    </div>
  );
};

export default PaymentMethod;
