import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <Link to="/must-visit" className="link">
        Must Visit
      </Link>
      <Link to="/must-try" className="link">
        Must Try
      </Link>
      <Link to="/traveling-tips" className="link">
        Traveling Tips
      </Link>
      <Link to="/my-place" className="link">
        My Place
      </Link>
    </div>
  );
}
