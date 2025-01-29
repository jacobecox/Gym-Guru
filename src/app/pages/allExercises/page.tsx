"use client";
import DarkModeToggle from "@/app/components/darkModeToggle";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import LoadingSpinner from "@/app/components/loadingSpinner";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchExercises } from "@/app/store/slices/allExercise";
import { Exercise } from "@/app/types";

export default function AllExercises() {
  const dispatch = useDispatch<AppDispatch>();
  const { exercises, loading } = useSelector(
    (state: RootState) => state.exercises
  );
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  const handleBack = () => {
    router.push("/");
  };

  if (loading === true) {
    return <LoadingSpinner />;
  }

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
      </div>
      <div className=" p-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {exercises[0]?.map((exercise: Exercise) => {
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
    </div>
  );
}
