import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import './Trending.css';
import { fetchTrending } from '../../store/trending';

function Trending() {
  const data = useSelector((state) => state.trending);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [mode, setMode] = useState('ONLINE');
  const content = data?.results;

  // effect for online and offline user
  useEffect(() => {
    dispatch(fetchTrending(page));
    if (navigator.onLine) {
      setMode('ONLINE');
    } else {
      setMode('OFFLINE');
    }
  }, [mode]);

  return (
    <div>
      {/* ofline mode alert */}
      <div>
        {mode === 'OFFLINE' ? (
          <div className="offline-mode" role="alert">
            you are in offline mode or some issue with internet
          </div>
        ) : null}
      </div>

      <span className="pageTitle">Trending Today</span>
      <div className="trending" data-testid="trending">
        {content?.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            vote_average={c.vote_average}
          />
        ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
}

export default Trending;
