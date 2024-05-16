import { useNavigate } from "react-router-dom";
import "./TravelingTips.scss";

export default function TravelingTips() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/blog-post");
  };
  return (
    <div className="page_container">
      <h1>Traveling Tips</h1>
      <div className="btn-box">
        <span>
          If you want to share your favorite places, <br />
          please click the button below!
        </span>
        <button className="blog-btn" onClick={onClick}>
          <span className="blog-btn_name">Write a post</span>
          <span className="material-symbols-outlined">stylus</span>
        </button>
      </div>
    </div>
  );
}
