import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src="./logo.jpeg" alt="logo" />
        <p>Welcome to Seoul!</p>
      </Link>
      <Link to="/traveling-tips" className="link">
        Traveling Tips
      </Link>
      <Link to="/must-visit" className="link">
        Must Visit
      </Link>
      <Link to="/must-try" className="link">
        Must Try
      </Link>
      <Link to="/my-place" className="link">
        My Place
      </Link>
    </header>
  );
}
