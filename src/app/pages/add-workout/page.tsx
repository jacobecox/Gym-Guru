"use client";
import NavBar from "@/app/components/navBar";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const workoutDay = null;

  return (
    <div>
      <NavBar />
      {/* Back button */}
      <div className="px-4">
        <button
          onClick={() => router.back()}
          className="text-left bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black text-2xl shadow-lg rounded-md px-4 mx-4 mt-16 hover:bg-yellow-300 hover:text-white dark:hover:bg-white transition"
        >
          Back
        </button>
        <div>
          <p className="text-center text-black dark:text-white font-bold text-6xl pt-12 sm:pt-2 tracking-wide">
            Choose workout day to save exercise to
          </p>
        </div>

        {/* Workout days or handle no workout days */}
        <div className="bg-gray-900 p-10 mx-96 mt-8 mb-4 shadow-md">
          <div className="text-center text-xl text-white">
            {!workoutDay ? <p> Create a workout day to save to</p> : workoutDay}
          </div>
        </div>

        {/* Form to create new day */}
        <form className="flex flex-col justify-center items-center">
          <input className="bg-gray-900 border-4 border-yellow-400 text-white p-2 shadow-md"></input>
          <button
            className="bg-yellow-400 hover:bg-yellow-300 rounded-md p-2 m-2 shadow-md"
            type="submit"
          >
            Create new day +
          </button>
        </form>
        {/* Save exercise button */}
        <div className="flex justify-center items-center m-2">
          <button className="bg-gray-900 hover:bg-gray-800 border-4 border-yellow-400 text-white rounded-md p-4 m-8 text-4xl shadow-md">
            Save Exercise
          </button>
        </div>
      </div>
    </div>
  );
}
