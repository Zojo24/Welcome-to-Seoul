import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseApp";
import Place from "../components/Place";

type PostProps = {
  id: string;
  placeEng: string;
  placeKor?: string;
  address: string;
  comment: string;
  rating: string;
  category?: "Select!" | "Traveling Tips" | "Must Visit" | "Must Try";
  recommendation?: string;
};

export default function MustTry() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/blog-post");
  };

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const postsQuery = query(
      postsRef,
      where("category", "==", "Must Try"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(postsQuery, (snapShot) => {
      const dataObj = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PostProps[];
      setPosts(dataObj);
    });
  }, []);

  return (
    <div className="page_container">
      <h1>Must Try!</h1>
      <h2>When you are in Seoul, you must try...</h2>
      <div className="places_list">
        {posts.map((post) => (
          <Place key={post.id} {...post} />
        ))}
      </div>
      <div className="btn-box">
        <span>
          If you want to share your favorite places, <br />
          please click the button below!
        </span>
        <button className="blog-btn_purple" onClick={onClick}>
          <span className="blog-btn_name">Write a post</span>
          <span className="material-symbols-outlined">stylus</span>
        </button>
      </div>
    </div>
  );
}
