import { useEffect, useState } from "react";
import axios from "axios";
import { tvURL } from "../../config/config";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

function Series ()  {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  
  const fetchTV = async () => {
    const { data } = await axios.get(
      `${tvURL}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };
  useEffect(() => {
    // window.scroll(0, 0);
    fetchTV();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle">
  Discover TV Series
      </span>
      <div className="trending" data-testid="series">
        {content &&
          content.map((c) => (
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
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Series;
