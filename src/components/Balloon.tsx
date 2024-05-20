import "./Balloon.scss";

type BalloonProps = {
  topic?: string;
  onClick: () => void;
};

const Balloon = ({ topic, onClick }: BalloonProps) => {
  return (
    <>
      {topic ? (
        <div className="tip_balloon">
          <span>
            Want to share your Seoul travel tips? <br />
            Please click the button below!
          </span>
          <button className="tip-button" onClick={onClick}>
            <span className="blog-btn_name">Write your tip</span>
            <span className="material-symbols-outlined">stylus</span>
          </button>
        </div>
      ) : (
        <div className="post_balloon">
          <span>
            Want to share your favorite places? <br />
            Please click the button below!
          </span>
          <button className="tip-button" onClick={onClick}>
            <span className="blog-btn_name">Write a post</span>
            <span className="material-symbols-outlined">stylus</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Balloon;
