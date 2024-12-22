import React from "react";
import {
  Search,
  MapPin,
  Building,
  Briefcase,
  Clock,
  ChevronDown,
  Star,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar() {
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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <nav className="flex items-center">
          <Link className="text-gray-700" to={"/"}>
            No Jobs Found ?{" "}
            <button
              onClick={() => scrapeJobs()}
              className="text-blue-500 underline">
              Scrape Jobs.
            </button>
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link className="flex items-center text-blue-600" to={"/post-job"}>
            <Plus size={20} className="mr-1" />
            Post a job
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
