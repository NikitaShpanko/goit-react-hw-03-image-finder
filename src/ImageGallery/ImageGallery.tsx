import { MouseEventHandler } from "react";
import { AppState } from "../App";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import "./ImageGallery.css";

const handleClick: MouseEventHandler = (e) => {
  const id = (e.target as HTMLElement).id;
  if (!id) return;
  console.log(id);
};

const ImageGallery = (r: AppState) => {
  return (
    <ul className="ImageGallery" onClick={handleClick}>
      {r.hits.map((p, i) => (
        <ImageGalleryItem {...p} key={i} />
      ))}
    </ul>
  );
};

export default ImageGallery;
