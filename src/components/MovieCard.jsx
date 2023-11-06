import React, { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Img from "./LazyLoadImage";
import CircleRating from "./CircleRating";
import Genres from "./Genres";
import PosterFallback from "../assets/no-poster.png";
import { twMerge } from "tailwind-merge";
import { UserAuth } from "../context/AuthContext";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const { url } = useSelector((store) => store.home);
  const navigate = useNavigate();
  const posterUrl = data?.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;

  // const saveShow = async () => {
  //   if(user?.email) {
  //     setLiked(!liked)
  //     setSaved(!saved)
  //     await
  //   }
  // }

  return (
    <div
      className="w-50%-5px mb-[25px] cursor-pointer flex-shrink-0 md:w-25%-15px lg:w-20%-16px"
      onClick={() => navigate(`/${data?.media_type || mediaType}/${data.id}`)}
    >
      <div
        className={twMerge(
          "relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px] transitionAll5By10Ease movieCardPosterBlock"
        )}
      >
        <Img
          className="w-full h-full object-cover object-center"
          src={posterUrl}
        />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating
              styles={
                "w-[40px] h-[40px] relative top-[30px] bg-white flex-shrink-0 md:w-[50px] md:h-[50px]"
              }
              rating={data.vote_average.toFixed(1)}
              textColor="#04152d"
            />
            <Genres
              className={"hidden relative md:flex md:flex-wrap md:justify-end"}
              data={data.genre_ids.slice(0, 2)}
            />
          </React.Fragment>
        )}
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white p-2">
          <p>{}</p>
        </div>
      </div>
      <div className="textBlock text-white flex flex-col">
        <span className="text-[16px] mb-[10px] leading-6 md:text-[20px] line-clamp-1 overflow-hidden">
          {data.title || data.name}
        </span>
        <span className="text-[14px] opacity-50">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
