import { useState } from "react";
import "./Add_products.css";

// Props:
// products  = the current list of products (from App.jsx state)
// addProduct = function to add a new product (from App.jsx)
function Add_products({ products, addProduct }) {
  // Local state for the form inputs
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Validate: name and price are required
    if (name.trim() === "" || price === "") {
      setError("Product name and price are required.");
      setSuccessMsg("");
      return;
    }

    // Price must be a positive number
    if (isNaN(price) || Number(price) <= 0) {
      setError("Please enter a valid price.");
      setSuccessMsg("");
      return;
    }

    // Create the new product object
    const newProduct = {
      id: Date.now(), // Use timestamp as a simple unique ID
      name: name.trim(),
      price: Number(price),
      // If no image URL provided, use a placeholder
      image:
        image.trim() !== ""
          ? image.trim()
          : `https://via.placeholder.com/200x150?text=${encodeURIComponent(name.trim())}`,
    };

    // Call the function from App.jsx to add to shared state
    addProduct(newProduct);

    // Show success message
    setError("");
    setSuccessMsg(`"${newProduct.name}" added successfully!`);

    // Clear the form
    setName("");
    setPrice("");
    setImage("");
  }

  return (
    <div className="add-products-container">
      <h2>Add New Product</h2>
      <p className="page-subtitle">Fill in the details to list a new handcraft item.</p>

      {/* --- Product Form --- */}
      <div className="product-form-box">
        {error && <p className="error-msg">{error}</p>}
        {successMsg && <p className="success-msg">{successMsg}</p>}

        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              placeholder="e.g. Handwoven Basket"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label>Price (₹) *</label>
            <input
              type="number"
              placeholder="e.g. 250"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="1"
            />
          </div>

          {/* Image URL (optional) */}
          <div className="form-group">
            <label>Image URL (optional)</label>
            <input
              type="text"
              placeholder="Paste image link or leave blank"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-add">
            + Add Product
          </button>
        </form>
      </div>

      {/* --- Products List Below Form --- */}
      <div className="added-products-section">
        <h3>All Products ({products.length})</h3>

        {products.length === 0 ? (
          <p className="empty-msg">No products added yet.</p>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through all products and display */}
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="table-product-img"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Add_products;