import { Link } from "react-router-dom";
import "./Navbar.css";

// cartCount prop is passed from App.jsx to show how many items are in cart
function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">🧺 Local Handcraft Market</div>

      <ul className="navbar-links">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/add-products">Add Product</Link>
        </li>
        <li>
          {/* Show cart item count as a badge */}
          <Link to="/cart">
            Cart
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </li>
        <li>
          <Link to="/login">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;