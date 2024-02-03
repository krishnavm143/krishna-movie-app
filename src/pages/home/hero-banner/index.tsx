import { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUpcomingStart } from "../../../redux/slice/homeSlice";
import {
  selectAllMovies,
  selectLoadingState,
  selectUrl,
} from "../../../redux/selector";
import { constants } from "../../../constants";
import { LazyImage } from "../../../components/lazy-load-image";
import { ContentWrapper } from "../../../components/content-wrapper";
const HomeBanner = () => {
  const movies = useSelector(selectAllMovies);
  const url = useSelector(selectUrl);
  const loading = useSelector(selectLoadingState);

  const [background, setBackground] = useState<string>(constants?.EMPTY_STRING);
  const [query, setQuery] = useState<string>(constants?.EMPTY_STRING);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (movies && movies?.results && movies?.results?.length > 0) {
      const bg =
        movies &&
        url?.backdrop +
          movies?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
      setBackground(bg);
    }
  }, [movies, url]);

  useEffect(() => {
    dispatch(getUpcomingStart({ url: constants?.UPCOMING_PATH, params: "" }));
  }, []);
  const searchQueryHandler = (e: KeyboardEvent) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div>
      <div className="heroBanner">
        {!loading && (
          <div className="backdrop-img">
            <LazyImage src={background} />
          </div>
        )}
        <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subTitle">
              Millions of movies Tv shows and people to discover . Explore now .
            </span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or Tv show....."
                onKeyUp={searchQueryHandler}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button>Search</button>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

export { HomeBanner };
