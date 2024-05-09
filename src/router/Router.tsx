import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import TravelingTip from "../pages/TravelingTip";
import MustVisit from "../pages/MustVisit";
import MustTry from "../pages/MustTry";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/TravelingTip" element={<TravelingTip />} />
        <Route path="/MustVisit" element={<MustVisit />} />
        <Route path="/MustTry" element={<MustTry />} />
      </Routes>
    </BrowserRouter>
  );
}
