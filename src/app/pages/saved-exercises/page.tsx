"use client";
import NavBar from "@/app/components/navBar";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import ExploreExercisesButton from "@/app/components/buttons/exploreExercisesButton";
import WorkoutPlanButton from "@/app/components/buttons/workoutPlanButton";
import { useDispatch } from "react-redux";
import { deleteExercise } from "@/app/store/slices/savedExerciseAcions";

export default function SavedExercises() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const savedExercises = useSelector(
    (state: RootState) => state.savedExercise.savedExercises
  );
  const token = useSelector(
    (state: RootState) => state.authenticate.authenticated
  );

  const handleClick = (id: string) => {
    router.push(`/pages/exercise/${id}`);
  };

  const handleBack = () => {
    router.back();
  };

  const handleDelete = (e: React.MouseEvent, exerciseId: string) => {
    e.stopPropagation(); // Prevents the parent button click event
    dispatch(deleteExercise({ token, exerciseId }));
  };

  return (
    <div className="bg-white dark:bg-black">
      <NavBar />
      <div className="flex justify-evenly">
        <ExploreExercisesButton />
        <WorkoutPlanButton />
      </div>
      <div className="px-4">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="text-left bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black text-2xl shadow-lg rounded-md px-4 mx-4 mt-16 hover:bg-yellow-300 hover:text-white dark:hover:bg-white"
        >
          Back
        </button>

        {/* Title */}
        <h1 className="text-7xl bg-gradient-to-r from-red-400 via-yellow-500 to-red-400 bg-clip-text text-transparent font-extrabold text-center px-6 my-2 ">
          My Saved Exercises
        </h1>
      </div>

      {/* Handle no exercises */}
      {savedExercises.length === 0 ? (
        <p className="text-black dark:text-white font-extrabold text-4xl text-center">
          No exercises found
        </p>
      ) : null}

      {/* Display mapped exercises */}
      <div className="px-4 grid gid-cols-1 xl:grid-cols-3 gap-4">
        {savedExercises?.map((exercise) => {
          return (
            <div
              key={exercise.id}
              onClick={() => {
                handleClick(exercise.id);
              }}
              className="bg-gray-900 hover:bg-gray-800 rounded-lg p-6 m-2"
            >
              {/* NEED TO CHECK DELETE FUNCTIONALITY AND PLACE WARNING WINDOW */}
              <button
                onClick={(e) => handleDelete(e, exercise.id)}
                className="bg-red-500 text-2xl shadow-md hover:bg-red-400 px-2 py-1 rounded-full"
              >
                ❌
              </button>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
