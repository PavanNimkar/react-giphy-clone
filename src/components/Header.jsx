import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { HiDotsVertical } from "react-icons/hi";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { GifState } from "../context/gif-context";

export const Header = () => {
  const [categories, setCategories] = useState([]);
  const { giphyResponse } = GifState();
  const [showCategories, setShowCategories] = useState(false);

  const fetchGifCategories = async () => {
    const { data } = await giphyResponse.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav>
      <div className="relative gap-4 flex items-center justify-between">
        <Link to="/" className="flex gap-1">
          <img
            src="logo.svg"
            className="w-8 cursor-pointer text-white"
            alt="GIPHY logo"
          />
          <h1 className="text-white text-5xl font-bold cursor-pointer tracking-tight">
            GIPHY
          </h1>
        </Link>
        <div className="font-bold text-md flex gap-2 items-center">
          {/* rendering categories */}
          {categories?.slice(0, 5)?.map((category) => {
            return (
              <Link
                key={category.name}
                to={`/${category.name_encoded}`}
                className="px-4 py-1 hover:bg-gradient-to-r from-teal-400 via-blue-500 to-pink-500 border-b-4 hidden lg:block"
              >
                {category.name}
              </Link>
            );
          })}

          <button onClick={() => setShowCategories(!showCategories)}>
            <HiDotsVertical
              size={35}
              className={`py-0.2 hover:bg-gradient-to-r from-teal-400 via-blue-500 to-pink-500 ${
                showCategories ? `gradient-bg` : ""
              }  border-b-4 hidden lg:block`}
            />
          </button>
          <div className="h-9 bg-gray-700 rounded cusror-pointer pt-1.5 px-6">
            <Link to="/favourites">Favourite GIFs</Link>
          </div>
          <button>
            <HiMiniBars3BottomRight
              className="text-sky-400 lg:hidden block"
              size={30}
            />
          </button>
        </div>

        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient-bg z-20">
            <span>Categories</span>
            <hr />
            <div>
              <Link className="font-bold" to="/reactions">
                Reactions
              </Link>
            </div>
          </div>
        )}
      </div>
      {/* search */}
    </nav>
  );
};
