import css from './SearchBar.module.css';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export function Searchbar({ onSubmit }) {
  const [curentKeyWord, setCurentKeyWord] = useState('');

  const onInputChange = event => {
    setCurentKeyWord(event.target.value);
  };

  const onFormSubmit = event => {
    event.preventDefault();

    onSubmit(curentKeyWord);
    setCurentKeyWord('');
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onFormSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <FiSearch size="16px" />
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={curentKeyWord}
          onChange={onInputChange}
        />
      </form>
    </header>
  );
}
