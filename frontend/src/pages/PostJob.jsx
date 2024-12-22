import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building,
  MapPin,
  Briefcase,
  DollarSign,
  Link,
  Image,
  ArrowLeft,
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const SaveJobForm = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    job_id: uuidv4(),
    title: "",
    location: "",
    company_name: "",
    company_page_url: "",
    company_logo_image: null,
    employment_type: "",
    salary: "",
    summary: "",
    details_page_url: "",
    is_remote: false,
    easy_apply: false,
    posted_date: new Date().toISOString(),
    modified_date: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setJobData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setJobData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(jobData).forEach(([key, value]) => {
      if (key === "company_logo_image") {
        if (value) {
          formData.append(key, value, value.name);
        }
      } else if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/jobs/create/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Success:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error saving job:", error.response?.data || error.message);
      alert("Error saving job. Please check the console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <RouterLink
            to={"/"}
            className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} className="mr-2" />
            Back to Jobs
          </RouterLink>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold mb-6">Add New Job Posting</h2>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Basic Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={jobData.title}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company_name"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="company_name"
                      name="company_name"
                      value={jobData.company_name}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={jobData.location}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Additional Details
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="employment_type"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Employment Type
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase size={18} className="text-gray-400" />
                    </div>
                    <select
                      id="employment_type"
                      name="employment_type"
                      value={jobData.employment_type}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required>
                      <option value="">Select type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Temporary">Temporary</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="salary"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Salary Range
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="salary"
                      name="salary"
                      value={jobData.salary}
                      onChange={handleChange}
                      placeholder="e.g. $50,000 - $70,000"
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="company_page_url"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Company Website
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Link size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="company_page_url"
                      name="company_page_url"
                      value={jobData.company_page_url}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company_logo_image"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Company Logo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="file"
                      id="company_logo_image"
                      name="company_logo_image"
                      onChange={handleChange}
                      accept="image/*"
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="summary"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Job Summary
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={jobData.summary}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Options
              </h3>

              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="is_remote"
                    name="is_remote"
                    checked={jobData.is_remote}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Remote Position</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="easy_apply"
                    name="easy_apply"
                    checked={jobData.easy_apply}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Easy Apply</span>
                </label>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Publish Job Posting
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SaveJobForm;
