import React, { useState } from "react";
import { Search, X } from "lucide-react";
import axios from "axios";

function SearchBar({ setJobs, setSearchmode, mode, fetchjobs }) {
  const [query, setQuery] = useState("");

  // Handle input change
  const handleSearch = async (e) => {
    setSearchmode(true);
    setQuery(e.target.value);
    if (e.target.value == "") {
      setSearchmode(false);
      fetchjobs();
    }
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/jobs/search/?search=${query}`
      );
      setJobs(response.data.results);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by job title"
          className="w-full pl-4 pr-10 py-3 border rounded-lg"
          value={query}
          onChange={handleSearch}
        />
        <button
          onClick={() => {
            setSearchmode(false);
            setQuery("");
            fetchjobs();
          }}>
          {mode ? (
            <X className="absolute right-3 top-3 text-blue-600" />
          ) : (
            <Search className="absolute right-3 top-3 text-blue-600" />
          )}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
