import { useNavigate } from "react-router-dom";
import Place from "../components/Place";

export default function MustTry() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/blog-post");
  };
  return (
    <div className="page_container">
      <h1>Must Try!</h1>
      <h2>When you are in Seoul, you must try...</h2>
      <Place />
      <button className="blog-btn" onClick={onClick}>
        Write Blog
      </button>
    </div>
  );
}
