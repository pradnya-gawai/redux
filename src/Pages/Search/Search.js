import { Button, Tab, Tabs, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { searchURL } from "../../config/config";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";

function Search () {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  
  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `${searchURL}${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      console.log(data);
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
     // console.error(error);
    }
  };

  useEffect(() => {
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <div className="search" data-testid="search">
        <TextField
          style={{ flex: 1 }}
          className="searchBox"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          onClick={fetchSearch}
          variant="contained"
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
          console.log(newValue);

          setType(newValue);
          setPage(1);
        }}
        style={{ paddingBottom: 5 }}
        aria-label="disabled tabs example"
      >
        <Tab style={{ width: "50%" }} label="Search Movies" />
        <Tab style={{ width: "50%" }} label="Search TV Series" />
      </Tabs>

      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
