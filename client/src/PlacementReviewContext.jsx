import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
export const PlacementReviewContext = createContext({});
export const PlacementReviewContextProvider = ({ children }) => {
  const { userData, setProfileLoading } = useContext(UserContext);
  const [experiences, setExperiences] = useState(null);
  async function fetchExperience() {
    try {
      setProfileLoading(true);
      const { data } = await axios.get("/review");
      setExperiences(data.reviews);
      // console.log(data.reviews);
    } catch (error) {
      console.log(error?.response?.data?.error);
    } finally {
      setProfileLoading(false);
    }
  }
  useEffect(() => {
    fetchExperience();
  }, [userData]);
  return (
    <PlacementReviewContext.Provider value={{ experiences, setExperiences }}>
      {children}
    </PlacementReviewContext.Provider>
  );
};
