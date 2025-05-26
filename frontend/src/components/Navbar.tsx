import { Link, useNavigate } from "react-router-dom";
import { Smartphone, Search, UserCircle, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useSearch } from "../context/SearchContext";
import { useState, useEffect } from "react";
import type { FormEvent } from "react";

export default function Navbar() {
  const { searchQuery, setSearchQuery } = useSearch();
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-md dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            <Smartphone className="mr-2 h-7 w-7" />
            MobileMart
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-grow max-w-xl mx-4 items-center border border-gray-300 dark:border-gray-700 rounded-md"
          >
            <input
              type="text"
              placeholder="Search for used mobile phones..."
              className="px-4 py-2 w-full rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white dark:bg-gray-800 dark:text-gray-100"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            {localSearch && (
              <Button
                type="button"
                variant="ghost"
                className="px-2"
                onClick={() => {
                  setLocalSearch("");
                  setSearchQuery("");
                }}
              >
                <span className="text-gray-400 dark:text-gray-500">×</span>
              </Button>
            )}
            <Button
              type="submit"
              variant="ghost"
              className="px-4 rounded-r-md border-l border-gray-300 dark:border-gray-700"
            >
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </Button>
          </form>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex items-center">
              <Globe className="h-4 w-4 mr-1" /> English-USD
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <UserCircle className="h-5 w-5 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-gray-700 dark:text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 text-sm">
              Sign Up
            </Button>
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md"
          >
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 w-full rounded-l-md focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white dark:bg-gray-800 dark:text-gray-100"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            {localSearch && (
              <Button
                type="button"
                variant="ghost"
                className="px-2"
                onClick={() => {
                  setLocalSearch("");
                  setSearchQuery("");
                }}
              >
                <span className="text-gray-400 dark:text-gray-500">×</span>
              </Button>
            )}
            <Button
              type="submit"
              variant="ghost"
              className="px-3 rounded-r-md border-l border-gray-300 dark:border-gray-700"
            >
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
