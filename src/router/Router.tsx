import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import TravelingTips from "../pages/TravelingTips";
import MustVisit from "../pages/MustVisit";
import MustTry from "../pages/MustTry";
import MyPlace from "../pages/MyPlace";
import PostForm from "../pages/PostForm";
import PlaceDetail from "../pages/PlaceDetail";
import TipForm from "../pages/TipForm";
import TipDetail from "../pages/TipDetail";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

interface RouterProps {
  authenticated: boolean;
}
export default function Router({ authenticated }: RouterProps) {
  return (
    <Routes>
      {authenticated ? (
        <>
          <Route path="/" element={<MainPage />} />
          <Route path="/traveling-tips" element={<TravelingTips />} />
          <Route path="/must-visit" element={<MustVisit />} />
          <Route path="/must-try" element={<MustTry />} />{" "}
          <Route path="/place-detail/:id" element={<PlaceDetail />} />
          <Route path="/tip-detail/:id" element={<TipDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </>
      ) : (
        <>
          <Route path="/my-place" element={<MyPlace />} />
          <Route path="/blog-post" element={<PostForm />} />
          <Route path="/blog-tip" element={<TipForm />} />
        </>
      )}
    </Routes>
  );
}
