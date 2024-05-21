import { useCallback, useEffect, useState } from "react";
import "./TipForm.scss";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseApp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { TipProps } from "pages/TipDetail";

export default function TipForm() {
  const [title, setTitle] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState<TipProps | null>(null);

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "Tips", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as TipProps;
        setPost({ ...data, id: docSnap.id });
        setTitle(data.title);
        setTopic(data.topic);
        setContent(data.content as string);
      }
    }
  }, [params.id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post) {
        const postRef = doc(db, "Tips", post?.id);
        await updateDoc(postRef, {
          title,
          topic,
          content,
        });
        toast.success("Successfully updated the posting");
        navigate(`/tip-detail/${post?.id}`);
      }
    } catch (error) {
      toast.error("error");
    }
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const {
      target: { name, value },
    } = e;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "topic":
        setTopic(value);
        break;
      case "content":
        setContent(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <form onSubmit={onSubmit} className="form_yellow">
      <h1>Create Blog Post</h1>
      <div className="form__box">
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="topic">topic</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={topic}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="content">content</label>
          <textarea
            id="content"
            name="content"
            value={content}
            className="content"
            onChange={onChange}
          />
        </div>
        <div className="form_block">
          <input type="submit" className="btn-submit" value="Submit" />
        </div>
      </div>
    </form>
  );
}
