import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/fetchData";
import ContentWrapper from "../components/ContentWrapper";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import noResult from "../assets/no-results.png";
import Img from "../components/LazyLoadImage";

const SearchResults = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = (pageNum) => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData(1);
  }, [query]);

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({ ...data, results: [...data?.results, ...res.results] });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  return (
    <div className="min-h-[700px] pt-[100px]">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="text-[24px] leading-[34px] text-white mb-[25px]">
                {`Search ${
                  data.total_results > 1 ? "results" : "result"
                } for '${query}'`}
              </div>
              <InfiniteScroll
                className="flex flex-wrap gap-[10px] mb-[50px] md:gap-5"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item?.media_type === "person") return;
                  return (
                    <MovieCard
                      className="searchResultMovieCard"
                      key={index}
                      data={item}
                      fromSearch={true}
                    />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="flex flex-col">
              <span className="text-[24px] text-black_light">
                Sorry, Results Not Found
              </span>
              <div className="flex justify-center items-center w-full h-[600px] py-[100px] md:py-0">
                <Img
                  className={
                    "w-1/2 min-w-[250px] mx-auto my-auto md:mt-[-10px]"
                  }
                  src={noResult}
                />
              </div>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResults;
