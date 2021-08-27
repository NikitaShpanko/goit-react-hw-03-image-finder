import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import getPics, { PixResponse } from "./getPics";
import { pixabay } from "./config.json";

import "./App.css";
import ImageGallery from "./ImageGallery/ImageGallery";

export interface AppState extends PixResponse {
  page: number;
  pageCount: number;
}

class App extends React.Component<{}, AppState> {
  state = { page: 1, pageCount: 1, total: 0, totalHits: 0, hits: [] };
  handleSubmit = async (value: string) => {
    const data = (await getPics(value)) as AppState;
    data.page = 1;
    data.pageCount = Math.ceil(data.total / pixabay.per_page);
    this.setState(data);
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery {...this.state} />
      </>
    );
  }
}

export default App;
