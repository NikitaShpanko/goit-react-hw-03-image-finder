import { AppState } from "../App";
import Loader from "../Loader/Loader";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

const ImageGallery = (r: AppState | null) => {
  if (!r) return <></>;
  return (
    <>
      <ul className="ImageGallery">
        {r.hits.map((p) => (
          <ImageGalleryItem {...p} key={p.id} />
        ))}
      </ul>
      {r.page < r.pageCount && <Loader />}
    </>
  );
};

export default ImageGallery;
