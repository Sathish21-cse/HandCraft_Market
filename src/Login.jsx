import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  function handleLogin(e) {
    e.preventDefault();

    // Simple validation - just check if fields are filled
    if (email === "" || password === "") {
      setError("Please fill in all fields.");
      return;
    }

    // Accept any login credentials
    setError("");
    navigate("/dashboard");
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <p className="auth-subtitle">Welcome back to Handcraft Market</p>

        {/* Show error message if any */}
        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;