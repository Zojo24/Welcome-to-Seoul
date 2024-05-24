import Loading from "components/Loading";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MainPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="main-page">
      <div className="title-container">
        <h2>서울에 오신 것을 환영합니다</h2>
        <h1>Welcome to Seoul !</h1>
        <div className="background1"></div>
        <div className="background2"></div>
      </div>
      <div className="buttons">
        <Link to="/must-visit" className="button1">
          <div className="button__box">Must Visit!</div>
        </Link>
        <Link to="/must-try" className="button2">
          <div className="button__box">Must Try!</div>
        </Link>
        <Link to="/traveling-tips" className="button3">
          <div className="button__box--tips">Traveling Tips</div>
        </Link>
      </div>
    </div>
  );
}
