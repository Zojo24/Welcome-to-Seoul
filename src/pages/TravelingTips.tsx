import { useNavigate } from "react-router-dom";
import "./TravelingTips.scss";

export default function TravelingTips() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/blog-post");
  };
  return (
    <div className="container">
      <h1>Traveling Tips</h1>
      <button className="blog-btn" onClick={onClick}>
        Write Blog
      </button>
    </div>
  );
}
