"use client";
import Image from "next/image";
import NavBar from "./components/navBar";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchSavedExercises } from "@/app/store/slices/savedExerciseAcions";

export default function App() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(
    (state: RootState) => state.authenticate.authenticated
  );

  // Routes for main buttons on home page
  const exploreExercises = () => {
    router.push("/pages/all-exercises");
  };

  const savedExercises = () => {
    if (!token) {
      router.push("/pages/login");
      alert("Please log in to view saved exercises.");
      return;
    }
    dispatch(fetchSavedExercises(token));
    router.push("/pages/saved-exercises");
  };

  const workoutPlan = () => {
    router.push("/pages/workout-plan");
  };

  return (
    <main className="bg-white dark:bg-black">
      <NavBar />
      <div className="px-10">
        <h1 className="text-center font-extrabold text-8xl pt-28    tracking-wider bg-gradient-to-r from-red-400 via-yellow-500 to-red-400 bg-clip-text text-transparent">
          GYM GURU
        </h1>
        <p className="text-center font-bold text-xl p-2 text-black dark:text-white tracking-wide">
          Your ultimate gym trainer
        </p>
        <div className="flex items-center justify-center p-4">
          <Image
            src="/stats-tracker.svg"
            alt="workout image"
            width={500}
            height={500}
          />
        </div>
        <div className="flex flex-col xl:flex-row justify-center py-2 items-center">
          <div className="text-center text-xl dark:text-white w-screen sm:p-10 px-4">
            <p className="font-bold text-5xl my-2 text-black dark:text-white">
              Gym Guru creates a simplified exercise discovery process.
            </p>
            <p className="py-2 text-yellow-600 text-xl sm:mx-10">
              Rather than experimenting in the gym and searching the web to find
              the proper form, Gym Guru gives you the power to discover new
              exercises, learn proper form and technique, and save your favorite
              exercises all in one app!
            </p>
            <p className="py-2 text-yellow-600 text-xl sm:mx-10">
              As you become comfortable and gain confidence in exercises, you
              can create a workout plan tailored with your favorite exercises.
            </p>
          </div>
          <div className="flex flex-col space-y-4 items-stretch justify-center max-w-lg mx-auto w-full py-4">
            <button
              onClick={exploreExercises}
              className="text-center bg-black text-white dark:bg-white dark:text-black text-5xl shadow-lg rounded-md p-8 gap-4 hover:bg-yellow-400 dark:hover:bg-yellow-400 transition"
            >
              Explore Exercises
            </button>
            <button
              onClick={savedExercises}
              className="text-center bg-black text-white dark:bg-white dark:text-black text-5xl shadow-lg rounded-md p-8 gap-4 hover:bg-yellow-400 dark:hover:bg-yellow-400 transition"
            >
              My Saved Exercises
            </button>
            <button
              onClick={workoutPlan}
              className="text-center bg-black text-white dark:bg-white dark:text-black text-5xl shadow-lg rounded-md p-8 gap-4 hover:bg-yellow-400 dark:hover:bg-yellow-400 transition"
            >
              My Workout Plan
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
