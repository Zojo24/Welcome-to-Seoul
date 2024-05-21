import { useCallback, useEffect, useState } from "react";
import "./TipForm.scss";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseApp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { TipProps } from "pages/TipDetail";

export default function TipForm() {
  const params = useParams();
  const [title, setTitle] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "Tips", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as TipProps;
        setTitle(data.title);
        setTopic(data.topic);
        setContent(data.content as string);
      }
    }
  }, [params.id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "Tips"), {
        title,
        topic,
        content,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });
      toast.success("Successfully uploaded the posting");
      navigate(`/tip-detail/${docRef.id}`);
    } catch (e) {
      console.log(e);
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
