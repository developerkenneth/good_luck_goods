import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Category from "./pages/Category";
import ScrollToTop from "./components/ScrollToTop";
import ShowCats from "./pages/ShowCats";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/categories" element={<ShowCats />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/category/:slug" element={<Category />} />
        </Route>
      </Routes>
    </Router>
  );
}
