import React from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import DetailsBanner from "../components/DetailsBanner";
import Cast from "../components/Cast";
import VideoSection from "../components/VideoSection";
import Similar from "../components/Similar";
import Recommendation from "../components/Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  const trailerData = data?.results?.filter((r) => {
    return ["Official Trailer", "Original Trailer", "Trailer"].includes(r.name);
  });

  console.log(data);

  return (
    <div>
      <DetailsBanner
        video={trailerData?.[0]}
        crew={credits?.crew}
      />
      <Cast
        data={credits?.cast}
        loading={creditsLoading}
      />
      <VideoSection
        data={data}
        loading={loading}
      />
      <Similar
        mediaType={mediaType}
        id={id}
      />
      <Recommendation
        mediaType={mediaType}
        id={id}
      />
    </div>
  );
};

export default Details;
