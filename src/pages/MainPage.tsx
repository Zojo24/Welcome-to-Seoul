import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="main-page">
      <h1>
        서울에 오신 것을 환영합니다! <br />
        <br /> Welcome to Seoul!
      </h1>
      <div className="button">
        <h3>
          <Link to="/traveling-tips">Traveling Tips</Link>
        </h3>
      </div>
      <div className="button">
        <h3>
          <Link to="/must-visit">Must Visit!</Link>
        </h3>
      </div>
      <div className="button">
        <h3>
          <Link to="/must-try">Must Try!</Link>
        </h3>
      </div>
    </div>
  );
}
