import { Component, MouseEventHandler, ReactEventHandler } from "react";
import Loader from "react-loader-spinner";
import { PicData } from "../getPics";
import css from "./Modal.module.css";

interface ModalData extends PicData {
  onClose: () => void;
}

class Modal extends Component<ModalData> {
  state = { loading: true };
  img: HTMLImageElement | null = null;
  div: HTMLDivElement | null = null;
  handleClick: MouseEventHandler = (e) => {
    if (e.currentTarget !== e.target) return;
    this.props.onClose();
  };
  onImageLoad: ReactEventHandler<HTMLImageElement> = (e) => {
    this.img = e.currentTarget;
    this.div = this.img.closest("div");
    this.setState({ loading: false });
  };
  render() {
    const { largeImageURL, tags } = this.props;
    return (
      <div className={css.Overlay} onClick={this.handleClick}>
        <div className={css.Modal}>
          {this.state.loading && (
            <Loader type="Oval" color="#ffffff" width="100px" height="100px" />
          )}
          <img
            src={largeImageURL}
            alt={tags}
            onLoad={this.onImageLoad}
            hidden={this.state.loading}
          />
        </div>
      </div>
    );
  }
  componentDidUpdate() {
    if (!this.div || !this.img) return;
    const scrollX = (this.img.clientWidth - this.div.clientWidth) / 2;
    const scrollY = (this.img.clientHeight - this.div.clientHeight) / 2;
    this.div.scrollTo({
      left: scrollX > 0 ? scrollX : 0,
      top: scrollY > 0 ? scrollY : 0,
    });
  }
}

export default Modal;
