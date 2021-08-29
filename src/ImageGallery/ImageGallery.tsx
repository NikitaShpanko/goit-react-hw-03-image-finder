import { MouseEventHandler } from "react";
import { AppState } from "../App";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import css from "./ImageGallery.module.css";

interface GalleryData extends AppState {
  onClick: MouseEventHandler;
}

const ImageGallery = ({ hits, onClick }: GalleryData) => {
  return (
    <ul className={css.ImageGallery} onClick={onClick}>
      {hits.map((picData, i) => (
        <ImageGalleryItem {...picData} index={i} key={i} />
      ))}
    </ul>
  );
};

export default ImageGallery;
