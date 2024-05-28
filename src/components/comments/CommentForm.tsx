import { useContext, useState } from "react";
import { PlaceProps } from "../../pages/PlaceDetail";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";
import "../../components/comments/CommentForm.scss";

export interface CommentFormProps {
  post: PlaceProps | null;
}

export default function CommentForm({ post }: CommentFormProps) {
  const [comment, setComment] = useState<string>("");
  const { user } = useContext(AuthContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (post && user) {
      const postRef = doc(db, "posts", post.id);
      const commentObj = {
        comment,
        email: user?.email,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };

      try {
        await updateDoc(postRef, {
          comments: arrayUnion(commentObj),
        });
        toast.success("Successfully wrote a comment");
        setComment("");
      } catch (error) {
        console.log(error);
        toast.error("Failed to write a comment");
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <textarea
        name="comment"
        id="comment"
        className="comment"
        required
        placeholder={`Write your comment about ${
          post?.placeEng || "this place"
        }`}
        onChange={onChange}
        value={comment}
      />
      <div className="submit-area">
        <input
          type="submit"
          value="Comment"
          className="submit-btn"
          disabled={!comment}
        />
      </div>
    </form>
  );
}
