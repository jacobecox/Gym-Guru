import { useRouter } from "next/navigation";

export default function WorkoutPlanButton() {
  const router = useRouter();

  const workoutPlan = () => {
    router.push("/pages/workout-plan");
  };

  return (
    <button
      onClick={workoutPlan}
      className="text-center bg-yellow-400 text-black dark:bg-white dark:text-black text-xl sm:text-3xl shadow-lg rounded-md sm:px-4 px-1 sm:mx-2 mx-1   mt-16 hover:bg-yellow-300 hover:text-white dark:hover:bg-yellow-400 transition"
    >
      My Workout Plan
    </button>
  );
}
