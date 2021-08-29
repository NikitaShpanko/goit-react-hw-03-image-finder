import { Component, ChangeEventHandler, FormEventHandler } from "react";
import css from "./SearchBar.module.css";

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
      <header className={css.SearchBar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>🔍</span>
          </button>

          <input
            className={css.SearchFormInput}
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
