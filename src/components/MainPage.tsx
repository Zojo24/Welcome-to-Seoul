import MustTry from "./MustTry";
import MustVisit from "./MustVisit";
import TravelingTip from "./TravelingTip";

export default function MainPage() {
  return (
    <div className="main-page">
      <h1>Welcome to Seoul!</h1>
      <TravelingTip />
      <MustVisit />
      <MustTry />
    </div>
  );
}
