"use client";
import NavBar from "@/app/components/navBar";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useEffect } from "react";
import { fetchSavedExercises } from "@/app/store/slices/savedExerciseAcions";
import { useRouter } from "next/navigation";

export default function SavedExercises() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector(
    (state: RootState) => state.authenticate.authenticated
  );

  // SEE IF WE CAN MOVE THIS TO HOME PAGE SO IT CAN RUN TOKEN BEFORE ROUTING TO PAGE OF SAVED EXERCISES
  useEffect(() => {
    if (!token) {
      alert("Please log in to view saved exercises.");
      router.push("/pages/login");
      return;
    }

    dispatch(fetchSavedExercises(token));
  }, [dispatch, token, router]);

  const savedExercises = useSelector(
    (state: RootState) => state.savedExercise.savedExercises
  );

  const handleClick = (id: number) => {
    router.push(`/pages/exercise/${id}`);
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="bg-white dark:bg-black">
      <NavBar />

      <div className="p-4">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="text-left bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black text-2xl shadow-lg rounded-md px-4 mx-4 mt-16 hover:bg-yellow-300 hover:text-white dark:hover:bg-white"
        >
          Back
        </button>

        {/* Title */}
        <h1 className="text-7xl bg-gradient-to-r from-red-400 via-yellow-500 to-red-400 bg-clip-text text-transparent font-extrabold text-center p-6 ">
          Saved Exercises
        </h1>
      </div>

      {/* Handle no exercises */}
      {savedExercises.length === 0 ? (
        <p className="text-black dark:text-white font-extrabold text-4xl text-center">
          No exercises found
        </p>
      ) : null}

      {/* Display mapped exercises */}
      <div>
        {savedExercises?.map((exercise) => {
          return (
            <button
              key={exercise.id}
              onClick={() => {
                handleClick(exercise.id);
              }}
              className="bg-gray-900 hover:bg-gray-800 rounded-lg p-6 m-2"
            >
              <h1 className=" font-extrabold text-5xl text-center tracking-wide text-yellow-400 uppercase">
                {exercise.name}
              </h1>
              <div className="flex flex-col flex-wrap sm:flex-row justify-between m-4 items-center">
                <div className="dark:bg-black bg-gray-200 rounded-lg m-1 px-4 py-2 w-60 sm:w-full">
                  <h1 className="text-yellow-600 text-xl text-center">
                    Muscle:
                  </h1>
                  <p className="dark:text-yellow-400 text-black text-3xl font-bold text-center uppercase">
                    {exercise.target}
                  </p>
                </div>
                <div className="dark:bg-black bg-gray-200 rounded-lg m-1 px-4 py-2 w-60 sm:w-full">
                  <h1 className="text-yellow-600 text-xl text-center">
                    Equipment:
                  </h1>
                  <p className="dark:text-yellow-400 text-black text-3xl font-bold text-center uppercase">
                    {exercise.equipment}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
