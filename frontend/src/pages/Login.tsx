import { useState } from "react";
import api from "../services/api";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      alert("Please enter an email");
      return;
    }

    if (!formData.password.trim()) {
      alert("Please enter a password");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending Login Request:", formData);

      const response = await api.post("/auth/login/", {
        email: formData.email,
        password: formData.password,
      });

      console.log("SUCCESS:", response.data);

      // dj-rest-auth returns { key: "token" }
      localStorage.setItem("token", response.data.key);

      alert("Login successful!");

      // Redirect to Todo page
      navigate("/todo");
    } catch (error: any) {
      console.error("Login Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);

        alert(
          error.response.data?.non_field_errors?.[0] ||
            "Invalid username or password",
        );
      } else {
        alert("Unable to connect to server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="icon">👤</div>

        <h2>Login To Your Account</h2>

        <p className="subtitle">Fill in the details below to Login</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="signin">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
