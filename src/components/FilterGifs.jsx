import React from "react";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { GifState } from "../context/gif-context";

const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];

const FilterGif = ({ alignLeft = true, showTrending = true }) => {
  const { filter, setFilter } = GifState();

  return (
    <div
      className={`flex my-3 gap-3 ${alignLeft ? "" : "justify-end"} ${
        showTrending
          ? "justify-between flex-col sm:flex-row sm:items-center"
          : ""
      }`}
    >
      {showTrending && (
        <div className="flex gap-2">
          <HiMiniArrowTrendingUp size={25} className="text-teal-400" />
          <span className="font-semibold text-gray-400">Trending</span>
        </div>
      )}
      <div className="min-w-80 flex rounded-full bg-gray-800">
        {filters.map((single_filter) => {
          return (
            <span
              onClick={() => setFilter(single_filter.value)}
              className={`${
                filter === single_filter.value ? single_filter.background : ""
              }font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer`}
              key={single_filter.title}
            >
              {single_filter.title}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FilterGif;
