import { useNavigate } from "react-router-dom";
import "./TravelingTips.scss";

export default function TravelingTips() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/blog-tip");
  };
  return (
    <div className="page_container">
      <h1>Traveling Tips</h1>
      <div className="btn-box">
        <span>
          Want to share your Seoul travel tips?, <br />
          please click the button below!
        </span>
        <button className="blog-btn_yellow" onClick={onClick}>
          <span className="blog-btn_name">Write your tip</span>
          <span className="material-symbols-outlined">stylus</span>
        </button>
      </div>
    </div>
  );
}
