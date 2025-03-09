import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchWorkoutDays } from "@/app/store/slices/workoutSlice";

export default function WorkoutPlanButton() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(
    (state: RootState) => state.authenticate.authenticated
  );
  const workoutPlan = () => {
    if (!token) {
      router.push("/pages/login");
      alert("Please log in to view workout plan.");
      return;
    }
    dispatch(fetchWorkoutDays(token));
    router.push("/pages/workout-plan");
  };

  return (
    <button
      onClick={workoutPlan}
      className="text-center bg-yellow-400 text-black dark:bg-white dark:text-black text-xl sm:text-3xl shadow-lg rounded-md sm:px-4 px-1 sm:mx-2 mx-1   mt-6 hover:bg-yellow-300 hover:text-white dark:hover:bg-yellow-400 transition"
    >
      My Workout Plan
    </button>
  );
}
