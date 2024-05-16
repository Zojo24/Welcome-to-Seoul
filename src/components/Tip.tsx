import { useNavigate } from "react-router-dom";

type TipProps = {
  id: string;
  title: string;
  category?: "Traveling Tips";
  content: string;
};

export default function Tip({ id, title, content }: TipProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/tip-detail/${id}`);
  };

  return (
    <div className="tip_container" onClick={handleClick}>
      <div className="tip_title">{title}</div>
      <div className="tip_content">{content}</div>
    </div>
  );
}
