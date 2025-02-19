/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchExerciseDetail } from "@/app/store/slices/exerciseDetail";
import NavBar from "@/app/components/navBar";
import LoadingSpinner from "@/app/components/loadingSpinner";

export default function ExerciseDetail() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const handleBack = () => {
    router.push("/pages/all-exercises");
  };

  const exerciseDetail = useSelector(
    (state: RootState) => state.exerciseDetail.exerciseDetail
  );

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
      <NavBar />
      <div className="p-4">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="text-left bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black text-2xl shadow-lg rounded-md px-4 mx-4 mt-16 hover:bg-yellow-300 hover:text-white dark:hover:bg-white"
        >
          Back
        </button>
        {/* Exercise Name */}
        <p className="text-center bg-gradient-to-r from-red-400 via-yellow-500 to-red-400 bg-clip-text text-transparent font-extrabold text-7xl p-5 uppercase tracking-wide">
          {exerciseDetail?.name}
        </p>
        {/* Muscle and Equipment */}
        <div className="dark:bg-gray-900 bg-gray-200 grid grid-cols-2 rounded-md sm:mx-40 text-center p-4">
          <p className="dark:text-white text-yellow-600 text-xl sm:text-2xl px-2">
            muscle:
          </p>
          <p className="dark:text-white text-yellow-600 text-xl sm:text-2xl px-2">
            equipment:
          </p>
          <p className="dark:text-yellow-400 text-black sm:text-3xl text-2xl font-bold px-4">
            {exerciseDetail?.target.toUpperCase()}
          </p>
          <p className="dark:text-yellow-400 text-black sm:text-3xl text-2xl font-bold px-4">
            {exerciseDetail?.equipment.toUpperCase()}
          </p>
        </div>
        {/* Save exercise buttons */}
        <div className="grid grid-cols-2 rounded-md sm:mx-40 text-center p-2 m-6">
          <button className="text white text-xl sm:text-4xl p-2 m-2 rounded-md bg-yellow-400 hover:bg-yellow-500">
            Save Exercise
          </button>
          <button className="text white text-xl sm:text-4xl p-2 m-2 rounded-md bg-yellow-400 hover:bg-yellow-500 ">
            Add to My Workout
          </button>
        </div>

        <div className="flex flex-col rounded-md text-center p-2 m-6 justify-center items-center">
          {/* Gif Animation */}
          <div className="dark:bg-gray-900 bg-gray-200 p-4 my-4 w-auto rounded-md">
            <img
              src={exerciseDetail?.gifUrl}
              alt="Workout Animation"
              className="rounded-md object-fill"
            />
          </div>
          {/* Instructions */}
          <div className="rounded-md dark:bg-gray-900 bg-gray-900 p-6">
            <p className="text-white text-4xl mt-4 font-bold">Instructions</p>
            <div className="text-start text-white text-2xl px-4 py-2">
              {exerciseDetail?.instructions?.map((instruction, index) => {
                return (
                  <div key={instruction}>
                    <p className="p-2 text-yellow-400 font-bold pt-8">
                      Step {index + 1}:
                    </p>
                    <p>{instruction}</p>
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
