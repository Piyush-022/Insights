import React, { useState, useRef, useEffect, useContext } from "react";
import { FaFilter } from "react-icons/fa"; // Import filter icon from react-icons
import axios from "axios";
import { UserContext } from "../UserContext";
import { PlacementReviewContext } from "../PlacementReviewContext";

const FilterMenu = () => {
  const [companyName, setCompanyName] = useState(undefined);
  const [minPackage, setMinPackage] = useState(undefined);
  const [maxBondPeriod, setMaxBondPeriod] = useState(undefined);
  const [isVisible, setIsVisible] = useState(false);
  const node = useRef();
  const { userData } = useContext(UserContext);
  const { experiences, setExperiences } = useContext(PlacementReviewContext);
  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  const handleFilter = async () => {
    var url = "/review?";
    if (companyName) url += "company=" + companyName;
    if (minPackage) url += "&minPackage=" + minPackage;
    if (maxBondPeriod) url += "&maxBondPeriod=" + maxBondPeriod;
    try {
      // console.log("try");
      const { data } = await axios.get(url);
      setExperiences(data.reviews);
    } catch (error) {
      alert(error);
    }
  };

  return userData.email === undefined ? (
    <></>
  ) : (
    <div
      className=" relative right-0 top-0 p-4 pb-0 mt-2 w-screen sm:w-1/5"
      ref={node}
    >
      <button
        className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsVisible(!isVisible)}
      >
        <FaFilter className="mr-2" />
        Filter
      </button>
      {isVisible && (
        <div className=" absolute p-4 bg-gray-300 rounded">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="company-name"
            >
              Company Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="company-name"
              type="text"
              value={companyName || ""}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="min-package"
            >
              Min Package (LPA)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="min-package"
              type="number"
              min={0}
              value={minPackage || ""}
              onWheel={(e) => e.target.blur()}
              onChange={(e) => setMinPackage(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="min-bond-period"
            >
              Max Bond Period
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="min-bond-period"
              type="number"
              min={0}
              value={maxBondPeriod || ""}
              onWheel={(e) => e.target.blur()}
              onChange={(e) => setMaxBondPeriod(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => {
              handleFilter();
              setIsVisible(false);
            }}
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
