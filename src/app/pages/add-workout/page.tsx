"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import LoadingSpinner from "@/app/components/loadingSpinner";
import {
  fetchWorkoutDays,
  addWorkoutDay,
  addExerciseToDay,
  resetError,
} from "@/app/store/slices/workoutSlice";
import NavBar from "@/app/components/navBar";
import { useRouter } from "next/navigation";

export default function WorkoutPlan() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const token = useSelector(
    (state: RootState) => state.authenticate.authenticated
  );
  const { workoutPlan, loading, error } = useSelector(
    (state: RootState) => state.workout
  );
  const exerciseDetail = useSelector(
    (state: RootState) => state.exerciseDetail.exerciseDetail
  );

  const handleBack = () => {
    router.back();
  };

  const [newDay, setNewDay] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [exerciseError, setExerciseError] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(fetchWorkoutDays(token));
    }
  }, [dispatch, token]);

  const handleAddWorkoutDay = () => {
    if (newDay.trim()) {
      dispatch(addWorkoutDay({ token, day: newDay }));
      setNewDay("");
    }
  };

  const handleAddExercise = () => {
    if (!selectedDay) {
      setExerciseError("Please select a workout day to add the exercise");
      return;
    }
    setExerciseError("");
    if (exerciseDetail) {
      dispatch(
        addExerciseToDay({
          token,
          day: selectedDay,
          exerciseDetail,
        })
      );
      router.push("/pages/success-page");
    }
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <NavBar />

      {/* Back button */}
      <button
        onClick={handleBack}
        className="text-left bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black text-2xl shadow-lg rounded-md px-4 mx-6 mt-16 hover:bg-yellow-300 hover:text-white dark:hover:bg-white"
      >
        Back
      </button>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-7xl bg-gradient-to-r from-red-400 via-yellow-500 to-red-400 bg-clip-text text-transparent font-extrabold text-center my-6">
          Workout Plan
        </h1>

        {loading && <LoadingSpinner />}
        {error && (
          <div className="flex justify-center items-center">
            <p className="text-red-500 text-center">{error} </p>
            <button
              onClick={() => dispatch(resetError())}
              className="px-2 text-white font-bold text-center"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Add New Workout Day */}
        <div className="mb-6 flex flex-col gap-4">
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

        {/* Select Workout Day and Add Exercise */}
        <div className="mb-6 pt-10 flex flex-col gap-4">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="dark:bg-gray-300 bg-yellow-400 text-black rounded-lg p-2 text-2xl"
          >
            <option value="">Select a workout day</option>
            {workoutPlan.map((day) => (
              <option key={day.day} value={day.day}>
                {day.day}
              </option>
            ))}
          </select>
          {exerciseError && (
            <p className="text-red-500 text-center">{exerciseError}</p>
          )}
          <button
            onClick={handleAddExercise}
            className="w-full bg-green-500 text-white text-xl font-bold py-2 rounded-lg hover:bg-green-400 transition"
          >
            ➕ Add Selected Exercise
          </button>
        </div>
      </div>
    </div>
  );
}
