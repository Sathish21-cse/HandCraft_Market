import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Login from "./Login";
import Add_user from "./Add_user";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Add_products from "./Add_products";
import Cart from "./Cart";

import "./App.css";

function App() {
  const location = useLocation();
  
  // Hide navbar on login and register pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/";

  // ------------------------------------
  // Shared state: products list
  // Used in Add_products (add) and Products (display)
  // ------------------------------------
  const [products, setProducts] = useState([
    // Some default sample products to start with
    {
      id: 1,
      name: "Handmade Basket",
      price: 250,
      image: "https://via.placeholder.com/200x150?text=Basket",
    },
    {
      id: 2,
      name: "Clay Pot",
      price: 180,
      image: "https://via.placeholder.com/200x150?text=Clay+Pot",
    },
    {
      id: 3,
      name: "Wooden Toy",
      price: 320,
      image: "https://via.placeholder.com/200x150?text=Wooden+Toy",
    },
  ]);

  // ------------------------------------
  // Shared state: cart items
  // Used in Products (add to cart) and Cart (display)
  // ------------------------------------
  const [cart, setCart] = useState([]);

  // ------------------------------------
  // Function: Add a new product to the products list
  // Called from Add_products page
  // ------------------------------------
  function addProduct(newProduct) {
    setProducts((prev) => [...prev, newProduct]);
  }

  // ------------------------------------
  // Function: Add product to cart OR increase quantity if already in cart
  // Called from Products page
  // ------------------------------------
  function addToCart(product, quantity) {
    // Check if this product is already in cart
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // If already in cart, just update the quantity
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Add new item to cart
      setCart((prev) => [...prev, { ...product, quantity: quantity }]);
    }
  }

  // ------------------------------------
  // Function: Update quantity of item in cart
  // Called from Cart page
  // ------------------------------------
  function updateCartQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      // Remove item from cart if quantity reaches 0
      setCart((prev) => prev.filter((item) => item.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }

  return (
    <>
      {/* Navbar is hidden on login/register pages */}
      {!hideNavbar && <Navbar cartCount={cart.length} />}

      <div className="page-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Add_user />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                totalProducts={products.length}
                totalCartItems={cart.length}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products products={products} addToCart={addToCart} />
            }
          />
          <Route
            path="/add-products"
            element={
              <Add_products products={products} addProduct={addProduct} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart cart={cart} updateCartQuantity={updateCartQuantity} />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;