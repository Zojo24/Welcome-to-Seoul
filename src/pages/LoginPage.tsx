import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseApp";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("You are logged in!");
      navigate("/");
    } catch (error) {
      toast.error("Sorry, something has gone wrong.");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!value?.match(validRegex)) {
        setError("The email format is invalid.");
      } else {
        setError("");
      }
    }
    if (name === "password") {
      setPassword(value);

      if (value?.length < 6) {
        setError("Please enter a password with at least 6 characters.");
      } else {
        setError("");
      }
    }
  };

  return (
    <form className="login" onSubmit={onSubmit}>
      <div className="login_box">
        <h1>Welcome back!</h1>
        <div className="form_block">
          <label htmlFor="email">email </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form_block">
          <label htmlFor="password"> password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        {error && error?.length > 0 && (
          <div className="form_block">
            <div className="form_error">{error}</div>
          </div>
        )}

        <div className="create_block">
          Don't have an account?
          <Link to="/sign-up">Sign Up</Link>
        </div>
        <button className="login-btn">Log In</button>
      </div>
    </form>
  );
}
