import React from 'react';

import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
    <div className="search-container">
      <div>
        <input type="search" id="search" placeholder="Find extensions" />
      </div>

      <div>
        <SearchIcon fontSize={'large'} cursor={'pointer'} />
      </div>
    </div>
  );
};

export default Search;
