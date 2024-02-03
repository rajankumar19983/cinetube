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

  // Labels to be added if any new way of labeling found.
  const trailerLabels = ["Official Trailer", "Original Trailer", "Trailer"];

  const checkTrailerLabel = (mediaName, labels) => {
    return labels.some((label) => mediaName.includes(label));
  };

  const trailerData = data?.results?.filter((r) => {
    return checkTrailerLabel(r.name, trailerLabels);
  });

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
