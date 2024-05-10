import { useNavigate } from "react-router-dom";
import "./TravelingTips.scss";
import Place from "../components/Place";

export default function TravelingTips() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/blog-post");
  };
  return (
    <div className="page_container">
      <h1>Traveling Tips</h1>
      <Place />
      <button className="blog-btn" onClick={onClick}>
        Write Blog
      </button>
    </div>
  );
}
