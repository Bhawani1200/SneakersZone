import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Alert, AlertTitle } from "@mui/material";
import {
  CreditCard,
  Smartphone,
  Receipt,
  Download,
  ShoppingCart,
} from "lucide-react";
import ReceiptPreview from "./ReceiptPreview";

const Esewa = ({ orderId, amount, productName, onSuccess, onFailure }) => {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState(() => {
    const saved = localStorage.getItem("esewa_transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const { cart, totalPrice } = useSelector((state) => state.carts);
  const { user, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth,
  );

  const dynamicAmount = amount || totalPrice;
  const dynamicOrderId = orderId || `ORD-${Date.now()}`;
  const dynamicProductName =
    productName ||
    (cart?.length > 0
      ? `${cart[0].productName}${cart.length > 1 ? ` + ${cart.length - 1} more` : ""}`
      : "Order from Chaubise Dhaka");

  const trackTransaction = (details) => {
    const newTransactions = [details, ...recentTransactions].slice(0, 5);
    setRecentTransactions(newTransactions);
    localStorage.setItem("esewa_transactions", JSON.stringify(newTransactions));
  };

  const downloadReceipt = async (transactionId, localData = null) => {
    try {
      let receiptData = localData;
      if (!receiptData) {
        const response = await axios.get(
          `/api/payments/esewa/receipt/${transactionId}`,
        );
        receiptData = response.data;
      }

      const receiptHtml = generateReceiptHTML(receiptData);

      const blob = new Blob([receiptHtml], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `receipt_${transactionId}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading receipt:", error);
    }
  };

  const generateReceiptHTML = (data) => {
    const itemsHtml = data.items
      ? data.items
          .map(
            (item) => `
      <div class="row">
        <span>${item.productName} (x${item.quantity})</span>
        <span>Rs. ${(item.specialPrice * item.quantity).toFixed(2)}</span>
      </div>
    `,
          )
          .join("")
      : "";

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
          }
          .receipt {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
          }
          .details {
            margin: 20px 0;
          }
          .row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
          }
          .items-header {
            font-weight: bold;
            margin-top: 20px;
            padding-bottom: 5px;
            border-bottom: 1px solid #4CAF50;
            color: #4CAF50;
          }
          .total {
            font-size: 18px;
            font-weight: bold;
            color: #4CAF50;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #4CAF50;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div class="logo">CHAUBISE DHAKA</div>
            <div>Payment Receipt</div>
          </div>
          <div class="details">
            <div class="row">
              <span>Transaction ID:</span>
              <span>${data.transactionId}</span>
            </div>
            <div class="row">
              <span>Order ID:</span>
              <span>${data.orderId}</span>
            </div>
            <div class="row">
              <span>Customer Name:</span>
              <span>${data.customerName}</span>
            </div>
            <div class="row">
              <span>Payment Date:</span>
              <span>${new Date(data.paymentDate).toLocaleString()}</span>
            </div>
            
            <div class="items-header">Order Details</div>
            ${itemsHtml}

            <div class="row total">
              <span>Total Amount:</span>
              <span>Rs. ${data.totalAmount}</span>
            </div>
          </div>
          <div class="footer">
            Thank you for shopping with us!
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const initiatePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/payments/esewa/initiate", {
        amount: dynamicAmount,
        orderId: dynamicOrderId,
        productName: dynamicProductName,
        returnUrl: `${window.location.origin}/payment/success`,
        failureUrl: `${window.location.origin}/payment/failure`,
      });

      trackTransaction({
        orderId: dynamicOrderId,
        amount: dynamicAmount,
        date: new Date().toISOString(),
        status: "Initiated",
      });

      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
        setPaymentUrl(response.data.paymentUrl);
      }

      onSuccess && onSuccess(response.data);
    } catch (error) {
      console.error("Payment initiation failed:", error);
      onFailure && onFailure(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadOrderReceipt = () => {
    const receiptData = {
      transactionId: "PRE-PAY-" + Date.now(),
      orderId: dynamicOrderId,
      customerName: user?.username || "Guest",
      customerEmail: user?.email || "N/A",
      totalAmount: dynamicAmount,
      paymentMethod: "ESEWA (Pending)",
      paymentStatus: "INITIATED",
      paymentDate: new Date().toISOString(),
      items: cart,
    };
    downloadReceipt(receiptData.transactionId, receiptData);
  };

  const downloadLogo = () => {
    const link = document.createElement("a");
    link.href = "/images/ExampleCode.png";
    link.download = "esewa-qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden">
        {/* Header with Esewa Logo */}
        <div className="bg-green-600 p-6 text-white text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/images/esewa-logo.svg"
              alt="Esewa"
              className="h-16 w-auto bg-white rounded-lg p-2"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/80?text=Esewa";
              }}
            />
          </div>
          <h2 className="text-2xl font-bold">Esewa Payment</h2>
          <p className="text-green-100 mt-2">Secure & Fast Payment</p>
        </div>

        {/* Payment Details */}
        <div className="p-6">
          <ReceiptPreview
            cart={cart}
            amount={dynamicAmount}
            orderId={dynamicOrderId}
            user={user}
            paymentMethod="Esewa Wallet"
          />

          {/* QR Code Section */}
          <div className="mb-6 p-4 border-2 border-dashed border-green-200 dark:border-green-900 rounded-2xl bg-white dark:bg-zinc-800 flex flex-col items-center">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
              Scan to Pay Directly
            </h3>
            <div className="relative group">
              <img
                src="/images/ExampleCode.png"
                alt="Esewa QR Code"
                className="w-48 h-48 object-contain rounded-lg shadow-sm mb-3"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/200?text=Scan+to+Pay";
                }}
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none"></div>
            </div>
            <button
              onClick={downloadLogo}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm transition-colors py-2 px-4 rounded-full bg-green-50 hover:bg-green-100"
            >
              <Download className="w-4 h-4" />
              Download QR Code
            </button>
          </div>

          {/* Payment Instructions */}
          <Alert severity="info" className="mb-4">
            <AlertTitle>How to pay with Esewa?</AlertTitle>
            <ul className="text-sm list-disc list-inside mt-2 space-y-1">
              <li>Scan the QR code above or click "Pay with Esewa"</li>
              <li>You'll be redirected to Esewa payment page</li>
              <li>Enter your Esewa registered mobile number</li>
              <li>Confirm payment using OTP/MPIN</li>
              <li>Download receipt after successful payment</li>
            </ul>
          </Alert>

          {/* Action Buttons */}
          <div className="space-y-3 mt-6">
            <button
              onClick={initiatePayment}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Pay with Esewa
                </>
              )}
            </button>

            <button
              onClick={downloadOrderReceipt}
              className="w-full border-2 border-green-600 text-green-600 dark:text-green-400 font-bold py-3 px-6 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-all flex items-center justify-center gap-2"
            >
              <Receipt className="w-5 h-5" />
              Download Order Summary Receipt
            </button>

            {recentTransactions.length > 0 && (
              <div className="mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                  Recent Activity
                </h4>
                <div className="space-y-2">
                  {recentTransactions.map((tx, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-xs bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded-lg"
                    >
                      <div>
                        <span className="font-semibold text-zinc-600 dark:text-zinc-300">
                          {tx.orderId}
                        </span>
                        <div className="text-[10px] text-zinc-400">
                          {new Date(tx.date).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-zinc-600 dark:text-zinc-300">
                          Rs. {tx.amount.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-green-500 font-semibold">
                          {tx.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={downloadLogo}
              className="w-full border-2 border-zinc-400 text-zinc-600 dark:text-zinc-400 font-bold py-3 px-6 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Esewa QR Code
            </button>

            <Alert variant="outlined" severity="info" className="mt-4">
              <AlertTitle>Esewa Number</AlertTitle>
              Use esewa number: <strong>9806800001</strong>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Esewa;
