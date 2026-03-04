import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Add_user.css";

function Add_user() {
  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Handle registration form submit
  function handleRegister(e) {
    e.preventDefault();

    // Basic validation
    if (name === "" || email === "" || password === "") {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setSuccess("");
      return;
    }

    // No real backend — just show success and redirect
    setError("");
    setSuccess("Registration successful! Redirecting to login...");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <p className="auth-subtitle">Create your Handcraft Market account</p>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary">
            Register
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Add_user;