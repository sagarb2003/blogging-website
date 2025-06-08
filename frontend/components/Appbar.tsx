import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/blogvista.png";
import toast from "react-hot-toast";
import { Search, PenSquare, LogOut, CircleUser } from "lucide-react";

interface AppbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Appbar = ({ searchQuery, setSearchQuery }: AppbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    toast.success("Logged Out successfully");
    // Redirect to the login page
    navigate("/signin");
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        <a
          href="/blogs"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={image} className="w-26 h-14 rounded-md" alt="" />
        </a>
        <div className="relative ml-3">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-96 p-3 ps-10 text-md text-gray-900 border border-gray-200 rounded-full bg-gray-50 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 ease-in-out"
            placeholder="Search Blogs"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex ">
          <div className="pr-5">
            <Link to="/blog/publish" className="hover:bg-gray-100 p-2 rounded-full transition-all duration-200 inline-flex">
              <PenSquare className="w-6 h-6 text-gray-700" />
            </Link>
          </div>
          <div className="relative mt-1.5" ref={dropdownRef}>
            <CircleUser
              onClick={toggleDropdown}
              className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200"
            />

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div
                className="z-10 absolute top-full right-0 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-48 mt-2 border border-gray-200"
                onClick={closeDropdown}
              >
                <ul className="py-1 text-sm text-gray-700">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-50 transition-colors duration-150 text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
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
