import { useCallback, useContext, useEffect, useState } from "react";
import "./TipForm.scss";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebaseApp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { TipProps } from "pages/TipDetail";
import AuthContext from "context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";

export default function TipForm() {
  const [title, setTitle] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState<TipProps | null>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "tips", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as TipProps;
        setPost({ ...data, id: docSnap.id });
        setTitle(data.title);
        setTopic(data.topic);
        setContent(data.content as string);
        setImageFile(data.imageUrl ?? null);
      }
    }
  }, [params.id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);
    e.preventDefault();

    try {
      if (post) {
        let imageUrl = post.imageUrl || "";
        if (imageFile && imageFile !== post.imageUrl) {
          if (post?.imageUrl) {
            const imageRef = ref(storage, post.imageUrl);
            await deleteObject(imageRef).catch((error) => {
              console.log(error);
            });
          }
          const data = await uploadString(storageRef, imageFile, "data_url");
          imageUrl = await getDownloadURL(data.ref);
        }
        const postRef = doc(db, "tips", post?.id);
        await updateDoc(postRef, {
          title,
          topic,
          content,
          imageUrl,
        });
        setImageFile(null);
        toast.success("Successfully updated the posting");
        navigate(`/tip-detail/${post?.id}`);
      }
    } catch (error) {
      toast.error("error");
    } finally {
      setIsSubmitting(false);
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
      <h1>Update Blog Post</h1>
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
