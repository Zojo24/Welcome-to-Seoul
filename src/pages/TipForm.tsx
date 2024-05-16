import { useState } from "react";
import "./TipForm.scss";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseApp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function TipForm() {
  type CategoryType = "Traveling Tips";

  const categories: CategoryType[] = ["Traveling Tips"];

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<CategoryType>("Traveling Tips");
  const [topic, setTopic] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        title,
        category,
        topic,
        content,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });
      toast.success("Successfully uploaded the posting");
      navigate("/");
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
      case "category":
        setCategory(value as CategoryType);
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

        <div className="category">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            onChange={onChange}
            defaultValue={category}
          >
            {categories?.map((category) => (
              <option className="options" value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
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
