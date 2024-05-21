import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header() {
  const [blur, setBlur] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setBlur(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    toast.success("You are logged out!");
    navigate("/");
  };
  return (
    <>
      <div className={`blur-top ${blur ? "visible" : ""}`}></div>
      <header className="header">
        <Link to="/" className="logo">
          <img src="/logo.jpeg" alt="logo" />
          <p>Welcome to Seoul !</p>
        </Link>
        <Link to="/must-visit" className="link">
          Must Visit
        </Link>
        <Link to="/must-try" className="link">
          Must Try
        </Link>
        <Link to="/traveling-tips" className="link">
          Traveling Tips
        </Link>
        {user ? (
          <button onClick={handleLoginLogout}>
            <span className="material-symbols-outlined">person</span>
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </header>
    </>
  );
}
