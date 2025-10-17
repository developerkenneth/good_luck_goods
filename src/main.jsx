import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalState from "./context/ProductContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalState>
      <CartProvider>
        <App />
      </CartProvider>
    </GlobalState>
  </StrictMode>
);
