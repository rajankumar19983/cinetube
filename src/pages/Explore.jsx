import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import useFetch from "../hooks/useFetch";
import { fetchDataFromApi } from "../utils/fetchData";
import ContentWrapper from "../components/ContentWrapper";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import Img from "../components/LazyLoadImage";
import noResult from "../assets/no-results.png";

let filters = {};

const sortByData = [
  { value: "popularity.desc", label: "Popularity High to Low" },
  { value: "popularity.asc", label: "Popularity Low to High" },
  { value: "vote_average.desc", label: "Rating High to Low" },
  { value: "vote_average.desc", label: "Rating Low to High" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const { mediaType } = useParams();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortBy(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  const onSelectChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortBy(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }
    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }
    setPageNum(1);
    fetchInitialData();
  };

  return (
    <div className="min-h-[700px] pt-[100px]">
      <ContentWrapper>
        <div className="flex justify-between mb-[25px] flex-col md:flex-row">
          <div className="text-[24px] leading-[34px] text-white mb-[20px] md:mb-0">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="flex gap-[10px] flex-col md:flex-row">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onSelectChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortBy}
              options={sortByData}
              onChange={onSelectChange}
              isClearable={true}
              placeholder="Sort By"
              className="react-select-container sortByDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="flex flex-wrap gap-[10px] mb-[50px] md:gap-[20px]"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.mediaType === "person") return;
                  return (
                    <MovieCard
                      className="explorePageMovieCard relative"
                      key={index}
                      data={item}
                      mediaType={mediaType}
                    />
                  );
                })}
              </InfiniteScroll>
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
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Explore;
