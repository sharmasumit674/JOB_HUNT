import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative my-16 px-4">
      <Carousel className="w-full max-w-2xl mx-auto relative">
        <CarouselContent>
          {category.map((cat, i) => (
            <CarouselItem
              key={i}
              className="basis-full sm:basis-1/2 md:basis-1/3 flex justify-center"
            >
              <Button
                onClick={() => {
                  clickHandler(cat);
                }}
                variant="outline"
                className="rounded-full text-sm md:text-base"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* positioning arrows */}
        <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
};

export default Category;
