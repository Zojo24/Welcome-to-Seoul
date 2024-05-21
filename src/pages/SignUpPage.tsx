import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebaseApp";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
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

    if (name === "confirm_password") {
      setConfirmPassword(value);

      if (value?.length < 6) {
        setError("Please enter a password with at least 6 characters.");
      } else if (value !== password) {
        setError("The password and confirmation password do not match.");
      } else {
        setError("");
      }
    }
  };

  return (
    <form className="login" onSubmit={onSubmit}>
      <div className="login_box">
        <h1>Create an account</h1>
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
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form_block">
          <label htmlFor="confirm_password"> confirm password</label>
          <input
            type="text"
            id="confirm_password"
            name="confirm_password"
            value={confirmPassword}
            onChange={onChange}
          />
        </div>
        {error && error?.length > 0 && (
          <div className="form_block">
            <div className="form_error">{error}</div>
          </div>
        )}

        <div className="create_block">
          Already have an account?
          <Link to="/login">Log In</Link>
        </div>
        <button className="login-btn" disabled={error?.length > 0}>
          Sign Up
        </button>
      </div>
    </form>
  );
}
