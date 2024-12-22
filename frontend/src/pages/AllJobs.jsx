import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Building,
  Clock,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";
import SearchBar from "../components/SearchBar";
// import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [searchmode, setSearchmode] = useState(false);
  const [page, setPage] = useState(1);
  const [count, SetCount] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const scrapeJobs = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/jobs/scrape/"
      );
      console.log("Job scraping initiated:", response.data);
      window.location.reload();
      // alert("Job scraping initiated successfully!");
    } catch (error) {
      console.error("Error initiating job scraping:", error);
      alert("Failed to initiate job scraping. Please try again.");
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/jobs/?page=${page}`
      );
      setJobs(response.data.results);
      setNextPage(response.data.next_page);
      SetCount(response.data.num_pages);
      setPreviousPage(response.data.previous_page);
      console.log(response.data.results);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 font-poppins">
      <Navbar />
      <h1 className="flex justify-center text-5xl font-bold text-gray-800">
        JOB SEARCH!
      </h1>
      <SearchBar
        setJobs={setJobs}
        setSearchmode={setSearchmode}
        mode={searchmode}
        fetchjobs={fetchJobs}
      />
      {!searchmode && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={!previousPage}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition">
              <ArrowLeft size={20} />
            </button>
            <span className="text-gray-600 font-medium">
              Page {page}/{count}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={!nextPage}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg p-6 flex items-center justify-between hover:shadow-lg border border-gray-200 transition-shadow">
              <div className="flex items-center space-x-4">
                <img
                  src={
                    job.company_logo_url
                      ? job.company_logo_url
                      : "http://127.0.0.1:8000" + job.company_logo_image
                  }
                  alt={job.company_name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-gray-600">{job.company_name}</p>
                  <div className="flex items-center space-x-3 mt-2 text-sm text-gray-600">
                    {job.is_remote && (
                      <span className="flex items-center">
                        <Building size={16} className="mr-1" />
                        Remote
                      </span>
                    )}
                    <span className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {job.employment_type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {job.salary && (
                  <span className="text-gray-900 font-medium">
                    {job.salary}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="text-center text-gray-500">No jobs found</p>

            <button
              className="inline-flex justify-center items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 mt-3"
              onClick={() => scrapeJobs()}>
              <span className="text-sm font-medium"> Scrape Jobs </span>

              <svg
                className="size-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBoard;
