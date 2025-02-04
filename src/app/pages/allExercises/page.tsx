/* eslint-disable @next/next/no-img-element */
"use client";
import DarkModeToggle from "@/app/components/darkModeToggle";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import LoadingSpinner from "@/app/components/loadingSpinner";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchExercises, loadMore } from "@/app/store/slices/allExercise";
import { Exercise } from "@/app/types";
import {
  setMuscleFilter,
  setEquipmentFilter,
} from "@/app/store/slices/allCategories";

export default function AllExercises() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [exercise, setExercise] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);

  const filters = useSelector((state: RootState) => state.categories.filters);

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

  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams({
        page: String(currentPage),
        muscle: filters.muscle,
        equipment: filters.equipment,
      });

      console.log("query muscle filter:", filters.muscle);
      console.log("query equipment filter:", filters.equipment);
      console.log("current page:", currentPage);

      const res = await fetch(`http://localhost:8000/all-exercises?${params}`);
      const data = await res.json();
      setExercise(data);
    };

    fetchProducts();
  }, [filters.muscle, filters.equipment, currentPage]);

  const exercises = Object.values(pages).flat();

  const handlePageChange = (page) => {
    // Sets the current page to change to whatever page was selected
    setCurrentPage(page);
  };

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
          <select
            value={filters.muscle}
            onChange={(e) => dispatch(setMuscleFilter(e.target.value))}
            className="w-full md:w-1/2 p-2 border rounded-lg text-black bg-yellow-400 font-bold text-center text-2xl"
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

          {/* Filter equipment dropdown */}
          <select
            value={filters.equipment}
            onChange={(e) => dispatch(setEquipmentFilter(e.target.value))}
            className="w-full md:w-1/2 p-2 border rounded-lg text-black bg-yellow-400 font-bold text-center text-2xl"
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
            </div>
          );
        })}
      </div>
      <div className="flex flex-col justify-center items-center">
        {loading === true ? <LoadingSpinner /> : null}
        {/* Page Toggle Buttons */}
        <p className="font-bold text-center py-1 mt-6">Page</p>
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
