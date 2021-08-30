import { Component, MouseEventHandler } from "react";
import Loader from "react-loader-spinner";
import getPics, { PicData, PixResponse } from "./getPics";
import { pixabay } from "./config.json";

import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";

export interface AppState extends PixResponse {
  query: string;
  page: number;
  pageCount: number;
  loading: boolean;
  modalIndex: number;
}

class App extends Component<{}, AppState> {
  state = {
    total: 0,
    totalHits: 0,
    hits: [] as PicData[],
    query: "",
    page: 1,
    pageCount: 1,
    loading: false,
    modalIndex: -1,
  };
  allowScroll = true;

  componentDidMount() {
    document.addEventListener("keydown", (e) => {
      if (this.state.modalIndex < 0) return;
      if (e.code === "Escape") this.setState({ modalIndex: -1 });
    });
  }

  handleSubmit = async (value: string) => {
    try {
      this.setState({ loading: true });
      const data = (await getPics(value)) as AppState;
      data.query = value;
      data.page = 1;
      data.pageCount = Math.ceil(data.total / pixabay.per_page);
      data.loading = false;
      this.setState(data);
    } catch (error) {
      this.handleError(error as Error);
    }
  };

  handleGalleryClick: MouseEventHandler = (e) => {
    const li = (e.target as HTMLElement).closest("li");
    if (!li) return;
    this.allowScroll = false;
    this.setState({ modalIndex: Number(li.dataset.index) });
  };

  handleLoadMore = async () => {
    try {
      const currentState = this.state;
      this.setState({ loading: true });
      const data = (await getPics(
        currentState.query,
        ++currentState.page
      )) as AppState;
      currentState.hits.push(...data.hits);
      currentState.loading = false;
      this.setState(currentState);
    } catch (error) {
      this.handleError(error as Error);
    }
  };

  handleModalClose = () => {
    this.allowScroll = false;
    this.setState({ modalIndex: -1 });
  };

  handleError(error: Error) {
    alert(error.message);
    this.setState((prev) => ({ loading: false, pageCount: prev.page }));
  }

  componentDidUpdate() {
    if (!this.allowScroll) {
      this.allowScroll = true;
      return;
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        {this.state.query && !this.state.pageCount && <p>Nothing found.</p>}
        <ImageGallery {...this.state} onClick={this.handleGalleryClick} />
        {this.state.loading && (
          <Loader type="Oval" color="#4354b0" width="50px" height="50px" />
        )}
        {this.state.page < this.state.pageCount && (
          <Button onClick={this.handleLoadMore} />
        )}
        {this.state.modalIndex > -1 && (
          <Modal
            {...this.state.hits[this.state.modalIndex]}
            onClose={this.handleModalClose}
          />
        )}
      </>
    );
  }
}

export default App;
