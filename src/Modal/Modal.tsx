import css from "./Modal.module.css";
import { PicData } from "../getPics";
import { MouseEventHandler, ReactEventHandler } from "react";

interface ModalData extends PicData {
  onClose: () => void;
}

const Modal = ({ largeImageURL, tags, onClose }: ModalData) => {
  const handleClick: MouseEventHandler = (e) => {
    if (e.currentTarget !== e.target) return;
    onClose();
  };
  const onImageLoad: ReactEventHandler<HTMLImageElement> = (e) => {
    const img = e.currentTarget;
    const div = img.closest("div");
    if (!div) return;
    const scrollX = (img.clientWidth - div.clientWidth) / 2;
    const scrollY = (img.clientHeight - div.clientHeight) / 2;
    div?.scrollTo(scrollX > 0 ? scrollX : 0, scrollY > 0 ? scrollY : 0);
  };
  return (
    <div className={css.Overlay} onClick={handleClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tags} onLoad={onImageLoad} />
      </div>
    </div>
  );
};

export default Modal;
