import React from "react";
import LatesJobsCard from "./LatesJobsCard";
import { useSelector } from "react-redux";
import usegetAllJobs from "../hooks/useGetAllJobs";

const LatestJobs = () => {
  usegetAllJobs()
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="my-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="font-bold text-3xl mb-10">
          <span className="text-[#6A38C2]">Latest And Top</span> Job Openings
        </h1>

        <div>
          {allJobs.length <= 0 ? (
            <span className="text-gray-600">No Jobs Found</span>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {allJobs.slice(0, 6).map((job) => (
                <LatesJobsCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
