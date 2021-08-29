import { PicData } from "../../getPics";
import "./ImageGalleryItem.css";

const ImageGalleryItem = (p: PicData) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={p.previewURL}
        alt={p.tags}
        width={p.previewWidth}
        height={p.previewHeight}
        className="ImageGalleryItem-image"
        id={p.id.toString()}
      />
    </li>
  );
};

export default ImageGalleryItem;
