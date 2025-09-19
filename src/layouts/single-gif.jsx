import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gif from "../components/Gif";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import FollowOn from "../components/FollowOn";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { IoCodeSharp } from "react-icons/io5";
import { faCode } from "@fortawesome/free-solid-svg-icons";

const contentType = ["gifs", "stickers", "texts"];

export const SingleGif = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const { giphyResponse, favourites, addToFavourites } = GifState();

  const fetchGif = async () => {
    const gifID = slug.split("-");
    // console.log(gifID);

    const { data } = await giphyResponse.gif(gifID[gifID.length - 1]);
    const { data: related } = await giphyResponse.related(
      gifID[gifID.length - 1],
      {
        limit: 10,
      }
    );
    // console.log(data);
    console.log(related);

    setGif(data);
    setRelatedGifs(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    fetchGif();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 my-10">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="whitespace-pre-line py-4 text-gray-400 text-sm">
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.length > 100
                  ? gif?.user?.description.slice(0, 100) + "..."
                  : gif?.user?.description.slice(0, 100)}
                {gif?.user?.description.length > 100 && (
                  <div
                    className="flex items-center faded-text cursor-pointer"
                    onClick={() => {
                      setReadMore(!readMore);
                    }}
                  >
                    {readMore ? (
                      <>
                        Read less <HiMiniChevronUp size={20} />{" "}
                      </>
                    ) : (
                      <>
                        Read more
                        <HiMiniChevronDown size={20} />
                      </>
                    )}
                  </div>
                )}
              </p>
            )}
          </>
        )}
        <FollowOn />
        <div className="divider"></div>
        {gif?.source && (
          <div>
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />
            {/* mobile ui */}
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
              <button
                className="ml-auto"
                onClick={() => {
                  addToFavourites(gif.id);
                }}
              >
                <HiMiniHeart
                  size={30}
                  className={`${
                    favourites.includes(gif.id) ? "text-red-600" : ""
                  }`}
                />
              </button>
              <button className="ml-auto">
                <FontAwesomeIcon icon={faPaperPlane} size="lg" />
              </button>
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addToFavourites(gif.id)}
              className="flex gap-5 items-center font-bold text-lg cursor-pointer"
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favourites.includes(gif.id) ? "text-red-600" : ""
                }`}
              />
              Favourite
            </button>
            <button className="flex gap-6 items-center font-bold text-lg cursor-pointer">
              <FontAwesomeIcon icon={faPaperPlane} size="lg" /> Share
            </button>
            <button className="flex gap-6 items-center font-bold text-lg cursor-pointer">
              <FontAwesomeIcon icon={faCode} size="lg" /> Embed
            </button>
          </div>
        </div>
        <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
            {relatedGifs.slice(1).map((gif) => {
              return <Gif gif={gif} key={gif.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
