"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import {
  fetchWorkoutDays,
  addWorkoutDay,
  addExerciseToDay,
  removeExerciseFromDay,
  resetError,
} from "@/app/store/slices/workoutSlice";
import { Exercise } from "@/app/types";
import NavBar from "@/app/components/navBar";

// TODO
// Change inputs to not include exercise name, target, equipment. We want to save exerciseDetail when saved to day
// Move select workout day to the top above adding new workout day
// Remove mapped workout days since we are using a drop down
// Check routes to make sure they are working
// Match styling to login route

const WorkoutPlan = ({ token }: { token: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { workoutPlan, loading, error } = useSelector(
    (state: RootState) => state.workout
  );
  const [newDay, setNewDay] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [exercise, setExercise] = useState<Exercise>({
    id: "",
    name: "",
    equipment: "",
    target: "",
    gifUrl: "",
    instructions: [],
  });

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
    if (selectedDay && exercise.name.trim()) {
      dispatch(
        addExerciseToDay({ token, day: selectedDay, exerciseDetail: exercise })
      );
      setExercise({
        id: "",
        name: "",
        equipment: "",
        target: "",
        gifUrl: "",
        instructions: [],
      });
    }
  };

  const handleRemoveExercise = (day: string, exerciseId: string) => {
    dispatch(removeExerciseFromDay({ token, day, exerciseId }));
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <NavBar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-7xl bg-gradient-to-r from-red-400 via-yellow-500 to-red-400 bg-clip-text text-transparent font-extrabold text-center my-6">
          Workout Plan
        </h1>

        {loading && <p className="text-center text-xl">Loading...</p>}
        {error && (
          <div className="flex justify-center items-center">
            <p className="text-red-500 text-center">{error} </p>
            <button
              onClick={() => dispatch(resetError())}
              className=" px-2 text-white font-bold text-center"
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
            className="border p-3 rounded-lg w-full text-xl"
          />
          <button
            onClick={handleAddWorkoutDay}
            className="w-full bg-yellow-400 text-black text-xl font-bold py-2 rounded-lg hover:bg-yellow-300 transition"
          >
            ➕ Add Workout Day
          </button>
        </div>

        {/* Add Exercise to Workout Day */}
        <div className="mb-6 flex flex-col gap-4">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="border p-3 rounded-lg w-full text-xl"
          >
            <option value="">Select a workout day</option>
            {workoutPlan.map((day) => (
              <option key={day.day} value={day.day}>
                {day.day}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Exercise name"
            value={exercise.name}
            onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
            className="border p-3 rounded-lg w-full text-xl"
          />
          <input
            type="text"
            placeholder="Equipment"
            value={exercise.equipment}
            onChange={(e) =>
              setExercise({ ...exercise, equipment: e.target.value })
            }
            className="border p-3 rounded-lg w-full text-xl"
          />
          <input
            type="text"
            placeholder="Target Muscle"
            value={exercise.target}
            onChange={(e) =>
              setExercise({ ...exercise, target: e.target.value })
            }
            className="border p-3 rounded-lg w-full text-xl"
          />

          <button
            onClick={handleAddExercise}
            className="w-full bg-green-500 text-white text-xl font-bold py-2 rounded-lg hover:bg-green-400 transition"
          >
            ➕ Add Exercise
          </button>
        </div>

        {/* Display Workout Plan */}
        <div>
          {workoutPlan.length === 0 ? (
            <p className="text-center text-xl text-gray-400">
              No workout days yet. Start by adding one!
            </p>
          ) : (
            workoutPlan.map((day) => (
              <div
                key={day.day}
                className="mb-6 p-6 border rounded-lg shadow-lg bg-gray-900"
              >
                <h2 className="text-3xl font-extrabold text-yellow-400">
                  {day.day}
                </h2>

                {day.exercises.length === 0 ? (
                  <p className="text-gray-400">No exercises yet.</p>
                ) : (
                  <ul className="mt-4 space-y-2">
                    {day.exercises.map((exercise) => (
                      <li
                        key={exercise.id}
                        className="flex justify-between items-center text-xl text-white"
                      >
                        <span>
                          {exercise.name} - {exercise.equipment} -{" "}
                          {exercise.target}
                        </span>
                        <button
                          onClick={() =>
                            handleRemoveExercise(day.day, exercise.id)
                          }
                          className="text-red-500 text-2xl hover:text-red-400"
                        >
                          ❌
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlan;
