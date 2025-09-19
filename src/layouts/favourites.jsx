import React, { useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import Gif from "../components/Gif";

export const Favourites = () => {
  const [favouritesGIFs, setFavouriteGIFs] = useState([]);
  const { giphyResponse, favourites, addToFavourites } = GifState();

  const fetchFavouriteGifs = async () => {
    const { data: gifs } = await giphyResponse.gifs(favourites);
    setFavouriteGIFs(gifs);
  };

  useEffect(() => {
    fetchFavouriteGifs();
  }, []);

  return (
    <div className="mt-2">
      <span className="faded-text mb-2">My Favourites</span>
      <div className="columns-2 md:columns-3 lg:columns-4  gap-2">
        {favouritesGIFs.map((gif) => {
          return <Gif gif={gif} key={gif.title} />;
        })}
      </div>
    </div>
  );
};
