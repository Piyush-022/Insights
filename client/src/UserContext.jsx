import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState({});
  // const [experiences, setExperiences] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  // async function fetchExperience() {
  //   try {
  //     const { data } = await axios.get("/review");
  //     setExperiences(data.reviews);
  //     // console.log(data.reviews);
  //   } catch (error) {
  //     console.log(error?.response?.data?.error);
  //   }
  // }
  // useEffect(() => {
  //   fetchExperience();
  // }, [userData]);
  async function getUser() {
    try {
      // setProfileLoading(true);
      const res = await axios.get("/auth/profile");
      setUserData(res.data);
      setProfileLoading(false);
    } catch (error) {
      setProfileLoading(false);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        // experiences,
        // setExperiences,
        setProfileLoading,
        profileLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
