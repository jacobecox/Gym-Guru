import { useRouter } from "next/navigation";

export default function ExploreExercisesButton() {
  const router = useRouter();

  const exploreExercises = () => {
    router.push("/pages/all-exercises");
  };

  return (
    <button
      onClick={exploreExercises}
      className="text-center bg-yellow-400 text-black dark:bg-white dark:text-black text-xl sm:text-3xl shadow-lg rounded-md sm:px-4 px-1 sm:mx-2 mx-1 mt-16 hover:bg-yellow-300 hover:text-white dark:hover:bg-yellow-400 transition"
    >
      Explore Exercises
    </button>
  );
}
