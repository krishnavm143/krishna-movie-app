import { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUpcomingStart } from "../../../redux/slice/homeSlice";
import { selectAllMovies, selectUrl } from "../../../redux/selector";
const HomeBanner = () => {
  const movies = useSelector(selectAllMovies);
  const url = useSelector(selectUrl);

  const [background, setBackground] = useState<string>("");
  const [query, setQuery] = useState<string>("");
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
    dispatch(getUpcomingStart({ url: "/movie/upcoming", params: "" }));
  }, []);
  const searchQueryHandler = (e: KeyboardEvent) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div>
      <div className="homeBanner">
        <div className="wrapper">
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
        </div>
      </div>
    </div>
  );
};

export { HomeBanner };
