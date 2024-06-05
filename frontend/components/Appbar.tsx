import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/blogvista.png";

interface AppbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Appbar = ({ searchQuery, setSearchQuery }: AppbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-300 border-slate-500 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a
          href="/blogs"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={image} className="w-26 h-14 rounded-md" alt="" />
        </a>
        <div className="relative ml-3">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-96 p-3 ps-10 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Blogs"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex ">
          <div className="pr-5">
            <Link to="/blog/publish">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </Link>
          </div>
          <div className="relative">
            <img
              onClick={toggleDropdown}
              className="w-10 h-9 rounded-full border-2 border-slate-800 cursor-pointer"
              src="https://miro.medium.com/v2/resize:fill:270:181/1*P85gowan0ZBnI1RgfPgeiw.png"
              alt="user photo"
            />

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div
                className="z-10 absolute top-full  left-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-22 dark:bg-gray-700"
                onClick={closeDropdown}
              >
                <ul className="py-1 text-md text-gray-500 dark:text-gray-200">
                  {/* <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li> */}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
