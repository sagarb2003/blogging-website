import React from "react";
export const Appbar = () => {
  return (
    <nav className="bg-gray-300 border-slate-500 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://miro.medium.com/v2/resize:fill:270:181/1*P85gowan0ZBnI1RgfPgeiw.png"
            className="h-8"
            alt=""
          />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-black">
            BlogVista
          </span>
        </a>
        <div>
          <img
            className="w-8 h-8 rounded-full"
            src="https://miro.medium.com/v2/resize:fill:270:181/1*P85gowan0ZBnI1RgfPgeiw.png"
            alt="user photo"
          />
        </div>
      </div>
    </nav>
  );
};
