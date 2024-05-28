import { useCallback, useContext, useEffect, useState } from "react";
import "./PostForm.scss";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebaseApp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { PlaceProps } from "pages/PlaceDetail";
import AuthContext from "context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function PostForm() {
  type CategoryType = "Select!" | "Must Visit" | "Must Try";

  const categories: CategoryType[] = ["Select!", "Must Visit", "Must Try"];

  const params = useParams();
  const { user } = useContext(AuthContext);
  const [placeEng, setPlaceEng] = useState<string>("");
  const [placeKor, setPlaceKor] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [category, setCategory] = useState<CategoryType>("Select!");
  const [rating, setRating] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [recommendation, setRecommendation] = useState<string>("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as PlaceProps;

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

  useEffect(() => {
    getPost();
  }, [getPost]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);
    e.preventDefault();

    try {
      let imageUrl = "";
      if (imageFile) {
        const data = await uploadString(storageRef, imageFile, "data_url");
        imageUrl = await getDownloadURL(data.ref);
      }
      const docRef = await addDoc(collection(db, "posts"), {
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
        email: user?.email,
        imageUrl: imageUrl,
      });
      setImageFile(null);
      toast.success("Successfully uploaded the posting");
      navigate(`/place-detail/${docRef.id}`);
      setIsSubmitting(false);
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

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    const file = files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader?.readAsDataURL(file);

    fileReader.onloadend = () => {
      const result = fileReader.result;
      if (result) {
        setImageFile(result as string);
      }
    };
  };

  const handleDeleteImage = () => {
    setImageFile(null);
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
          <div className="image-area">
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
              className="btn-upload"
            />
            {imageFile && (
              <div className="attachment">
                <img src={imageFile} alt="attachment" />
                <button
                  className="btn-clear"
                  type="button"
                  onClick={handleDeleteImage}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <textarea
            id="recommendation"
            name="recommendation"
            value={recommendation}
            className="content"
            onChange={onChange}
          />
        </div>
        <div className="form_block">
          <input
            type="submit"
            className="btn-submit"
            value="Submit"
            disabled={isSubmitting}
          />
        </div>
      </div>
    </form>
  );
}
