import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="Logo">
        Welcome to Seoul!
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
