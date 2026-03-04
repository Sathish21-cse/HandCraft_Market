import { useState } from "react";
import "./Products.css";

// Props:
// products  = list of all products from App.jsx state
// addToCart = function from App.jsx to add item to cart
function Products({ products, addToCart }) {
  // Local quantity state for each product card
  // We use an object: { productId: quantity }
  // e.g. { 1: 2, 3: 1 }
  const [quantities, setQuantities] = useState({});

  // Increase quantity of a specific product
  function increaseQty(productId) {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  }

  // Decrease quantity, but not below 1
  function decreaseQty(productId) {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) - 1, 1),
    }));
  }

  // Get the current quantity for a product (default 1)
  function getQty(productId) {
    return quantities[productId] || 1;
  }

  // When "Add to Cart" button is clicked
  function handleAddToCart(product) {
    const qty = getQty(product.id);
    addToCart(product, qty);

    // Optional: reset this product's quantity back to 1 after adding
    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));

    alert(`"${product.name}" (x${qty}) added to cart!`);
  }

  return (
    <div className="products-container">
      <h2>Our Products</h2>
      <p className="page-subtitle">Browse all available handcraft items.</p>

      {products.length === 0 ? (
        <p className="empty-msg">
          No products available.{" "}
          <a href="/add-products">Add some products first.</a>
        </p>
      ) : (
        /* Product cards in a flexbox row that wraps */
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />

              {/* Product Info */}
              <div className="product-info">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-price">₹{product.price}</p>
              </div>

              {/* Quantity Selector: - / number / + */}
              <div className="quantity-selector">
                <button
                  className="qty-btn"
                  onClick={() => decreaseQty(product.id)}
                >
                  −
                </button>
                <span className="qty-display">{getQty(product.id)}</span>
                <button
                  className="qty-btn"
                  onClick={() => increaseQty(product.id)}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                className="btn-cart"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;