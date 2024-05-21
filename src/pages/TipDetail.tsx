import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseApp";
import "./TipDetail.scss";

export type TipProps = {
  id: string;
  title: string;
  topic: string;
  content?: string;
};

export default function TipDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<TipProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "Tips", id!);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPost({
            id: docSnap.id,
            title: data.title,
            topic: data.topic,
            content: data.content,
          } as TipProps);
        } else {
          setError("Document does not exist");
        }
      } catch (e) {
        setError("Failed to fetch document: " + (e as Error).message);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="box-tip">
      <div className="tip_detail">
        <span className="tip_title">{post.title}</span>
        <p className="tip_topic">Topic : {post.topic}</p>

        <p className="tip_content">{post.content}</p>
      </div>
    </div>
  );
}
