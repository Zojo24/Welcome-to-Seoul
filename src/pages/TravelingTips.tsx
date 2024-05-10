import { useNavigate } from "react-router-dom";

export default function TravelingTips() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/blog-post");
  };
  return (
    <>
      <button onClick={onClick}>Write Blog</button>
    </>
  );
}
