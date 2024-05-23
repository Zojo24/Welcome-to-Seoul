import { useNavigate } from "react-router-dom";
import "./Tip.scss";

type TipProps = {
  id: string;
  title: string;
  topic: string;
  content?: string;
  index: number;
};

export default function Tip({ id, title, topic, index }: TipProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/tip-detail/${id}`);
  };

  return (
    <div className="tip_container" onClick={handleClick}>
      <div className="tip_title">
        {index + 1}. {title}
      </div>
      <div className="tip_topic">Topic : {topic}</div>
    </div>
  );
}
