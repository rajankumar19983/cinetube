import React from "react";
import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import dayjs from "dayjs";
import ContentWrapper from "./ContentWrapper";
import Img from "./LazyLoadImage";
import PosterFallback from "../assets/no-poster.png";
import CircleRating from "./CircleRating";
import Genres from "./Genres";

const navArrowStyle =
  "text-[30px] text-black absolute top-[44%] translate-y-[-50%] cursor-pointer opacity-50 z-[1] hidden md:block hover:opacity-80";

const Carousel = ({ data, loading, endPoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((store) => store.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="w-[125px] md:w-25%-15px lg:w-20%-16px flex-shrink-0">
        <div className="rounded-[12px] w-full aspect-[1/1.5] mb-[30px] skeleton animate-[shimmer]"></div>
        <div className="flex flex-col">
          <div className="w-full h-[20px] mb-[10px] skeleton"></div>
          <div className="w-[75%] h-[20px] skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-[50px]">
      <ContentWrapper className={"relative"}>
        {title && (
          <div className="text-[24px] text-white mb-[20px] font-normal">
            {title}
          </div>
        )}
        <BsFillArrowLeftCircleFill
          className={`${navArrowStyle} left-[30px]`}
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className={`${navArrowStyle} right-[30px]`}
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div
            className="flex gap-[10px] overflow-y-hidden mx-[-20px] px-[20px] md:gap-[20px] md:overflow-hidden md:m-0 md:p-0"
            ref={carouselContainer}
          >
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  key={item.id}
                  className="w-[125px] cursor-pointer md:w-25%-15px lg:w-20%-16px flex-shrink-0"
                  onClick={() =>
                    navigate(`/${item.media_type || endPoint}/${item.id}`)
                  }
                >
                  <div className="relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px] posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating
                      rating={item.vote_average.toFixed(1)}
                      styles="w-[40px] h-[40px] relative top-[30px] bg-white flex-shrink-0 md:w-[50px] md:h-[50px]"
                      textColor="#04152d"
                    />
                    <Genres
                      className={
                        "hidden relative md:flex md:flex-wrap justify-end"
                      }
                      data={item.genre_ids.slice(0, 2)}
                    />
                  </div>
                  <div className="text-white flex flex-col">
                    <span className="text-[16px] mb-10px leading-[24px] md:text-[20px]">
                      {item.title || item.name}
                    </span>
                    <span className="text-[14px] opacity-50">
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-[10px] overflow-y-hidden mx-[-20px] px-[20px] md:gap-[20px] md:overflow-hidden md:m-0 md:p-0">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
