import Image from "next/image";
import DarkModeToggle from "./components/darkModeToggle";

export default function App() {
  return (
    <main className="bg-white dark:bg-black">
      <div>
        <div className="flex justify-between items-center p-6 absolute top-0 left-0 right-0">
          <DarkModeToggle />
          <button className="text-right bg-black text-white dark:bg-yellow-400 dark:text-black text-2xl shadow-lg rounded-md p-2 hover:bg-yellow-400 hover:text-black dark:hover:bg-white">
            Login
          </button>
        </div>
        <h1 className="text-center font-extrabold text-8xl pt-10 dark:text-white">
          GYM GURU
        </h1>
        <p className="text-center font-bold text-xl p-2 text-yellow-400">
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
        <div className="flex justify-center mx-auto max-w-2xl">
          <div className="text-center text-xl dark:text-white">
            <p className="font-bold py-2">
              Gym Guru is here to help create a simplified exercise discovery
              process.
            </p>
            <p className="py-2">
              Rather than experimenting in the gym and searching the web to find
              the proper form, Gym Guru gives you the power to discover new
              exercises, learn proper form and technique, and save your favorite
              exercises all in one app!
            </p>
            <p className="py-2">
              As you become comfortable and gain confidence in exercises, you
              can create a workout plan tailored to your favorite exercises.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 items-stretch justify-center max-w-lg mx-auto w-full py-4">
        <button className="text-center bg-black text-white dark:bg-white dark:text-black text-5xl shadow-lg rounded-md p-8 gap-4 hover:bg-yellow-400 dark:hover:bg-yellow-400">
          Explore Exercises
        </button>
        <button className="text-center bg-black text-white dark:bg-white dark:text-black text-5xl shadow-lg rounded-md p-8 gap-4 hover:bg-yellow-400 dark:hover:bg-yellow-400">
          Saved Exercises
        </button>
        <button className="text-center bg-black text-white dark:bg-white dark:text-black text-5xl shadow-lg rounded-md p-8 gap-4 hover:bg-yellow-400 dark:hover:bg-yellow-400">
          My Workout Plan
        </button>
      </div>
    </main>
  );
}
