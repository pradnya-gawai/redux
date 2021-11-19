import { useEffect, useState } from "react";
import axios from "axios";
import "./Trending.css";
import { trendingURL } from "../../config/config";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

function Trending() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [mode, setMode] = useState("ONLINE");

  // console.log(process.env);
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `${trendingURL}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    // console.log(data.results);
    // seting data to Content
    setContent(data.results);
    localStorage.setItem("trending", JSON.stringify(data.results));
  };
  // every time page changes this will call
  useEffect(() => {
    // window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  // effect for online and offline user
  useEffect(() => {
    if (navigator.onLine) {
      setMode("ONLINE");
    } else {
      setMode("OFFLINE");
      const collection = localStorage.getItem("trending");
      setContent(JSON.parse(collection));
    }
  }, [mode]);

  return (
    <div>
      {/* ofline mode alert */}
      <div>
        {mode === "OFFLINE" ? (
          <div className="offline-mode" role="alert">
            you are in offline mode or some issue with internet
          </div>
        ) : null}
      </div>

      <span className="pageTitle">Trending Today</span>
      <div className="trending">
        {content &&
          content.map((c) => (
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
