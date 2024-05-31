import { useContext } from "react";
import { PlaceProps } from "../../pages/PlaceDetail";
import AuthContext from "context/AuthContext";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import "./ReplyBox.scss";

export interface CommentProps {
  comment: string;
  email: string;
  createdAt: string;
  replies?: CommentProps[];
}

interface CommentBoxProps {
  data: CommentProps;
  post: PlaceProps;
}

export default function ReplyBox({ data, post }: CommentBoxProps) {
  const { user } = useContext(AuthContext);

  const handleDeleteComment = async (commentToDelete: CommentProps) => {
    if (post && user) {
      try {
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          comments: arrayRemove(commentToDelete),
        });
        toast.success("Successfully deleted the comment");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete the comment");
      }
    }
  };

  return (
    <div key={data?.createdAt} className="reply">
      <div className="reply_box">
        <img src="/logo.jpeg" alt="profile" />
        <div className="reply_box_email">{data.email}</div>
        <div className="reply_box_createdAt">{data.createdAt}</div>
        {data?.email === user?.email && (
          <button
            type="button"
            className="deleteBtn"
            onClick={() => handleDeleteComment(data)}
          >
            Delete
          </button>
        )}
      </div>
      <div className="content">{data.comment}</div>
    </div>
  );
}
