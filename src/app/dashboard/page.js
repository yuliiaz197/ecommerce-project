'use client';
import { useRouter } from 'next/navigation';
import "../../styles/dashboard.css";
import "../../styles/globals.css";

export default function Dashboard() {
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  return (
    <div className="dashboard-wrapper container-fluid py-4">
      {/* Header */}
      <header className="header d-flex justify-content-between align-items-center">
        <div className="left-section d-flex align-items-center">
          <p className="website-title mb-0">Techynest</p>
        </div>
        <button className="btn logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="main-content text-center mt-5">
        <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
        <p className="dashboard-description">
          Here you can find your personalized content and settings.
        </p>
      </main>
    </div>
  );
}