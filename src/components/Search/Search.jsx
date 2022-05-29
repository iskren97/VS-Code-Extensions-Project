import React from 'react';
import './Search.css';

import SearchIcon from '@mui/icons-material/Search';

const Search = ({ setSearch }) => {
  return (
    <div className="search-container">
      <div>
        <input
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value.toLowerCase());
          }}
          type="search"
          id="search"
          placeholder="search extension title, tag ..."
        />
      </div>

      <div>
        <SearchIcon fontSize={'large'} cursor={'pointer'} />
      </div>
    </div>
  );
};

export default Search;
