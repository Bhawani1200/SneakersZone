import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import AddressInfo from "./AddressInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../store/actions";
import toast from "react-hot-toast";
import Skeleton from "../shared/Skeleton";
import ErrorPage from "../shared/ErrorPage";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";
import StripePayment from "./Khalti";
import PaypalPayment from "./Esewa";

const steps = ["Address", "Payment Method", "Order Summary", "Payment"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  const { address, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth,
  );

  const { cart, totalPrice } = useSelector((state) => state.carts);

  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const { paymentMethod } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (activeStep === 0 && !selectedUserCheckoutAddress) {
      toast.error("Please select checkout address before proceeding");
      return;
    }

    if (activeStep === 1 && !paymentMethod) {
      toast.error("Please select payment address before proceeding");
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="pt-32 pb-14 min-h-[calc(100vh-100px)] flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-4">
        <Stepper activeStep={activeStep} alternativeLabel className="mt-20">
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full py-10">
        {isLoading ? (
          <div className="w-full max-w-5xl px-4">
            <Skeleton />
          </div>
        ) : (
          <div className="w-full px-4 flex justify-center">
            {activeStep === 0 && <AddressInfo address={address} />}
            {activeStep === 1 && <PaymentMethod />}
            {activeStep === 2 && (
              <OrderSummary
                totalPrice={totalPrice}
                cart={cart}
                address={selectedUserCheckoutAddress}
                paymentMethod={paymentMethod}
              />
            )}
            {activeStep == 3 && (
              <>
                {paymentMethod === "Stripe" ? (
                  <StripePayment />
                ) : (
                  <PaypalPayment />
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div
        className="flex justify-between items-center px-4 sticky z-50 h-24 bottom-0 bg-white w-full py-4 border-t border-slate-200"
        style={{ boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)" }}
      >
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>

        {activeStep !== steps.length - 1 && (
          <button
            disabled={
              errorMessage ||
              (activeStep === 0
                ? !selectedUserCheckoutAddress
                : activeStep === 1
                  ? !paymentMethod
                  : false)
            }
            className={`bg-blue-500 px-6 font-semibold h-10 rounded-md text-white
            ${
              errorMessage ||
              (activeStep === 0 && !selectedUserCheckoutAddress) ||
              (activeStep === 1 && !paymentMethod)
                ? "opacity-60"
                : ""
            }`}
            onClick={handleNext}
          >
            proceed
          </button>
        )}
      </div>
      {errorMessage && <ErrorPage message={errorMessage} />}
    </div>
  );
};

export default Checkout;
