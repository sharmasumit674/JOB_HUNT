import React from "react";
import Navbar from "./shared/Navbar";
import FilterCards from "./FilterCards";
import Job from "./Job";
import { useSelector } from "react-redux";
import usegetAllJobs from "../hooks/useGetAllJobs";

const Jobs = () => {
  usegetAllJobs();

  const { allJobs } = useSelector(store => store.job);
  console.log(allJobs);

  return (
    <div>
      <Navbar />

      <div className="mx-auto max-w-7xl mt-5 px-4">
        {/* Layout: fixed left sidebar + right content */}
        <div className="grid grid-cols-[220px_1fr] gap-6">
          
          {/* Filter Sidebar */}
          <div>
            <FilterCards />
          </div>

          {/* Jobs Section */}
          <div>
            {allJobs.length <= 0 ? (
              <h1 className="text-lg font-semibold">No Jobs Found</h1>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
                {allJobs.map(job => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Jobs;
