import { useCallback, useEffect, useState } from "react";
import "./PostForm.scss";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseApp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { PostProps } from "../../pages/MustTry";

export default function EditForm() {
  type CategoryType = "Select!" | "Must Visit" | "Must Try";

  const categories: CategoryType[] = ["Select!", "Must Visit", "Must Try"];
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [placeEng, setPlaceEng] = useState<string>("");
  const [placeKor, setPlaceKor] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [category, setCategory] = useState<CategoryType>("Select!");
  const [rating, setRating] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [recommendation, setRecommendation] = useState<string>("");
  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as PostProps;
        setPost({ ...data, id: docSnap.id });
        setPlaceEng(data.placeEng);
        setPlaceKor(data.placeKor || "");
        setAddress(data.address);
        setCategory(data.category as CategoryType);
        setRating(data.rating);
        setComment(data.comment);
        setRecommendation(data.recommendation || "");
      }
    }
  }, [params.id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          placeEng,
          placeKor,
          address,
          category,
          rating,
          comment,
          recommendation,
        });
        toast.success("Successfully updated the posting");
        navigate(`/place-detail/${post?.id}`);
      }
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <form onSubmit={onSubmit} className="form">
      <h1>Update Blog Post</h1>
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
              value={category}
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
