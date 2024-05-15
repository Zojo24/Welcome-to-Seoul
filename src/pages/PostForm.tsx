import { useState } from "react";
import "./PostForm.scss";
import { collection, addDoc } from "firebase/firestore";
import { db } from "firebase";

export default function PostForm() {
  type CategoryType = "Traveling Tips" | "Must Visit" | "Must Try";

  const categories: CategoryType[] = [
    "Traveling Tips",
    "Must Visit",
    "Must Try",
  ];

  const [content, setContent] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "post"), {
        content: content,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {}
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "content") {
      setContent(value);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <h1>Create Blog Post</h1>
      <div className="form__box">
        <div>
          <label htmlFor="name">Place (Eng)</label>
          <input type="text" className="name-eng" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="name">Place (Kor)</label>
          <input type="text" className="name-ko" />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input type="text" className="address" />
        </div>
        <div className="category-and-rating">
          <div className="input-group">
            <label htmlFor="category">Category</label>
            <select name="category" id="category">
              <option className="options" value="">
                Select!
              </option>
              {categories?.map((category) => (
                <option className="options" value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="rating"> Rating</label>
            <input type="text" className="rating" />
          </div>
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input type="text" className="comment" />
        </div>
        <div>
          <label htmlFor="content">Recommendation</label>
          <textarea className="content" />
        </div>
        <div className="form_block">
          <input type="submit" className="btn-submit" value="Submit" />
        </div>
      </div>
    </form>
  );
}
