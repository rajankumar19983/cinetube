import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import ContentWrapper from "./ContentWrapper";
import Img from "./LazyLoadImage";
import { UserAuth } from "../context/AuthContext";

const SignUp = () => {
  const { user, SignUp } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bg, setBg] = useState("");

  const navigate = useNavigate();

  const { url } = useSelector((store) => store.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bgURL =
      url?.backdrop +
      data?.results?.[Math.floor(Math.random() * data?.results?.length)]
        ?.backdrop_path;
    setBg(bgURL);
  }, [data]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await SignUp(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-[450px] md:h-[700px] bg-black_1 flex items-center relative">
      {!loading && bg && (
        <div className="w-full h-full absolute top-0 left-0 opacity-30 overflow-hidden">
          <Img
            className={"w-full h-full object-cover object-center"}
            src={bg}
          />
        </div>
      )}
      <ContentWrapper>
        <div className="fixed w-full top-0 left-0 py-24 z-50">
          <div className="max-w-[450px] h-fit mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <form
                onSubmit={handleSignUp}
                className="w-full flex flex-col py-2"
              >
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-app-theme py-3 my-6 rounded font-bold">
                  Sign Up
                </button>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p>
                    <input
                      type="checkbox"
                      className="mr-2"
                    />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600">
                    Already subscribed to Cinetube?
                  </span>{" "}
                  <Link to="/signin">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default SignUp;
