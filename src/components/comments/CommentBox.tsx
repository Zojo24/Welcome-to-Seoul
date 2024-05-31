import { useContext, useState } from "react";
import { PlaceProps } from "../../pages/PlaceDetail";
import AuthContext from "context/AuthContext";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import styles from "./CommentBox.module.scss";
import ReplyBox from "./ReplyBox";

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

export default function CommentBox({ data, post }: CommentBoxProps) {
  const { user } = useContext(AuthContext);
  const [reply, setReply] = useState<string>("");
  const [showReplyBox, setShowReplyBox] = useState<boolean>(false);

  const handleDeleteComment = async () => {
    if (post && user) {
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

  const handleAddReply = async () => {
    if (post && user && reply.trim()) {
      try {
        const postRef = doc(db, "posts", post.id);
        const newReply: CommentProps = {
          comment: reply,
          email: user.email as string,
          createdAt: new Date().toLocaleString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        };
        const updatedComments = (post.comments || []).map((comment) => {
          if (comment.createdAt === data.createdAt) {
            return {
              ...comment,
              replies: comment.replies
                ? [...comment.replies, newReply]
                : [newReply],
            };
          }
          return comment;
        });
        await updateDoc(postRef, {
          comments: updatedComments,
        });
        setReply("");
        setShowReplyBox(false);
        toast.success("Reply added successfully");
      } catch (error) {
        console.log(error);
        toast.error("Failed to add the reply");
      }
    }
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReply(e.target.value);
  };

  const toggleReplyBox = () => {
    setShowReplyBox(!showReplyBox);
  };

  return (
    <div key={data?.createdAt} className={styles.comment}>
      <div className={styles.box}>
        <img src="/logo.jpeg" alt="profile" />
        <div className={styles.box_email}>{data.email}</div>
        <div className={styles.box_createdAt}>{data.createdAt}</div>
      </div>
      <div className={styles.content}>{data.comment}</div>
      <div className={styles.submitArea}>
        {user && (
          <button
            type="button"
            className={styles.replyBtn}
            onClick={toggleReplyBox}
          >
            Reply
          </button>
        )}
        {data?.email === user?.email && (
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={handleDeleteComment}
          >
            Delete
          </button>
        )}
      </div>
      {showReplyBox && (
        <div className={styles.replyBox}>
          <input
            type="text"
            value={reply}
            onChange={handleReplyChange}
            placeholder="Write a reply..."
          />
          <button type="button" onClick={handleAddReply}>
            Add Reply
          </button>
        </div>
      )}
      {data.replies && data.replies.length > 0 && (
        <div className={styles.replies}>
          {data.replies.map((reply) => (
            <ReplyBox key={reply.createdAt} data={reply} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
