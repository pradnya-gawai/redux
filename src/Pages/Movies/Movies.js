import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import { fetchMovies } from '../../store/movies';
// import { useFetchMoviesQuery } from '../../store/redux-toolkit/api';

function Movies() {
  const data = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const content = data?.results;
  // console.log(data.results)

  useEffect(() => {
    // window.scrollTo(0, 0);
    dispatch(fetchMovies(page));
  },[page]);

  return (
    <div data-testid="movies-content">
      <span className="pageTitle" data-testid>
        Discover Movies
      </span>
      <div className="trending" data-testid="explore-movies">
        {content?.map((c) => (
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
      {data?.total_pages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={data.total_pages} />
      )}
    </div>
  );
}

export default Movies;
