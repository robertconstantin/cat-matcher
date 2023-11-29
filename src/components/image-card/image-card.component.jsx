import { useState, useEffect } from "react";

const ImageCard = ({ src, breed }) => {
  const placeholder = "./placeholder-image.jpg";
  const useProgressiveImage = (src) => {
    const [sourceLoaded, setSourceLoaded] = useState(null);

    useEffect(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => setSourceLoaded(src);
    }, [src]);

    return sourceLoaded;
  };
  const loadedImage = useProgressiveImage(src);

  return (
    <div
      style={{ backgroundImage: `url(${loadedImage || placeholder})` }}
      className="card"
    >
      <h3>{breed}</h3>
    </div>
  );
};

export default ImageCard;
