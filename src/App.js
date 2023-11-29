import { useState, useEffect, useRef } from 'react';

import CatCard from './components/cat-card/cat-card.component';
import './App.css';

const api_key = process.env.REACT_APP_API_KEY;

function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(cats.length - 1)
  const [loading, setLoading] = useState(true);
  const [likedCats, setLikedCats] = useState([]);
  const [matched, setMatched] = useState('');

  const currentIndexRef = useRef(currentIndex);

  const fetchData = () => {
    fetch(`https://api.thecatapi.com/v1/images/search?limit=10&oder=RAND&has_breeds=1&api_key=${api_key}`)
      .then((response) => response.json())
      .then((cats) => {
        setCats(cats);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  // load initial data
  useEffect(() => {
    fetchData()
  }, []);


  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);

    // load another 10 cats
    if (val === -1) {
      setLoading(true);
      fetchData();
    }
    currentIndexRef.current = val;
  }

  // set an array with cats you liked
  const addLikedCats = (breed) => {
    setLikedCats(likedCats => [...likedCats, breed]);
    console.log(likedCats);

    // determine the most liked cat breed
    if (likedCats.length > 3) {
      var counts = likedCats.reduce((acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1
      }), {});

      let max = Math.max(...Object.values(counts));

      let highest = Object.entries(counts).filter(([name, reps]) => reps === max);
      setMatched(highest[0][0])
    }
  }

  // event handler for swipe (left or right)
  const swipeHandler = (direction, index, breed) => {
    console.log(direction, index)
    if (direction === 'right') {
      addLikedCats(breed);
    }
    updateCurrentIndex(index - 1)
  }


  return (
    <div className='cat-app'>
      <h1>Cat Matcher</h1>
      <p>Swipe to find out what cat matches you the most</p>
      <CatCard cats={cats} swipeHandler={swipeHandler} loading={loading} />
      <div className='helper'>
        <div className='swipe-left'>
          I don't like it!
        </div>
        <div className='swipe-right'>
          I love it!
        </div>
      </div>
      {matched ? (
        <h2 className='matched'>We have a match: {matched}</h2>
      ) : (
        <h2 className='swipe-more'>Swipe more</h2>
      )}

    </div>
  )
}

export default App;
