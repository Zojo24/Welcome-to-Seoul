import "./Place.scss";

export default function Place() {
  return (
    <div className="container">
      <div className="image-wrapper">
        <img src="/1.jpeg" alt="Watermelon slices on a plate" />
      </div>
      <div className="info">
        <div className="name-and-rating">
          <div className="name">Samcheongdong Sujebi</div>
          <span className="rating">⭐ 4.5</span>
        </div>
        <p className="address">Address: 101-1 Samcheong-ro, Jongno-gu, Seoul</p>
        <p className="recommendation">It has the best Sujebi!</p>
        <div className="save">
          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
}
