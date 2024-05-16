import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import TravelingTips from "../pages/TravelingTips";
import MustVisit from "../pages/MustVisit";
import MustTry from "../pages/MustTry";
import MyPlace from "../pages/MyPlace";
import PostForm from "../pages/PostForm";
import PlaceDetail from "../pages/PlaceDetail";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/traveling-tips" element={<TravelingTips />} />
      <Route path="/must-visit" element={<MustVisit />} />
      <Route path="/must-try" element={<MustTry />} />
      <Route path="/my-place" element={<MyPlace />} />
      <Route path="/blog-post" element={<PostForm />} />
      <Route path="/place-detail/:id" element={<PlaceDetail />} />
    </Routes>
  );
}
