import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
