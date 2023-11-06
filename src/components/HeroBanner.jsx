import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "./LazyLoadImage";
import ContentWrapper from "./ContentWrapper";

const HeroBanner = () => {
  const [heroBackground, setHeroBackground] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const { url } = useSelector((store) => store.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url?.backdrop +
      String(
        data?.results?.[Math.floor(Math.random() * data?.results?.length)]
          ?.backdrop_path
      );
    setHeroBackground(bg);
    console.log(url);
    console.log("heroBG===>" + heroBackground);
  }, [data]);

  const searchQueryHandler = (e) => {
    if ((e.key === "Enter" || e.type === "click") && searchQuery.length > 0) {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <div className="w-full h-[450px] md:h-[700px] bg-black_1 flex items-center relative">
      {!loading &&
        heroBackground &&
        !heroBackground.includes("undefined") &&
        url?.backdrop && (
          <div className="w-full h-full absolute top-0 left-0 opacity-50 overflow-hidden">
            {console.log(heroBackground)}
            <Img
              className="w-full h-full object-cover object-center"
              src={heroBackground}
            />
          </div>
        )}
      <div className="w-full h-[250px] absolute bottom-0 left-0 hero_opac_layer"></div>
      <ContentWrapper>
        <div className="flex flex-col items-center text-white text-center relative max-w-[800px] mx-auto">
          <span className="text-[50px] font-bold mb-[10px] md:text-[90px] md:mb-0">
            Welcome
          </span>
          <span className="text-[18px] font-medium mb-[40px] md:text-[24px]">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="flex items-center w-full">
            <input
              className="w-full-100px h-[50px] bg-white outline-0 border-none rounded-l-full px-[15px] text-[14px] md:w-full-150px md:h-[60px] md:text-[20px] md:px-[30px] text-black"
              type="text"
              placeholder="Search for a movie, tv show..."
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button
              className="w-[100px] h-[50px] bg-app-theme text-white outline-0 border-none rounded-r-full text-[16px] md:w-[150px] md:h-[60px] md:text-[18px]"
              onClick={searchQueryHandler}
            >
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
