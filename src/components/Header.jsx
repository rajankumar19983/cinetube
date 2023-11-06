import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ContentWrapper from "./ContentWrapper";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

const Header = () => {
  const [showHeader, setShowHeader] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const listStyle = `text-white font-medium cursor-pointer hover:text-pink ${
    mobileMenu
      ? "text-[20px] w-full h-auto px-[20px] py-[15px] m-0 flex flex-col items-start last:hidden"
      : "h-[60px] text-2xl flex items-center mx-[15px] relative"
  }`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShowHeader("hide");
      } else {
        setShowHeader("show");
      }
    } else {
      setShowHeader("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && searchQuery.length > 0) {
      navigate(`/search/${searchQuery}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header
      className={twMerge(
        `fixed w-full h-[60px] flex items-center transitionAll3By10Ease z-[2] ${
          showHeader === "top"
            ? "bg-transparent/25 backdrop-filter backdrop-blur-[3.5px]"
            : showHeader === "show"
            ? "bg-black_3"
            : "translate-y-[-60px]"
        }${mobileMenu ? " bg-black_3" : ""}`
      )}
    >
      <ContentWrapper className="flex items-center justify-between">
        <div>
          <span
            className="cursor-pointer h-[50px] font-bold text-2xl md:text-4xl tracking-tighter text-opacity-0 bg-app-theme bg-clip-text text-transparent text-center"
            onClick={() => navigate("/")}
          >
            CINETUBE
          </span>
        </div>
        <ul
          className={`${
            mobileMenu
              ? "w-full flex flex-col absolute top-[60px] left-0 bg-black_3 py-[20px] border-t border-solid border-t-white/10 animate-[mobileMenu_0.3s_ease_forwards]"
              : "list-none hidden items-center md:flex"
          }`}
        >
          <li
            className={listStyle}
            onClick={() => navigationHandler("movie")}
          >
            Movies
          </li>
          <li
            className={listStyle}
            onClick={() => navigationHandler("tv")}
          >
            TV Shows
          </li>
          <li className={listStyle}>
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="flex items-center gap-[20px] md:hidden">
          <HiOutlineSearch
            className="text-2xl text-white font-medium"
            onClick={openSearch}
          />
          {mobileMenu ? (
            <VscChromeClose
              className="text-2xl text-white font-medium"
              onClick={() => setMobileMenu(false)}
            />
          ) : (
            <SlMenu
              className="text-2xl text-white font-medium"
              onClick={openMobileMenu}
            />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="w-full h-[60px] bg-white absolute top-[60px] animate-[mobileMenu_0.3s_ease_forwards]">
          <ContentWrapper>
            <div className="w-full flex items-center h-[40px] mt-[10px]">
              <input
                className="w-full h-[50px] bg-white outline-0 border-none rounded-l-[30px] px-[15px] text-[14px] md:h-[60px] md:text-[20px] md:px-[30px]"
                type="text"
                placeholder="Search for a movie, tv show..."
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose
                className="text-[20px] flex-shrink-0 ml-[10px] cursor-pointer"
                onClick={() => setShowSearch(false)}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
