import { useState } from "react";
import api from "../services/api";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting", formData);

    try {
      const response = await api.post("/auth/registration/", formData);

      console.log(response.data);
      alert("User created!");
    } catch (error) {
      console.error(error);
      alert("Error creating user. Please check the console for details.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="icon">👤</div>

        <h2>Create Account</h2>

        <p className="subtitle">Fill in the details below to get started</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password1"
            placeholder="Password"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}
