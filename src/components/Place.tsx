import { useNavigate } from "react-router-dom";
import "./Place.scss";

type PlaceProps = {
  id: string;
  placeEng: string;
  placeKor?: string;
  address: string;
  comment: string;
  rating: string;
  category?: "Select!" | "Traveling Tips" | "Must Visit" | "Must Try";
  recommendation?: string;
};

export default function Place({
  id,
  placeEng,
  address,
  comment,
  rating,
}: PlaceProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/place-detail/${id}`);
  };
  return (
    <div className="container" onClick={handleClick}>
      <div className="image-wrapper">
        <img src="/1.jpeg" alt="Watermelon slices on a plate" />
      </div>
      <div className="info">
        <div className="name-and-rating">
          <div className="name">{placeEng}</div>
          <span className="rating">⭐ {rating}</span>
        </div>
        <p className="address">Address: {address}</p>
        <p className="recommendation">{comment}</p>
        <div className="save">
          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
}
