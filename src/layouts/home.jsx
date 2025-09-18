import React, { useEffect } from "react";
import { GifState } from "../context/gif-context";
import Gif from "../components/Gif";
import FilterGifs from "../components/FilterGifs";

export const Home = () => {
  const { giphyResponse, setGifs, gifs, filter, setFilter, favourites } =
    GifState();

  const fetchTrendingGifs = async () => {
    const { data } = await giphyResponse.trending({
      limit: 20,
      type: filter,
      rating: "g",
    });

    setGifs(data);
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, [filter]);

  return (
    <div>
      <img
        src="/banner.gif"
        alt="earth banner"
        className="mt-2 w-full rounded"
      />

      <FilterGifs showTrending={true} />
      <div className="columns-2 md:columns-3 lg:columns-4 xl:column-5 gap-2">
        {gifs.map((gif) => {
          return <Gif gif={gif} key={gif.title} />;
        })}
      </div>
    </div>
  );
};
