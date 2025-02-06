/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchExerciseDetail } from "@/app/store/slices/exerciseDetail";
import DarkModeToggle from "@/app/components/darkModeToggle";
import LoadingSpinner from "@/app/components/loadingSpinner";

export default function ExerciseDetail() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const handleBack = () => {
    router.push("/pages/allExercises");
  };

  const exerciseDetail = useSelector(
    (state: RootState) => state.exerciseDetail.exerciseDetail
  );

  console.log("exercise Detail:", exerciseDetail);

  const loading = useSelector(
    (state: RootState) => state.exerciseDetail.loading
  );

  // Fetches current id using useParams and passes id into redux slice to call for exercise details
  useEffect(() => {
    if (id) {
      const validId = Array.isArray(id) ? id[0] : id; // id must be string (not array of strings which useParams allows)
      dispatch(fetchExerciseDetail(validId));
    }
  }, [dispatch, id]);

  if (loading === true) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <DarkModeToggle />
      <div className="p-4">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="text-left bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black text-2xl shadow-lg rounded-md px-4 hover:bg-yellow-300 hover:text-white dark:hover:bg-white"
        >
          Back
        </button>
        {/* Exercise Name */}
        <p className="text-center bg-gradient-to-r from-red-400 via-yellow-500 to-red-400 bg-clip-text text-transparent font-extrabold text-7xl p-5 uppercase tracking-wide">
          {exerciseDetail?.name}
        </p>
        {/* Muscle and Equipment */}
        <div className="dark:bg-gray-900 grid grid-cols-2 rounded-md mx-80 text-center p-4">
          <p className="text-white text-2xl px-2">musle: </p>
          <p className="text-white text-2xl px-2">equipment: </p>
          <p className="text-yellow-400 text-3xl font-bold px-4">
            {exerciseDetail?.target.toUpperCase()}
          </p>
          <p className="text-yellow-400 text-3xl font-bold px-4">
            {exerciseDetail?.equipment.toUpperCase()}
          </p>
        </div>
        {/* Save exercise buttons */}
        <div className="grid grid-cols-2 rounded-md mx-96 text-center p-2 m-6">
          <button className="text white text-4xl p-2 m-2 rounded-md bg-yellow-400 hover:bg-yellow-500">
            Save Exercise
          </button>
          <button className="text white text-4xl p-2 m-2 rounded-md bg-yellow-400 hover:bg-yellow-500">
            Add to My Workout
          </button>
        </div>

        <div className="grid rounded-md mx-96 text-center p-2 m-6 justify-center items-center">
          {/* Gif Animation */}
          <img
            src={exerciseDetail?.gifUrl}
            alt="Workout Animation"
            className="rounded-md object-cover p-4"
          />
          {/* Instructions */}
          <div className="rounded-md dark:bg-gray-900">
            <p className="text-white text-4xl p-2 m-2 font-bold">
              Instructions
            </p>
            <div className="text-start text-white text-2xl p-4">
              {exerciseDetail?.instructions?.map((instruction) => {
                return (
                  <div key={instruction}>
                    <p>Step: {instruction}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
