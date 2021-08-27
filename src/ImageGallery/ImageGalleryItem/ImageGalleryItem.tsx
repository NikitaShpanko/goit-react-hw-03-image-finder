import { PicData } from "../../getPics";

const ImageGalleryItem = (p: PicData) => {
  return (
    <li className="ImageGalleryItem">
      <img src={p.previewURL} alt={p.tags} className="ImageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;
