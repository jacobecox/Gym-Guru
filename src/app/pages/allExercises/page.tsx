/* eslint-disable @next/next/no-img-element */
"use client";
import DarkModeToggle from "@/app/components/darkModeToggle";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import LoadingSpinner from "@/app/components/loadingSpinner";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchExercises, loadMore } from "@/app/store/slices/allExercise";
import { Exercise } from "@/app/types";

export default function AllExercises() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { pages, currentOffset, loading } = useSelector(
    (state: RootState) => state.exercises
  );
  const muscleCategories = useSelector(
    (state: RootState) => state.categories.muscleCategories
  );

  const equipmentCategories = useSelector(
    (state: RootState) => state.categories.equipmentCategories
  );

  useEffect(() => {
    if (!pages[currentOffset])
      dispatch(fetchExercises({ offset: currentOffset }));
  }, [dispatch, currentOffset, pages]);

  const exercises = Object.values(pages).flat();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="bg-white dark:bg-black">
      <DarkModeToggle />
      <div className="p-4">
        <button
          onClick={handleBack}
          className="text-left bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black text-2xl shadow-lg rounded-md px-4 hover:bg-yellow-300 hover:text-white dark:hover:bg-white"
        >
          Back
        </button>

        <h1 className="text-7xl text-black dark:text-white font-extrabold text-center p-6 ">
          Explore Exercises
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          {/* Filter Muscle dropdown */}
          <select className="w-full md:w-1/2 p-2 border rounded-lg text-black bg-yellow-400 font-bold text-center text-2xl">
            <option value="" disabled hidden>
              Filter by Muscle
            </option>
            {muscleCategories.map((muscleCategory) => {
              return (
                <option key={muscleCategory.name} value={muscleCategory.name}>
                  {" "}
                  {muscleCategory.name.toUpperCase()}
                </option>
              );
            })}
          </select>

          <div className="text-center text-white text-2xl">
            {equipmentCategories?.map((equipmentCategory) => {
              return (
                <div key={equipmentCategory.name}>
                  <button>{equipmentCategory.name}</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className=" p-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {exercises?.map((exercise: Exercise) => {
          return (
            <div
              key={exercise.id}
              className=" bg-yellow-400 rounded-lg p-4 m-2"
            >
              <h1 className="text-black font-bold text-4xl text-center">
                {exercise.name}
              </h1>
              <div className="flex justify-between m-4">
                <h1 className="text-black text-2xl">
                  Muscle: {exercise.target}
                </h1>
                <h1 className="text-black text-2xl">
                  Equipment: {exercise.equipment}
                </h1>
              </div>
              <div className="flex justify-center">
                <img
                  src={exercise.gifUrl}
                  alt="Exercise Gif"
                  className="rounded-lg"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col justify-center items-center">
        {loading === true ? <LoadingSpinner /> : null}
        <button
          onClick={() => dispatch(loadMore())}
          className="text-black bg-yellow-400 rounded-lg p-6 my-8 text-xl font-bold"
        >
          Load More
        </button>
      </div>
    </div>
  );
}
