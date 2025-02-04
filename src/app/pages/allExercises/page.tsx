"use client";
import DarkModeToggle from "@/app/components/darkModeToggle";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Exercises } from "@/app/types";
import {
  setMuscleFilter,
  setEquipmentFilter,
} from "@/app/store/slices/allCategories";
import LoadingSpinner from "@/app/components/loadingSpinner";

export default function AllExercises() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // State Management
  const [exercises, setExercises] = useState<Exercises[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalExercises, setTotalExercises] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching Redux global state for all categories and filters
  const filters = useSelector((state: RootState) => state.categories.filters);
  const muscleCategories = useSelector(
    (state: RootState) => state.categories.muscleCategories
  );
  const equipmentCategories = useSelector(
    (state: RootState) => state.categories.equipmentCategories
  );

  useEffect(() => {
    const fetchProducts = async () => {
      // Listens for when page and muscle/equipment filters change and sends to api with updated params
      try {
        const params = new URLSearchParams({
          page: String(currentPage),
          muscle: filters.muscle,
          equipment: filters.equipment,
        });

        const res = await fetch(
          `http://localhost:8000/all-exercises?${params}`
        );
        const data = await res.json();

        setExercises(data.exercises);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setTotalExercises(data.totalExercises);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters.muscle, filters.equipment, currentPage]);

  const handlePageChange = (page: number) => {
    // Sets the current page to change to whatever page was selected
    setCurrentPage(page);
  };

  const handleBack = () => {
    router.push("/");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white dark:bg-black">
      <DarkModeToggle />
      <div className="p-4">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="text-left bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black text-2xl shadow-lg rounded-md px-4 hover:bg-yellow-300 hover:text-white dark:hover:bg-white"
        >
          Back
        </button>

        {/* Title */}
        <h1 className="text-7xl text-black dark:text-white font-extrabold text-center p-6 ">
          Explore Exercises
        </h1>

        {/* Display pages, total pages, total exercises */}
        <p className="text-gray-300 text-lg p-4">
          Showing page {currentPage} out of {totalPages} ({totalExercises}{" "}
          exercises)
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          {/* Filter Muscle dropdown */}
          <select
            value={filters.muscle}
            onChange={(e) => dispatch(setMuscleFilter(e.target.value))}
            className="w-full md:w-1/2 p-2 rounded-lg text-black bg-yellow-400 font-bold text-center text-2xl"
          >
            <option value="" disabled hidden>
              Filter by Muscle
            </option>
            <option>All</option>
            {muscleCategories.map((muscleCategory) => {
              return (
                <option key={muscleCategory.name} value={muscleCategory.name}>
                  {" "}
                  {muscleCategory.name}
                </option>
              );
            })}
          </select>

          {/* Filter Equipment dropdown */}
          <select
            value={filters.equipment}
            onChange={(e) => dispatch(setEquipmentFilter(e.target.value))}
            className="w-full md:w-1/2 p-2 rounded-lg text-black bg-yellow-400 font-bold text-center text-2xl"
          >
            <option value="" disabled hidden>
              Filter by Equipment
            </option>
            <option>All</option>
            {equipmentCategories.map((equipmentCategory) => {
              return (
                <option
                  key={equipmentCategory.name}
                  value={equipmentCategory.name}
                >
                  {" "}
                  {equipmentCategory.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Handle no exercises */}
      {exercises.length < 1 ? (
        <p className="text-black font-extrabold text-4xl text-center">
          No exercises found
        </p>
      ) : null}

      {/* Display mapped exercises */}
      <div className=" p-8 grid grid-cols-1 xl:grid-cols-3 gap-4">
        {exercises?.map((exercise: Exercises) => {
          return (
            <div
              key={exercise.exercise.id}
              className="dark:bg-gray-900 bg-gray-400 rounded-lg p-6 m-2"
            >
              <h1 className=" font-extrabold text-5xl text-center tracking-wide text-black dark:text-yellow-400 uppercase">
                {exercise.exercise.name}
              </h1>
              <div className="flex xl:flex-col-3 justify-between m-4 items-center">
                <div className="dark:bg-black bg-gray-200  rounded-lg px-6 py-2">
                  <h1 className="text-yellow-600 text-xl text-center">
                    Muscle:
                  </h1>
                  <p className="text-yellow-400 text-3xl font-bold text-center">
                    {exercise.exercise.target}
                  </p>
                </div>
                <div className="dark:bg-black bg-gray-200 rounded-lg px-6 py-2 m-4">
                  <h1 className="text-yellow-600 text-xl text-center">
                    Equipment:
                  </h1>
                  <p className="text-yellow-400 text-3xl font-bold text-center">
                    {exercise.exercise.equipment}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Page Toggle Buttons */}
      <div className="flex justify-center items-center space-x-2 p-6">
        <button
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          &#8592; Prev
        </button>
        <div className="text-black bg-yellow-400 rounded-md px-3 py-2 text-lg font-extrabold flex items-center">
          Page {currentPage}
        </div>
        <button
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          Next &#8594;
        </button>
      </div>
    </div>
  );
}
