import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const fitlerData = [
  {
    filterType: "Location",
    array: ["Delhi", "Mumbai", "Noida", "Bangalore", "Hyderabad"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Data Science"],
  },
  {
    filterType: "Salary",
    array: ["Delhi", "Mumbai", "Noida"],
  },
];

const FilterCards = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    
  }, [selectedValue]);
  return (
    <div className=" ">
      <div className="w-full bg-white p-3 rounded-md ">
        <h1 className="font-bold text-xl">FilterJobs</h1>
        <hr className="mt-3" />

        <div>
          <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {fitlerData.map((data, index) => (
              <div>
                <h1 className="font-bold text-lg">{data.fitlerType}</h1>
                {data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div className="flex items-center space-x-2 my-2">
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  );
                })}
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default FilterCards;
