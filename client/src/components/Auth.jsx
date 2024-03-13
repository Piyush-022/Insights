import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [tab, setTab] = useState("Login");
  const [errormsg, setErrormsg] = useState("");

  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  // console.log(userData.email);
  useEffect(() => {
    if (userData.email) {
      alert("you are already logged in");
      navigate("/");
    }
  }, [userData]);
  async function SubmitHandeler() {
    setErrormsg("");
    const url = tab === "Register" ? "/auth/register" : "/auth/login";
    try {
      const { data, status } = await axios.post(url, {
        email,
        password,
        company,
      });
      if (status === 200 && data.verified === true) {
        setUserData({
          email: data.email,
          verified: data.verified,
          id: data.id,
        });
        navigate("/");
      } else if (status === 200 && data.verified === false) {
        alert("verification mail has been sent to your email, please verify");
      }
    } catch (error) {
      console.log(error.response.data.error);
      setErrormsg(error.response.data.error);
    }
  }
  function changeTab() {
    if (tab === "Register") setTab("Login");
    else setTab("Register");
  }
  return (
    <section className="flex flex-col items-center justify-center sm:h-screen mx-5 my-2 space-y-10 md:flex-row md:space-y-0 md:space-x-16 md:mx-0 md:my-0">
      <div className="max-w-sm md:w-1/3">
        <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" />
      </div>
      <div className="max-w-sm md:w-1/3">
        <div className="text-center md:text-left mb-5">
          <label className="mr-1 text-xl font-bold">
            {tab === "Register" ? "Register" : "Login"}
          </label>
        </div>

        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 border-solid rounded"
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full px-4 py-2 mt-3 text-sm border border-gray-300 border-solid rounded"
          type="password"
          placeholder="Password"
        />
        {tab === "Register" && (
          <input
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
            className="w-full px-4 py-2 mt-3 text-sm border border-gray-300 border-solid rounded"
            type="text"
            placeholder="Current Company"
          />
        )}
        {errormsg !== "" && (
          <div className=" text-red-500 font-bold mt-1">{errormsg}</div>
        )}
        <div className="flex justify-between mt-4 text-sm font-semibold">
          {/* <label className="flex cursor-pointer text-slate-500 hover:text-slate-600">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label> */}
          {/* <a
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            href="#"
          >
            Forgot Password?
          </a> */}
        </div>
        <div className="text-center md:text-left">
          <button
            onClick={() => {
              SubmitHandeler();
            }}
            className="px-4 py-2 mt-4 text-xs tracking-wider text-white uppercase bg-blue-600 rounded hover:bg-blue-700"
            type="submit"
          >
            {tab === "Login" ? "Login" : "Register"}
          </button>
        </div>
        <div className="mt-4 text-sm font-semibold text-center text-slate-500 md:text-left">
          {tab === "Login"
            ? `Don't have an account?`
            : "Already have an account?"}{" "}
          <a
            className="text-red-600 cursor-pointer hover:underline hover:underline-offset-4"
            onClick={() => {
              changeTab();
            }}
          >
            {tab === "Login" ? "Register" : "Login"}
          </a>
        </div>
      </div>
    </section>
  );
};
