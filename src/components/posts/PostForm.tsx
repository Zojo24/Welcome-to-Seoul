import { useState } from "react";
import "./PostForm.scss";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseApp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function PostForm() {
  type CategoryType = "Select!" | "Must Visit" | "Must Try";

  const categories: CategoryType[] = ["Select!", "Must Visit", "Must Try"];

  const [placeEng, setPlaceEng] = useState<string>("");
  const [placeKor, setPlaceKor] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [category, setCategory] = useState<CategoryType>("Select!");
  const [rating, setRating] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [recommendation, setRecommendation] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        placeEng,
        placeKor,
        address,
        category,
        rating,
        recommendation,
        comment,
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
      case "placeEng":
        setPlaceEng(value);
        break;
      case "placeKor":
        setPlaceKor(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "category":
        setCategory(value as CategoryType);
        break;
      case "rating":
        setRating(value);
        break;
      case "comment":
        setComment(value);
        break;
      case "recommendation":
        setRecommendation(value);
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <h1>Create Blog Post</h1>
      <div className="form__box">
        <div>
          <label htmlFor="placeEng">Place (Eng)</label>
          <input
            type="text"
            id="placeEng"
            name="placeEng"
            value={placeEng}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="placeKor">Place (Kor)</label>
          <input
            type="text"
            id="placeKor"
            name="placeKor"
            value={placeKor}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={onChange}
          />
        </div>
        <div className="category-and-rating">
          <div className="input-group">
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
          <div className="input-group">
            <label htmlFor="rating"> Rating</label>
            <input
              type="text"
              id="rating"
              name="rating"
              value={rating}
              className="rating"
              onChange={onChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={comment}
            className="comment"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="recommendation">Recommendation</label>
          <textarea
            id="recommendation"
            name="recommendation"
            value={recommendation}
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
