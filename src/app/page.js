"use client";
import { useRouter } from "next/navigation";
import "../styles/globals.css";
import "../styles/home.css";

export default function Home() {
  const router = useRouter();

  // Handle login
  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="home-wrapper container-fluid py-4">
      {/* Header */}
      <header
        className="header d-flex justify-content-between
		align-items-center"
      >
        <div className="left-section d-flex align-items-center">
          <p className="website-title mb-0">Techynest</p>
        </div>
        <button className="btn login-button" onClick={handleLogin}>
          Login
        </button>
      </header>

      {/* Main Content */}
      <main className="main-content text-center mt-5">
        <h1 className="home-title">Welcome to Techynest!</h1>
      </main>
    </div>
  );
}
