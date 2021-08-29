import React from "react";
import getPics, { PicData, PixResponse } from "./getPics";
import { pixabay } from "./config.json";

import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";

import "./App.css";

export interface AppState extends PixResponse {
  query: string;
  page: number;
  pageCount: number;
  loading: boolean;
}

class App extends React.Component<{}, AppState> {
  state = {
    total: 0,
    totalHits: 0,
    hits: [] as PicData[],
    query: "",
    page: 1,
    pageCount: 1,
    loading: false,
  };

  handleSubmit = async (value: string) => {
    this.setState({ loading: true });
    const data = (await getPics(value)) as AppState;
    data.query = value;
    data.page = 1;
    data.pageCount = Math.ceil(data.total / pixabay.per_page);
    data.loading = false;
    this.setState(data);
  };

  handleLoadMore = async () => {
    const currentState = this.state;
    this.setState({ loading: true });
    const data = (await getPics(
      currentState.query,
      ++currentState.page
    )) as AppState;
    currentState.hits.push(...data.hits);
    currentState.loading = false;
    this.setState(currentState);
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery {...this.state} />
        {this.state.loading && <Loader />}
        {this.state.page < this.state.pageCount && (
          <Button onClick={this.handleLoadMore} />
        )}
      </>
    );
  }

  componentDidUpdate() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }
}

export default App;
