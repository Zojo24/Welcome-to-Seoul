import { useContext } from "react";
import { PlaceProps } from "../../pages/PlaceDetail";
import AuthContext from "context/AuthContext";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";

interface CommentProps {
  comment: string;
  email: string;
  createdAt: string;
}
interface CommentBoxProps {
  data: CommentProps;
  post: PlaceProps;
}

export default function CommentBox({ data, post }: CommentBoxProps) {
  const { user } = useContext(AuthContext);

  const handleDeleteComment = async () => {
    if (post) {
      try {
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          comments: arrayRemove(data),
        });
        toast.success("Successfully deleted the comment");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete the comment");
      }
    }
  };

  return (
    <div key={data?.createdAt} className="comment">
      <div className="box">
        <img src="/logo.jpeg" alt="profile" />
        <div className="box_email">{data.email}</div>
        <div className="box_createdAt">{data.createdAt}</div>
      </div>
      <div className="content">{data.comment}</div>
      <div className="submit-area">
        {data?.email === user?.email && (
          <button
            type="button"
            className="delete-btn"
            onClick={handleDeleteComment}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
