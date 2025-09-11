import { GiphyFetch } from "@giphy/js-fetch-api";
import { Children, createContext, useContext, useState } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favourites, setFavourites] = useStatee([]);

  const giphyResponse = new GiphyFetch(import.meta.env.VITE_GIPHY_APIKEY);
  return (
    <GifContext.Provider
      value={{ giphyResponse, gifs, setGifs, filter, setFilter, favourites }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default { GifContext, GifProvider };
