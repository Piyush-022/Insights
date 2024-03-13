import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
export const ExperienceAdd = () => {
  const navigate = useNavigate();
  const { userData, profileLoading } = useContext(UserContext);

  useEffect(() => {
    if (!profileLoading && userData.email === undefined) {
      alert("Please login first");
      navigate("/auth");
    }
    if (
      !profileLoading &&
      userData.email !== undefined &&
      ((userData.email[0].toLowerCase() === "d" &&
        parseInt(userData.email.slice(1, 3)) > 21) ||
        (userData.email[0].toLowerCase() !== "d" &&
          parseInt(userData.email.slice(0, 2)) > 20))
    ) {
      alert("only student of batch 2020 or before can add experience");
      navigate("/");
    }
  }, [profileLoading]);
  // Declare state variables for each field
  const [companyName, setCompanyName] = useState("");
  const [Package, setPackage] = useState();
  const [stipend, setStipend] = useState();
  const [bondPeriod, setBondPeriod] = useState();
  const [wasSelected, setSelected] = useState(false);
  const [rounds, setRounds] = useState([{ name: "", details: "" }]);

  // Handle input change for each field
  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handlePackageChange = (e) => {
    setPackage(e.target.value);
  };

  const handleStipendChange = (e) => {
    setStipend(e.target.value);
  };

  const handleBondPeriodChange = (e) => {
    setBondPeriod(e.target.value);
  };

  const handleSelectedChange = (e) => {
    setSelected(e.target.checked);
  };

  const handleRoundChange = (e, index, field) => {
    const newRounds = [...rounds];
    newRounds[index][field] = e.target.value;
    setRounds(newRounds);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log("submitting");
    // Prevent default browser behavior
    e.preventDefault();
    // Do something with the form data, such as sending to an API
    try {
      await axios.post("/review", {
        company: companyName,
        bond: bondPeriod,
        stipend: stipend,
        Package: Package,
        selected: wasSelected,
        rounds: rounds,
      });
      alert("successfully added experience");
    } catch (error) {
      alert(error.response.data.error);
    } finally {
      navigate("/");
    }
  };
  if (profileLoading)
    return <div className=" mt-3 ml-2 font-medium">Loading.....</div>;
  // Render the form
  return (
    !profileLoading &&
    userData.email !== undefined && (
      <div className="flex flex-wrap justify-center">
        <form onSubmit={handleSubmit} className="p-6 space-y-8 w-2/3">
          <h1 className="text-2xl font-bold mb-2">Interview Experience</h1>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="companyName"
                className="block text-lg font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                required
                value={companyName}
                onChange={handleCompanyNameChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="Package"
                className="block text-lg font-medium text-gray-700"
              >
                Package<span className="text-sm ml-2">(LPA)</span>
              </label>
              <input
                type="number"
                id="Package"
                required
                value={Package}
                onChange={handlePackageChange}
                onWheel={(e) => e.target.blur()}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="stipend"
                className="block text-lg font-medium text-gray-700"
              >
                Stipend<span className="text-sm ml-2">(eg. 25,000/month)</span>
              </label>
              <input
                type="number"
                id="stipend"
                required
                value={stipend}
                onChange={handleStipendChange}
                onWheel={(e) => e.target.blur()}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="bondPeriod"
                className="block text-lg font-medium text-gray-700"
              >
                Bond Period<span className="text-sm ml-2">(eg. 1.5 year)</span>
              </label>
              <input
                type="number"
                id="bondPeriod"
                required
                value={bondPeriod}
                onChange={handleBondPeriodChange}
                onWheel={(e) => e.target.blur()}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex align-middle">
              <label
                htmlFor="selected"
                className=" float-left text-lg font-medium text-gray-700"
              >
                Got placed ?
              </label>
              <span className=" ml-3 h-full p-1">
                <input
                  type="checkbox"
                  id="selected"
                  checked={wasSelected}
                  onChange={handleSelectedChange}
                  className="pt-5 block h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </span>
            </div>
            <div>
              <label
                htmlFor="rounds"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Interview rounds
              </label>
              <div id="rounds" className="space-y-2">
                {rounds.map((round, index) => (
                  <div
                    key={index}
                    className="space-y-4 bg-slate-100 p-4 rounded-md"
                  >
                    <label className=" font-semibold">Round {index + 1}</label>
                    <input
                      type="text"
                      value={round.name}
                      required
                      onChange={(e) => handleRoundChange(e, index, "name")}
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Name"
                    />
                    <textarea
                      value={round.details}
                      required
                      onChange={(e) => handleRoundChange(e, index, "details")}
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Discription"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setRounds([...rounds, { name: "", details: "" }])
                  }
                  className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add a round
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full mt-0">
            <input
              type="submit"
              value="Submit"
              className="mt-3 px-2 sm:px-4 py-1 sm:py-2 w-4/5 sm:w-1/5 h-10 border border-transparent text-md  font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      </div>
    )
  );
};
