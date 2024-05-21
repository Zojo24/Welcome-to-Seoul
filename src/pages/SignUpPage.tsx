import { Link } from "react-router-dom";
import "./LoginPage.scss";

export default function SignUpPage() {
  return (
    <form className="login">
      <div className="login_box">
        <h1>Create an account</h1>
        <div className="form_block">
          <label htmlFor="email">email </label>
          <input type="text" id="email" />
        </div>
        <div className="form_block">
          <label htmlFor="password"> password</label>
          <input type="text" id="password" />
        </div>
        <div className="form_block">
          <label htmlFor="password"> confirm password</label>
          <input type="text" id="password" />
        </div>
        <div className="create_block">
          Already have an account?
          <Link to="/login">Log in</Link>
        </div>
        <button className="login-btn">Sign up</button>
      </div>
    </form>
  );
}
