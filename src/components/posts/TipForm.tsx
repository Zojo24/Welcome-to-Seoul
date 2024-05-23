import { useCallback, useContext, useEffect, useState } from "react";
import "./TipForm.scss";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebaseApp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { TipProps } from "pages/TipDetail";
import AuthContext from "context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function TipForm() {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const [title, setTitle] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "tips", params.id);
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

      const docRef = await addDoc(collection(db, "tips"), {
        title,
        topic,
        content,
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
      navigate(`/tip-detail/${docRef.id}`);
      setIsSubmitting(false);
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
    <form onSubmit={onSubmit} className="form_yellow">
      <h1>Create Blog Post</h1>
      <div className="form__box">
        <>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
          />
        </>
        <>
          <label htmlFor="topic">topic</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={topic}
            onChange={onChange}
          />
        </>
        <>
          <label htmlFor="content">content</label>
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
            id="content"
            name="content"
            value={content}
            className="content"
            onChange={onChange}
          />
        </>
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
