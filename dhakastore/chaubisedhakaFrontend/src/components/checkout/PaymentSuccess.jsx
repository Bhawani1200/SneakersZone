import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle, Download, ShoppingBag } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const transactionId = searchParams.get("transactionId");
    const status = searchParams.get("status");
    
    if (transactionId && status === "SUCCESS") {
      verifyPayment(transactionId);
    }
  }, [searchParams]);

  const verifyPayment = async (transactionId) => {
    try {
      const response = await axios.get(`/api/payments/esewa/verify`, {
        params: { transactionId, status: "SUCCESS" }
      });
      setPaymentDetails(response.data);
    } catch (error) {
      console.error("Payment verification failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = async () => {
    if (paymentDetails?.transactionId) {
      // Implement receipt download
      window.open(`/api/payments/esewa/receipt/${paymentDetails.transactionId}`, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-zinc-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-green-600 p-6 text-center">
          <CheckCircle className="w-20 h-20 text-white mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Payment Successful!</h1>
          <p className="text-green-100 mt-2">Thank you for your purchase</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-semibold">{paymentDetails?.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-bold text-green-600">Rs. {paymentDetails?.orderDetails?.totalAmount}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={downloadReceipt}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Receipt
            </button>
            
            <button
              onClick={() => navigate("/orders")}
              className="w-full border-2 border-green-600 text-green-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
