import Link from 'next/link';
import '../styles/notfound.css';

export default function NotFound() {
  return (
    <div className="notfound-wrapper">
      <h2 className="notfound-title">Not Found</h2>
      <p className="notfound-text">Could not find the requested resource.</p>
      <Link href="/" className="notfound-link">
        Return Home
      </Link>
    </div>
  );
}
