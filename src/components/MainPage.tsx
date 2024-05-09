import MustTry from "./MustTry";
import MustVisit from "./MustVisit";
import TravelingTip from "./TravelingTip";

export default function MainPage() {
  return (
    <div className="main-page">
      <h1>
        서울에 오신 것을 환영합니다! <br />
        <br /> Welcome to Seoul!
      </h1>
      <div className="button">
        <h3>Traveling Tip</h3>
        <TravelingTip />
      </div>
      <div className="button">
        <h3>Must Visit!</h3>
        <MustVisit />
      </div>
      <div className="button">
        <h3>Must Try!</h3>
        <MustTry />
      </div>
    </div>
  );
}
