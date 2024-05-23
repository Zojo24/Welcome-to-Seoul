import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../firebaseApp";
import "./PlaceDetail.scss";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";
import { ref, deleteObject } from "firebase/storage";

type PlaceProps = {
  id: string;
  placeEng: string;
  placeKor?: string;
  address: string;
  comment: string;
  rating: string;
  category?: "Select!" | "Traveling Tips" | "Must Visit" | "Must Try";
  recommendation?: string;
  email: string;
  imageUrl?: string;
};

export default function PlaceDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PlaceProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const imageRef = ref(storage, post?.imageUrl);

  const handleDelete = async () => {
    if (post) {
      const confirm = window.confirm("Are you sure you want to delete it?");
      if (confirm) {
        try {
          if (post?.imageUrl) {
            deleteObject(imageRef).catch((error) => {
              console.log(error);
            });
          }
          await deleteDoc(doc(db, "posts", post.id));
          toast.success("Successfully deleted the post.");
          switch (post.category) {
            case "Must Try":
              navigate("/must-try");
              break;
            case "Must Visit":
              navigate("/must-visit");
              break;
            default:
              navigate("/");
              break;
          }
        } catch (error) {
          toast.error("Failed to delete the post.");
        }
      }
    } else {
      toast.error("Post is not found.");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id!);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPost({
            id: docSnap.id,
            placeEng: data.placeEng,
            placeKor: data.placeKor,
            address: data.address,
            comment: data.comment,
            rating: data.rating,
            category: data.category,
            recommendation: data.recommendation,
            email: data.email,
            imageUrl: data.imageUrl,
          } as PlaceProps);
        } else {
          setError("Document does not exist");
        }
      } catch (e) {
        setError("Failed to fetch document: " + (e as Error).message);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="box-detail">
      <div className="detail">
        <div className="detail_img">
          <img src={post?.imageUrl} alt="attachment" />
        </div>
        <div className="detail_info">
          <div className="name-and-rating">
            <div className="name">{post.placeEng}</div>
            <span className="rating">⭐ {post.rating}</span>
          </div>
          <div className="name">{post.placeKor}</div>
          <p className="address">{post.address}</p>
          <div className="recommendation-box">
            Recommendation:
            <p className="recommendation">{post.recommendation}</p>
          </div>
          {user && post?.email === user.email && (
            <div className="save">
              {/* <button type="button" className="save-btn">
                Bookmark!
              </button> */}
              <Link to={`/place-detail/edit/${post?.id}`}>
                <button type="button" className="edit-btn">
                  Edit
                </button>
              </Link>
              <button
                type="button"
                className="delete-btn"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
