import { Button, Tab, Tabs, TextField } from '@material-ui/core';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Search.css';
import SearchIcon from '@material-ui/icons/Search';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
// import { useLazyFetchSearchQuery } from '../../store/redux-toolkit/api';
import { fetchSearch } from '../../store/search';

function Search() {
  const data = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(10);
  const content = data?.results;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSearch(searchText,page));
    console.log(content)
  },[]);

return (
    <div>
      <div className="search" data-testid="search">
        <TextField
          style={{ flex: 1 }}
          className="searchBox"
          label="Search"
          id="search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          onClick={(dispatch) => fetchSearch({ type, searchText, page })}
          variant="contained"
          data-testid="search-btn"
          style={{ marginLeft: 10 }}
        >
          <SearchIcon fontSize="large" />
        </Button>
      </div>
      <Tabs
        id="tabs"
        value={type}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        style={{ paddingBottom: 5 }}
        aria-label="disabled tabs example"
      >
        <Tab
          style={{ width: '50%' }}
          label="Search Movies"
          data-testid="movie-tab"
        />
        <Tab
          style={{ width: '50%' }}
          label="Search TV Series"
          data-testid="tv-tab"
        />
      </Tabs>

      <div className="trending" data-testid="search-content">
        {content?.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={type ? 'tv' : 'movie'}
            vote_average={c.vote_average}
          />
        ))}
        {searchText &&
          !content &&
          (type ? (
            <h2 data-testid="not-found">No Series Found</h2>
          ) : (
            <h2 data-testid="not-found">No Movies Found</h2>
          ))}
      </div>
      {data?.numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={data.numOfPages} />
      )}
    </div>
  );
}

export default Search;
