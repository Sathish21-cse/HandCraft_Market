import "./Dashboard.css";

// Props come from App.jsx
// totalProducts = products.length
// totalCartItems = cart.length
function Dashboard({ totalProducts, totalCartItems }) {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p className="dashboard-subtitle">Welcome! Here's a quick summary.</p>

      {/* Summary cards */}
      <div className="summary-cards">
        {/* Card 1: Total Products */}
        <div className="summary-card">
          <div className="summary-icon">📦</div>
          <div className="summary-info">
            <h3>{totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>

        {/* Card 2: Total Cart Items */}
        <div className="summary-card">
          <div className="summary-icon">🛒</div>
          <div className="summary-info">
            <h3>{totalCartItems}</h3>
            <p>Items in Cart</p>
          </div>
        </div>
      </div>

      {/* Quick navigation links */}
      <div className="dashboard-links">
        <a href="/products" className="dash-link">
          Browse Products →
        </a>
        <a href="/add-products" className="dash-link">
          Add New Product →
        </a>
        <a href="/cart" className="dash-link">
          View Cart →
        </a>
      </div>
    </div>
  );
}

export default Dashboard;