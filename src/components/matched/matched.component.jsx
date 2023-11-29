
import './matched.styles.css'

const Matched = ({matched}) => {
  return (
    <>
      <div className="helper">
        <div className="swipe-left">I don't like it!</div>
        <div className="swipe-right">I love it!</div>
      </div>
      {matched ? (
        <h2 className="matched">We have a match: {matched}</h2>
      ) : (
        <h2 className="swipe-more">Swipe more</h2>
      )}
    </>
  );
};

export default Matched;