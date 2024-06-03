import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { PlaceProps } from "pages/PlaceDetail";
import { doc, updateDoc } from "firebase/firestore";
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
  parentCommentId: string;
}

export default function ReplyBox({
  data,
  post,
  parentCommentId,
}: CommentBoxProps) {
  const { user } = useContext(AuthContext);

  const handleDeleteReply = async () => {
    if (post && user) {
      try {
        const postRef = doc(db, "posts", post.id);

        // 부모 댓글을 찾아 replies에서 해당 대댓글을 제거
        const updatedComments = (post.comments || []).map((comment) => {
          if (comment.createdAt === parentCommentId) {
            return {
              ...comment,
              replies: comment.replies?.filter(
                (reply) => reply.createdAt !== data.createdAt
              ),
            };
          }
          return comment;
        });

        await updateDoc(postRef, {
          comments: updatedComments,
        });

        toast.success("Successfully deleted the reply");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete the reply");
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
            onClick={handleDeleteReply}
          >
            Delete
          </button>
        )}
      </div>
      <div className="content">{data.comment}</div>
    </div>
  );
}
