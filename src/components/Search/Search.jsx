import React from 'react';
import './Search.css';

import SearchIcon from '@mui/icons-material/Search';

const Search = ({ setSearch, searchType }) => {
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
          placeholder={
            searchType ? searchType : 'search extension title, tag ...'
          }
        />
      </div>

      <div>
        <SearchIcon fontSize={'large'} cursor={'pointer'} sx={{color:'white'}} />
      </div>
    </div>
  );
};

export default Search;
