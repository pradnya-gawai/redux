import { Badge } from "@material-ui/core";
import { imgSmall, unavailable } from "../../config/config";
import "./SingleContent.css";

function SingleContent  ({
  poster,
  title,
  date,
  media_type,
  vote_average,
})  {
  return (
    <div className="media" data-testid="single">
      <Badge  
        badgeContent={vote_average}
        color={vote_average > 7 ? "secondary" : "primary"}
        />
      <img data-testid="poster-img"
        className="poster"
        src={poster ? `${imgSmall}${poster}` : unavailable}
        alt={title}
      />
      <b className="title" data-testid="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle" data-testid="subTitle">{date}</span>
      </span>
    </div>
  );
};

export default SingleContent;
