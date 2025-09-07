import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
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
        {/* rendering categories */}
        <Link className="px-4 py-1 gradient-bg border-b-4 hidden lg:block">
          Reactions
        </Link>
      </div>
    </nav>
  );
};
