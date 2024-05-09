import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="main-page">
      <h2>서울에 오신 것을 환영합니다!</h2>
      <h1>Welcome to Seoul!</h1>
      <div className="button1">
        <div className="button__box--tips">
          <Link to="/traveling-tips">Traveling Tips</Link>
        </div>
      </div>
      <div className="button2">
        <div className="button__box">
          <Link to="/must-visit">Must Visit!</Link>
        </div>
      </div>
      <div className="button3">
        <div className="button__box">
          <Link to="/must-try">Must Try!</Link>
        </div>
      </div>
    </div>
  );
}
