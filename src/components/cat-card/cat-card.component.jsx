
import TinderCard from 'react-tinder-card';
import ImageCard from "../image-card/image-card.component";

import './cat-card.styles.css';

const CatCard = ({cats, swipeHandler, loading}) => {
  return (
    <div className="card-container">
      {loading ? (
        <div>"Loading..."</div>
      ) : (
        cats.map((cat, index) => {
          const breed = cat.breeds[0].name;

          return (
            <TinderCard
              className="swipe"
              key={cat.id}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => swipeHandler(dir, index, breed)}
            >
              <ImageCard src={cat.url} breed={breed} />
            </TinderCard>
          );
        })
      )}
    </div>
  );
};

export default CatCard;
