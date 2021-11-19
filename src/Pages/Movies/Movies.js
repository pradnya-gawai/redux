import axios from "axios";
import { useEffect, useState } from "react";
import { moviesURL } from "../../config/config";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

function Movies() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(
        `${moviesURL}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
      );
       // console.log(data);
      // console.log(data.results);
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div data-testid="movies-content">
      <span className="pageTitle" data-testid>
        Discover Movies
      </span>
      <div className="trending" data-testid="s-id">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
}

export default Movies;
