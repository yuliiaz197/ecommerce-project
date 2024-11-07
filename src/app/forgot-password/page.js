'use client';
import { useState } from 'react';
import Link from 'next/link';
import '../../styles/globals.css';
import '../../styles/forgotpassword.css';

export default function ForgotPassword() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [resetStage, setResetStage] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to handle reset request
  const handleResetRequest = () => {
    const allUsers = Object.values(localStorage).map((item) => {
      try {
        return JSON.parse(item);
      } catch {
        return null;
      }
    });

    const userExists = allUsers.find((user) => user?.email === emailOrUsername || user?.username === emailOrUsername);
    if (userExists) {
      setResetStage(true);
      setMessage("");
    } else {
      setMessage("User not found. Please check your email or username.");
    }
  };

  // Function to handle password reset
  const handlePasswordReset = () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const allUsers = Object.entries(localStorage).map(([key, value]) => {
      try {
        return { key, user: JSON.parse(value) };
      } catch {
        return null;
      }
    });

    const userEntry = allUsers.find(
      ({ user }) => user?.email === emailOrUsername || user?.username === emailOrUsername
    );

    if (userEntry) {
      const { key, user } = userEntry;
      user.password = newPassword;
      localStorage.setItem(key, JSON.stringify(user));
      setMessage("Password has been successfully reset. You can now login with your new password.");
      setResetStage(false);
      setEmailOrUsername("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
      <div className="wrapper">
        {!resetStage ? (
            <div className="reset-request">
              <h1>Forgot Password</h1>
              <div className="input-box">
                <input
                    type="text"
                    name="emailOrUsername"
                    className="form-control"
                    placeholder="Enter email or username"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    required
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleResetRequest}>
                Submit
              </button>
            </div>
        ) : (
            <div className="reset-password">
              <h1>Reset Password</h1>
              <div className="input-box">
                <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    className="form-control"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />

                <button
                    type="button"
                    className="password-toggle password-toggler"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="input-box">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    className="password-toggle password-toggler"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              <button type="button" className="btn btn-primary" onClick={handlePasswordReset}>
                Reset Password
              </button>
            </div>
        )}
        {message && <p className="message">{message}</p>}
        {message === "Password has been successfully reset. You can now log in with your new password." && (
            <Link href="/login" className="btn btn-primary">Go to Login</Link>
        )}
        <div className="login-link-container">
          <p>Remembered your password? <Link href="/login">Login here</Link></p>
        </div>
      </div>
  );
}
