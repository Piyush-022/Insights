import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { PlacementReviewContext } from "../PlacementReviewContext";

const RoundDetails = ({ roundNo, round }) => {
  // Split the details string into an array of strings at each newline
  const paragraphs = round.details.split("\n");

  return (
    <>
      <p className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
        Round {roundNo + 1}
      </p>
      <div className="p-4 bg-gray-100 rounded-md mb-4">
        <h2 className="text-lg text-gray-800 mb-1 font-medium">{round.name}</h2>
        {paragraphs.map((paragraph, index) => (
          <div key={index}>
            <p className="text-gray-600 mb-2">{paragraph}</p>
            {/* <br></br> */}
          </div>
        ))}
      </div>
    </>
  );
};

const ExperienceRead = () => {
  const { id } = useParams();
  const { userData, profileLoading } = useContext(UserContext);
  const { experiences } = useContext(PlacementReviewContext);
  if (profileLoading)
    return <div className=" mt-3 ml-2 font-medium">Loading.....</div>;
  if (userData.email === undefined)
    return (
      <div className=" mt-3 ml-2 font-medium">Please Login to see review</div>
    );
  const experience = experiences?.find((exp) => exp._id === id);
  if (!experience)
    return <div className=" mt-3 ml-2 font-medium">No review found</div>;
  return (
    <div className="flex flex-col items-center">
      <div className="p-4 w-full md:w-1/2 sm:ml-3 ">
        <h1 className=" text-2xl font-medium mb-3">Interview experience</h1>
        <div className="h-full bg-gray-100 p-2 sm:p-8 rounded">
          <div className="bg-gray-200 px-3 py-2 rounded mb-4">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
              Company
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-700 mb-1">
              {experience.company}
            </h1>
          </div>
          <div className="bg-gray-200 px-3 py-2 rounded mb-4">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
              Package
            </h2>
            <p className="leading-relaxed mb-1 font-medium">
              {experience.package} LPA
            </p>
          </div>
          <div className="bg-gray-200 px-3 py-2 rounded mb-4">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
              Stipend
            </h2>
            <p className="leading-relaxed mb-1 font-medium">
              {experience.stipend} /month
            </p>
          </div>
          <div className="bg-gray-200 px-3 py-2 rounded mb-4">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
              Bond
            </h2>
            <p className="leading-relaxed mb-1 font-medium">
              {experience.bond} year
            </p>
          </div>
          <div className="bg-gray-200 px-3 py-2 rounded mb-4">
            {/* <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-3">
            Rounds
          </h2> */}
            {experience.rounds.map((round, index) => (
              <RoundDetails key={index} round={round} roundNo={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceRead;
