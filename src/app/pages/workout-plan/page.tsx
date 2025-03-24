"use client";
import NavBar from "@/app/components/navBar";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import ExploreExercisesButton from "@/app/components/buttons/exploreExercisesButton";
import SavedExercisesButton from "@/app/components/buttons/savedExercisesButton";
import { useState, useEffect } from "react";
import {
  fetchWorkoutDays,
  removeWorkoutDay,
  addWorkoutDay,
} from "@/app/store/slices/workoutSlice";
import { removeExerciseFromDay } from "@/app/store/slices/workoutSlice";

export default function WorkoutPlan() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const workoutPlan = useSelector(
    (state: RootState) => state.workout.workoutPlan
  );
  const token = useSelector(
    (state: RootState) => state.authenticate.authenticated
  );

  const [newDay, setNewDay] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    dispatch(fetchWorkoutDays(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (workoutPlan.length > 0) {
      setSelectedDay(workoutPlan[0].day);
    }
  }, [workoutPlan]);

  const handleClick = (id: string) => {
    router.push(`/pages/exercise/${id}`);
  };

  const handleBack = () => {
    router.back();
  };

  const handleAddWorkoutDay = () => {
    if (newDay.trim()) {
      dispatch(addWorkoutDay({ token, day: newDay }));
      setNewDay("");
    }
  };

  const handleDelete = (e: React.MouseEvent, exerciseId: string) => {
    e.stopPropagation();
    dispatch(removeExerciseFromDay({ token, day: selectedDay, exerciseId }));
  };

  const handleDeleteDay = () => {
    setShowDeletePopup(true);
  };

  const confirmDeleteDay = async () => {
    await dispatch(removeWorkoutDay({ token, day: selectedDay }));

    setShowDeletePopup(false);

    // Wait a bit before refetching to ensure Redux updates UI
    setTimeout(() => {
      dispatch(fetchWorkoutDays(token));
    }, 500); // Small delay to let Redux state update
  };

  const cancelDeleteDay = () => {
    setShowDeletePopup(false);
  };

  const selectedWorkoutDay = workoutPlan.find((day) => day.day === selectedDay);

  return (
    <div className="bg-white dark:bg-black">
      <NavBar />
      <div className="flex justify-evenly">
        <ExploreExercisesButton />
        <SavedExercisesButton />
      </div>
      <div className="px-4">
        <button
          onClick={handleBack}
          className="text-left bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black text-2xl shadow-lg rounded-md px-4 mx-4 mt-16 hover:bg-yellow-300 hover:text-white dark:hover:bg-white"
        >
          Back
        </button>

        <h1 className="text-7xl bg-gradient-to-r from-red-400 via-yellow-500 to-red-400 bg-clip-text text-transparent font-extrabold text-center px-6 my-2 ">
          My Workout Plan
        </h1>
      </div>

      {workoutPlan.length === 0 ? (
        <div className="flex items-center justify-center">
          <div className="mb-6 flex flex-col gap-4 lg:w-1/4 w-3/4">
            <p className="text-black dark:text-white font-extrabold text-4xl text-center mt-8">
              No workout plan found. Start by adding workout days!
            </p>
            <input
              type="text"
              placeholder="Enter workout day (e.g., 'Day 1 - Upper Body')"
              value={newDay}
              onChange={(e) => setNewDay(e.target.value)}
              className="bg-gray-900 border-4 border-yellow-400 text-white p-2"
            />
            <button
              onClick={handleAddWorkoutDay}
              className="w-full bg-yellow-400 text-black text-xl font-bold py-2 rounded-lg hover:bg-yellow-300 transition"
            >
              ➕ Add Workout Day
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-4 mt-6">
            {workoutPlan.map((day, index) => (
              <button
                key={`${day.day}-${index}`}
                onClick={() => setSelectedDay(day.day)}
                className={`px-4 py-2 text-xl font-bold rounded-lg shadow-md transition-all ${
                  selectedDay === day.day
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-400 dark:bg-gray-700 text-gray-800 hover:dark:bg-gray-600 hover:bg-gray-300 dark:text-white"
                } `}
              >
                {day.day}
              </button>
            ))}
          </div>
          <div className="flex flex-col justify-center items-center">
            <button
              onClick={handleDeleteDay}
              className="bg-red-600 text-white px-4 py-2 m-4 rounded-lg shadow-md hover:bg-red-500"
            >
              Delete Day
            </button>
            {/* Add New Workout Day */}
            <div className="mb-6 flex flex-col gap-4 lg:w-1/4 w-3/4">
              <input
                type="text"
                placeholder="Enter workout day (e.g., 'Day 1 - Upper Body')"
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
                className="bg-gray-900 border-4 border-yellow-400 text-white p-2"
              />
              <button
                onClick={handleAddWorkoutDay}
                className="w-full bg-yellow-400 text-black text-xl font-bold py-2 rounded-lg hover:bg-yellow-300 transition"
              >
                ➕ Add Workout Day
              </button>
            </div>
          </div>

          {selectedWorkoutDay &&
          selectedWorkoutDay.exercises &&
          selectedWorkoutDay.exercises.length > 0 ? (
            <div className="px-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
              {selectedWorkoutDay.exercises.map((exercise, index) => (
                <div
                  key={`${exercise.id}-${index}`}
                  onClick={() => handleClick(exercise.id)}
                  className="bg-gray-900 hover:bg-gray-800 rounded-lg p-6 m-2"
                >
                  <button
                    onClick={(e) => handleDelete(e, exercise.id)}
                    className="bg-red-500 text-2xl shadow-md hover:bg-red-400 px-2 py-1 rounded-full"
                  >
                    ❌
                  </button>
                  <h1 className="font-extrabold text-5xl text-center tracking-wide text-yellow-400 uppercase">
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
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center mt-8  mb-10">
              <div className="flex flex-col justify-center  w-1/2">
                <p className="text-black dark:text-white font-extrabold text-3xl text-center w-full">
                  No exercises found for {selectedDay}. Add some exercises to
                  this day!
                </p>
                <ExploreExercisesButton />
              </div>
            </div>
          )}
        </>
      )}

      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
              Confirm Delete
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this workout day?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={confirmDeleteDay}
                className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500"
              >
                Delete
              </button>
              <button
                onClick={cancelDeleteDay}
                className="bg-gray-400 text-black dark:text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
