import React, { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      setUserData({});
      alert("successfully Logged out");
      navigate("/");
    } catch (error) {
      navigate("/");
    }
  };
  useEffect(() => {
    logout();
  }, []);
  return <div className=" mt-3 ml-2 font-medium">Logging Out......</div>;
};

export default Logout;
