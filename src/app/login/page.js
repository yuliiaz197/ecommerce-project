'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/globals.css";
import "../../styles/login.css";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setError("");
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.emailOrUsername.trim()) {
      formErrors.emailOrUsername = "Email or Username is required.";
    }
    if (!formData.password.trim()) {
      formErrors.password = "Password is required.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check both email and username in localStorage
    const storedData = Object.values(localStorage)
      .map((item) => {
        try {
          return JSON.parse(item);
        } catch {
          return null;
        }
      })
      .find(
        (data) =>
          data && (data.username === formData.emailOrUsername || data.email === formData.emailOrUsername)
      );

    if (storedData && storedData.password === formData.password) {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid email/username or password");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin} noValidate>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            name="emailOrUsername"
            className={`form-control ${errors.emailOrUsername ? "is-invalid" : ""}`}
            placeholder="Email or Username"
            value={formData.emailOrUsername}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.emailOrUsername}</div>
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
            <i className={`bx ${showPassword ? "bx-show" : "bx-hide"} password-toggler`}></i>
          </span>
          <div className="invalid-feedback">{errors.password}</div>
        </div>

        <div className="remember-forgot">
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input"/> Remember me
          </label>
          <div className="forgot-link-container">
            <Link href="/forgot-password" className="forgotlink">
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className="login-btn-container">
          <button type="submit" className="btn btn-primary w-100">
          Login
          </button>
        </div>

        <div className="register-link-container">
          <p>
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-decoration-none">
              Sign Up
            </a>
          </p>
        </div>

        {error && <div className="error-message text-danger">{error}</div>}
      </form>
    </div>
  );
}

