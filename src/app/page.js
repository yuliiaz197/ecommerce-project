'use client';
import { useRouter } from "next/navigation";
import "../styles/globals.css";
import "../styles/home.css";

export default function Home() {
    const router = useRouter();

    const handleLogin = () => {
        if (localStorage.getItem('isAuthenticated') === 'true') {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
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

            <div className="login-btn-container">
                <button type="submit" className="btn btn-primary w-100 login-btn" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </header>

        {/* Main Content */}
        <main className="main-content text-center mt-5">
            <h1 className="home-title">Welcome to Techynest!</h1>
        </main>
    </div>
  );
}
