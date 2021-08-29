import { PicData } from "../../getPics";
import css from "./ImageGalleryItem.module.css";

interface GalleryItemData extends PicData {
  index: number;
}

const ImageGalleryItem = (p: GalleryItemData) => {
  return (
    <li className={css.ImageGalleryItem} data-index={p.index}>
      <img
        src={p.previewURL}
        alt={p.tags}
        width={p.previewWidth}
        height={p.previewHeight}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
