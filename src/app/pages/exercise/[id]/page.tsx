"use client";
import { useParams, useRouter } from "next/navigation";

export default function ExerciseDetail() {
  const router = useRouter();
  const { id } = useParams();

  const handleBack = () => {
    router.push("/pages/allExercises");
  };

  return (
    <div>
      {/* Back button */}
      <button
        onClick={handleBack}
        className="text-left bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black text-2xl shadow-lg rounded-md px-4 hover:bg-yellow-300 hover:text-white dark:hover:bg-white"
      >
        Back
      </button>
      <p className="text-center text-black dark:text-white font-bold text-3xl p-5">
        Details for Exercise with ID: {id}
      </p>
    </div>
  );
}
