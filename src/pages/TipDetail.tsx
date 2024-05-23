import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../firebaseApp";
import "./TipDetail.scss";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";
import { deleteObject, ref } from "@firebase/storage";

export type TipProps = {
  id: string;
  title: string;
  topic: string;
  content?: string;
  email: string;
  imageUrl?: string;
};

export default function TipDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<TipProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const imageRef = ref(storage, post?.imageUrl);

  const handleDelete = async () => {
    if (post) {
      const confirm = window.confirm("Are you sure you want to delete it?");
      if (confirm) {
        try {
          if (post?.imageUrl) {
            deleteObject(imageRef).catch((error) => {
              console.log(error);
            });
          }
          await deleteDoc(doc(db, "tips", post.id));
          toast.success("Successfully deleted the post.");
          navigate("/traveling-tips");
        } catch (error) {
          toast.error("Failed to delete the post.");
        }
      }
    } else {
      toast.error("Post is not found.");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "tips", id!);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPost({
            id: docSnap.id,
            title: data.title,
            topic: data.topic,
            content: data.content,
            email: data.email,
            imageUrl: data.imageUrl,
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
        <div className="detail_img">
          <img src={post?.imageUrl} alt="attachment" />
        </div>
        <span className="tip_title">{post.title}</span>
        <p className="tip_topic">Topic : {post.topic}</p>

        <p className="tip_content">{post.content}</p>
        {user && post?.email === user.email && (
          <div className="save">
            <Link to={`/tip-detail/edit/${post?.id}`}>
              <button className="edit-btn">Edit </button>
            </Link>
            <button type="button" className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
