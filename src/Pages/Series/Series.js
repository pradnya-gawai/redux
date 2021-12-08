import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import { fetchSeries } from '../../store/series';
// import { useFetchTvSeriesQuery } from '../../store/redux-toolkit/api';

function Series() {
  const data = useSelector((state) => state.series);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const content = data?.results;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSeries(page));
  },[]);

  return (
    <div>
      <span className="pageTitle">Discover TV Series</span>
      <div className="trending" data-testid="explore-series">
        {content?.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type="tv"
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

export default Series;
