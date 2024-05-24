import { useNavigate } from "react-router-dom";
import "./Place.scss";
import { useState } from "react";
import ImageLoading from "./ImageLoading";

type PlaceProps = {
  id: string;
  placeEng: string;
  placeKor?: string;
  address: string;
  comment: string;
  rating: string;
  category?: "Select!" | "Traveling Tips" | "Must Visit" | "Must Try";
  recommendation?: string;
  imageUrl?: string;
};

export default function Place({
  id,
  placeEng,
  address,
  comment,
  rating,
  imageUrl,
}: PlaceProps) {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const handleClick = () => {
    navigate(`/place-detail/${id}`);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="container" onClick={handleClick}>
      <div className="image-wrapper">
        {!isImageLoaded && <ImageLoading />}
        <img
          src={imageUrl}
          alt="attachment"
          onLoad={handleImageLoad}
          style={{ display: isImageLoaded ? "block" : "none" }}
        />
      </div>
      <div className="info">
        <div className="name-and-rating">
          <div className="name">{placeEng}</div>
          <div className="rating">⭐ {rating}</div>
        </div>
        <p className="address">Address: {address}</p>
        <p className="recommendation">{comment}</p>
      </div>
    </div>
  );
}
