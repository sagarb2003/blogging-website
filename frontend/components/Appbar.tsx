import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/blogvista.png";
export const Appbar = () => {
  return (
    <nav className="bg-gray-300 border-slate-500 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a
          href="/blogs"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={image} className="w-26 h-14 rounded-md" alt="" />
        </a>

        <div className="flex ">
          <div className="pr-5">
            <Link
              to="/blog/publish"
              className="bg-green-700 hover:bg-green-800 text-white font-medium rounded-md text-lg px-4 py-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Publish
            </Link>
          </div>
          <div>
            <img
              className="w-10 h-9 rounded-full border-2 border-slate-800 "
              src="https://miro.medium.com/v2/resize:fill:270:181/1*P85gowan0ZBnI1RgfPgeiw.png"
              alt="user photo"
            />
          </div>
          <div></div>
        </div>
      </div>
    </nav>
  );
};
