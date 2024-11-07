"use client";
import { useState } from "react";
import Link from "next/link";
import "../../styles/globals.css";
import "../../styles/register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  // const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Validate the form
  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName.trim())
      formErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim())
      formErrors.lastName = "Last Name is required.";
    if (!formData.email.trim()) formErrors.email = "Email is required.";
    if (!formData.username.trim())
      formErrors.username = "Username is required.";
    if (!formData.password.trim())
      formErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = "Passwords do not match.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Check for duplicate emails and usernames
  const isDuplicate = () => {
    const allUsers = Object.values(localStorage).map((item) => {
      try {
        return JSON.parse(item);
      } catch {
        return null;
      }
    });

    let duplicateErrors = {};
    if (allUsers.some((user) => user?.email === formData.email)) {
      duplicateErrors.email = "Email is already in use.";
    }
    if (allUsers.some((user) => user?.username === formData.username)) {
      duplicateErrors.username = "Username is already taken.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...duplicateErrors }));
    return Object.keys(duplicateErrors).length > 0;
  };

  // Handle form submission
  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateForm() || isDuplicate()) return;

    // Save user data to local storage using `username` as the key
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      username: formData.username,
      password: formData.password,
    };
    localStorage.setItem(formData.username, JSON.stringify(userData));

    // Show success message and modal
    setSuccessMessage("User successfully registered!");
    setShowModal(true);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleRegister} noValidate>
        <h1>Sign Up</h1>
        <div className="name-field">
          <div className="input-box">
            <input
              type="text"
              name="firstName"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">{errors.firstName}</div>
          </div>
          <div className="input-box">
            <input
              type="text"
              name="lastName"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">{errors.lastName}</div>
          </div>
        </div>
        <div className="input-box">
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>
        <div className="input-box">
          <input
            type="text"
            name="username"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.username}</div>
        </div>
        <div className="input-box position-relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            <i
              className={`bx ${showPassword ? "bx-show" : "bx-hide"}
password-toggler`}
            ></i>
          </span>
          <div className="invalid-feedback">{errors.password}</div>
        </div>
        <div className="input-box position-relative">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            <i
              className={`bx ${showPassword ? "bx-show" : "bx-hide"}
password-toggler`}
            ></i>
          </span>
          <div className="invalid-feedback">{errors.confirmPassword}</div>
        </div>
        <div className="register-btn-container">
          <button type="submit" className="btn btn-primary w-100 register-btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
