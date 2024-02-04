import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlInfo, SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import logo from "../../assets/movix-logo.svg";
import { ContentWrapper } from "../content-wrapper";

const Header = () => {
  const [show, setShow] = useState<string>("top");
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [showSearch, setShowSearch] = useState<any>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.addEventListener("scroll", controlNavBar);
    return () => {
      window.removeEventListener("scroll", controlNavBar);
    };
  }, [lastScrollY]);

  const controlNavBar = () => {
    console.log(window.scrollY);
  };

  const searchQueryHandler = (e: KeyboardEvent) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = {
    ["movie"]: () => {
      navigate("/explore/movie"), setMobileMenu(false);
      setShowSearch(false);
    },
    ["tv"]: () => {
      navigate("/explore/tv"), setMobileMenu(false), setShowSearch(false);
    },
    ["home"]: () => {
      navigate("/"), setShowSearch(false), setMobileMenu(false);
    },
  };
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div
          className="logo"
          onClick={() => {
            navigationHandler["home"]();
          }}
        >
          <img src={logo} />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler["movie"]()}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler["tv"]()}>
            Tv Show
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or Tv show....."
                onKeyUp={searchQueryHandler}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export { Header };
