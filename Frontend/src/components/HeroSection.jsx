import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 py-10">
      <div className="my-10 flex flex-col gap-6 justify-center items-center">
        {/* badge */}
        <span className="px-4 py-1 font-medium rounded-full bg-gray-100 text-red-600 text-sm">
          No.1 Job Website
        </span>

        {/* heading */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        {/* description */}
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur, antium voluptatibus molestiae
          incidunt soluta at inventore ea asperiores, distinctio, is velit eum,
          ipsum provident ducimus.
        </p>

        {/* search input */}
        <div className="flex w-full md:w-[40%] shadow-lg border border-gray-200 gap-2 h-14 pl-3 rounded-full items-center mx-auto mt-6">
          <input
            type="text"
            placeholder="Enter your Dream Job"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-base"
          />
          <Button
            onClick={clickHandler}
            className="rounded-r-full bg-[#6A38C2] h-full px-4"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
