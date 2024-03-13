import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import FilterMenu from "./FilterMenu";
import { PlacementReviewContext } from "../PlacementReviewContext";
const InterviewExperience = ({ experience }) => {
  return (
    <div className="p-4 w-full md:w-1/3 ">
      <div className="h-full bg-gray-100 p-8 rounded">
        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
          Company
        </h2>
        <h1 className="title-font text-lg font-medium text-gray-500 mb-3">
          {experience.company}
        </h1>
        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
          Package
        </h2>
        <p className="leading-relaxed mb-3 font-medium">
          {experience.package} <span className=" text-sm">LPA</span>
        </p>
        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
          Stipend
        </h2>
        <p className="leading-relaxed mb-3 font-medium">
          {experience.stipend} / month
        </p>
        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
          Bond period
        </h2>
        <p className="leading-relaxed mb-3 font-medium">
          {experience.bond} year
        </p>
        <div className="flex items-center flex-wrap ">
          <Link
            to={`/placement-review/read/${experience._id}`}
            className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
          >
            Interview experiance
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Reviews = () => {
  const { profileLoading } = useContext(UserContext);
  const { experiences } = useContext(PlacementReviewContext);
  if (profileLoading)
    return <div className=" mt-3 ml-2 font-medium">Loading.....</div>;
  return experiences !== null ? (
    <div>
      <FilterMenu></FilterMenu>
      <section className="text-gray-600 body-font sm:px-5">
        <div className="container px-5 py-10 mx-auto mt-0 pt-5">
          <div className="flex flex-wrap -m-4">
            {experiences.map((experience) => (
              <InterviewExperience
                key={experience._id}
                experience={experience}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  ) : (
    <div className=" mt-3 ml-2 font-medium">
      Please login to read/add interview experiences
    </div>
  );
};

export default Reviews;
