import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../utils/axios";
import { Link } from "react-router-dom";

const DashboardOverview = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ type: "", industry: "", location: "" });

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await axios.get("/api/business/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBusinesses(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to load businesses", err);
      }
    };
    fetchBusinesses();
  }, [token]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    applyFilters(updated);
  };

  const applyFilters = (updatedFilters) => {
    const filteredData = businesses.filter((biz) => {
      const matchType = updatedFilters.type ? biz.incorporationType === updatedFilters.type : true;
      const matchIndustry = updatedFilters.industry ? biz.industry?.toLowerCase().includes(updatedFilters.industry.toLowerCase()) : true;
      const matchLocation = updatedFilters.location ? biz.location?.toLowerCase().includes(updatedFilters.location.toLowerCase()) : true;
      return matchType && matchIndustry && matchLocation;
    });
    setFiltered(filteredData);
  };

  const handleResetFilters = () => {
    setFilters({ type: "", industry: "", location: "" });
    setFiltered(businesses);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-md">
      <div className="text-4xl font-extrabold text-gray-800 mb-8 tracking-wide">📊 Business Dashboard</div>

      <div className="flex flex-wrap items-end gap-6 bg-white p-5 rounded-lg shadow-md mb-8">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="border px-4 py-2 rounded-md w-full text-sm text-gray-700 focus:ring-2 focus:ring-blue-300 transition"
          >
            <option value="">All Types</option>
            <option value="Private">Private</option>
            <option value="Corporation">Corporation</option>
            <option value="Partnership">Partnership</option>
            <option value="LLC">LLC</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
          <input
            name="industry"
            value={filters.industry}
            onChange={handleFilterChange}
            placeholder="e.g. Tech"
            className="border px-4 py-2 rounded-md w-full text-sm text-gray-700 focus:ring-2 focus:ring-blue-300 transition"
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="e.g. Toronto"
            className="border px-4 py-2 rounded-md w-full text-sm text-gray-700 focus:ring-2 focus:ring-blue-300 transition"
          />
        </div>

        <div
          onClick={handleResetFilters}
          className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-md font-medium hover:bg-red-200 mt-5 cursor-pointer transition"
        >
          Reset Filters
        </div>
      </div>

      {Object.values(filters).some(Boolean) && (
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.type && (
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-xs font-medium shadow-sm">
              Type: {filters.type}
            </span>
          )}
          {filters.industry && (
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-xs font-medium shadow-sm">
              Industry: {filters.industry}
            </span>
          )}
          {filters.location && (
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-xs font-medium shadow-sm">
              Location: {filters.location}
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((biz) => (
          <Link
            to={`/business/${biz._id}`}
            key={biz._id}
            className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{biz.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{biz.incorporationType} | {biz.location} | {biz.industry}</p>
            <p className="text-gray-700 text-sm mb-4">{biz.description}</p>

            {/* Check if products exist and are an array */}
            {Array.isArray(biz.products) && biz.products.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Products & Services:</h3>
                <div className="flex flex-wrap gap-2">
                  {biz.products.slice(0, 5).map((product) => (
                    <span
                      key={product._id}
                      className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full text-xs font-medium shadow-lg hover:bg-gradient-to-l"
                    >
                      {product.name}
                    </span>
                  ))}
                  {biz.products.length > 5 && <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-xs font-medium">...and more</span>}
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
