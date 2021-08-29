import { Component, ChangeEventHandler, FormEventHandler } from "react";
import "./SearchBar.css";

class SearchBar extends Component<{ onSubmit: (value: string) => void }> {
  state = { value: "" };
  handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({ value: e.currentTarget.value });
  };

  handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
