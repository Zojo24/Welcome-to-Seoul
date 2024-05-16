import { useNavigate } from "react-router-dom";
import "./Tip.scss";

type TipProps = {
  id: string;
  title: string;
  topic: string;
  content?: string;
};

export default function Tip({ id, title, topic }: TipProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/tip-detail/${id}`);
  };

  return (
    <div className="tip_container" onClick={handleClick}>
      <div className="tip_title">{title}</div>
      <div className="tip_topic">Topic : {topic}</div>
    </div>
  );
}
