import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseApp";
import "./PlaceDetail.scss";

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

export default function PlaceDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PlaceProps | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id!);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setPost({
          id: docSnap.id,
          placeEng: data.placeEng,
          placeKor: data.placeKor,
          address: data.address,
          comment: data.comment,
          rating: data.rating,
          category: data.category,
          recommendation: data.recommendation,
        } as PlaceProps);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="box-detail">
      <div className="detail">
        <div className="detail_img">
          <img src="/1.jpeg" alt="Watermelon slices on a plate" />
        </div>
        <div className="detail_info">
          <div className="name-and-rating">
            <div className="name">{post.placeEng}</div>
            <span className="rating">⭐ {post.rating}</span>
          </div>
          <div className="name">{post.placeKor}</div>
          <p className="address">{post.address}</p>
          <div className="recommendation-box">
            Recommendation:
            <p className="recommendation">{post.recommendation}</p>
          </div>
          <div className="save">
            <button className="save-btn">Bookmark!</button>
            <button className="edit-btn">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
