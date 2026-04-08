import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App.jsx";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/reducers/store.js";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}> */}
    <App />
    {/* <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#f0ede6",
          },
        }}
      />
    </ThemeProvider> */}
  </Provider>,
);
