import { Link } from "react-router-dom";
import "./LoginPage.scss";
export default function LoginPage() {
  return (
    <form className="login">
      <div className="login_box">
        <h1>Login</h1>
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
          <Link to="/create-account">Create account</Link>
        </div>
        <button className="login-btn">login</button>
      </div>
    </form>
  );
}
