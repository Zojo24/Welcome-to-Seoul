import { Link } from "react-router-dom";
import "./LoginPage.scss";
// import { useState } from "react";

export default function LoginPage() {
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //   } catch (error) {}
  // onSubmit={onSubmit}};
  return (
    <form className="login">
      <div className="login_box">
        <h1>Welcome back!</h1>
        <div className="form_block">
          <label htmlFor="email">email </label>
          <input type="text" id="email" />
        </div>
        <div className="form_block">
          <label htmlFor="password"> password</label>
          <input type="text" id="password" />
        </div>
        <div className="create_block">
          Don't have an account?
          <Link to="/sign-up">Sign up</Link>
        </div>
        <button className="login-btn">Log in</button>
      </div>
    </form>
  );
}
