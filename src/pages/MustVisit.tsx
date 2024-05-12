import { useNavigate } from "react-router-dom";

export default function MustVisit() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/blog-post");
  };
  return (
    <div className="page_container">
      <h1>Must Visit!</h1>
      <h2>When you are in Seoul, you must visit...</h2>
      <button className="blog-btn" onClick={onClick}>
        Write Blog
      </button>
    </div>
  );
}
