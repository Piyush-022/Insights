import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    alert("No route found, Go to Home");
    navigate("/");
  }, []);
  return <div className=" mt-3 ml-2 font-medium">No route found </div>;
};

export default NotFound;
