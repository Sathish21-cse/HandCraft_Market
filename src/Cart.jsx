import "./Cart.css";

// Props:
// cart               = array of cart items from App.jsx state
// updateCartQuantity = function to change quantity or remove item
function Cart({ cart, updateCartQuantity }) {
  // Calculate the grand total of all items
  // price * quantity for each item, then sum all
  const grandTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <p className="page-subtitle">Review your selected items below.</p>

      {/* Show empty state if cart is empty */}
      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <a href="/products" className="btn-go-shop">
            Browse Products
          </a>
        </div>
      ) : (
        <>
          {/* Cart Items Table */}
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  {/* Product info with image */}
                  <td className="cart-product-cell">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                    />
                    <span>{item.name}</span>
                  </td>

                  {/* Unit price */}
                  <td>₹{item.price}</td>

                  {/* Quantity controls */}
                  <td>
                    <div className="cart-qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Line total = price × quantity */}
                  <td className="item-total">
                    ₹{item.price * item.quantity}
                  </td>

                  {/* Remove button — sets quantity to 0 which triggers removal */}
                  <td>
                    <button
                      className="btn-remove"
                      onClick={() => updateCartQuantity(item.id, 0)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Grand Total row */}
          <div className="cart-summary">
            <span className="grand-total-label">Grand Total:</span>
            <span className="grand-total-value">₹{grandTotal}</span>
          </div>

          {/* Checkout button — frontend only, just shows alert */}
          <button
            className="btn-checkout"
            onClick={() => alert("Order placed successfully! (Demo only)")}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;