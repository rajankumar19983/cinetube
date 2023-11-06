import React from "react";
import ReactPlayer from "react-player";
import { twMerge } from "tailwind-merge";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };

  return (
    <div
      className={twMerge(
        `flex justify-center items-center w-full h-full fixed top-0 left-0 opacity-0 invisible z-[100] ${
          show ? "opacity-100 visible" : ""
        }`
      )}
    >
      <div
        className={twMerge(
          `absolute top-0 left-0 w-full h-full bg-black/25 backdrop-blur-[3.5px] opacity-0 transition-opacity duration-[400ms] ${
            show ? "opacity-100" : ""
          }`
        )}
        onClick={hidePopup}
      ></div>
      <div
        className={twMerge(
          `relative w-[800px] aspect-[16/9] bg-white scale-[0.2] transition-transform duration-[250ms] ${
            show ? "scale-100" : ""
          }`
        )}
      >
        <span
          className="absolute top-[-20px] right-0 text-white cursor-pointer"
          onClick={hidePopup}
        >
          Close
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
          playing={true}
        />
      </div>
    </div>
  );
};

export default VideoPopup;
