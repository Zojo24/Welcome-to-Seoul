import { useNavigate } from "react-router-dom";
import "./TravelingTips.scss";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseApp";
import { useEffect, useState } from "react";
import Tip from "../components/Tip";

type TipProps = {
  id: string;
  title: string;
  topic: string;
  content?: string;
};

export default function TravelingTips() {
  const [posts, setPosts] = useState<TipProps[]>([]);
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/blog-tip");
  };

  useEffect(() => {
    const postsRef = collection(db, "Tips");
    const postsQuery = query(postsRef, orderBy("createdAt", "desc"));

    onSnapshot(postsQuery, (snapShot) => {
      const dataObj = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TipProps[];
      setPosts(dataObj);
    });
  }, []);

  return (
    <div className="page_container">
      <h1>Traveling Tips</h1>
      <div className="places_list">
        {posts.map((post) => (
          <Tip key={post.id} {...post} />
        ))}
      </div>
      <div className="btn-box">
        <span>
          Want to share your Seoul travel tips?, <br />
          please click the button below!
        </span>
        <button className="blog-btn_yellow" onClick={onClick}>
          <span className="blog-btn_name">Write your tip</span>
          <span className="material-symbols-outlined">stylus</span>
        </button>
      </div>
    </div>
  );
}
