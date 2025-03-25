import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchSavedExercises } from "@/app/store/slices/savedExerciseAcions";

export default function SavedExercisesButton() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(
    (state: RootState) => state.authenticate.authenticated
  );
  const savedExercises = async () => {
    if (!token) {
      router.push("/pages/login");
      alert("Please log in to view saved exercises.");
      return;
    }
    try {
      await dispatch(fetchSavedExercises(token));

      router.push("/pages/saved-exercises");
    } catch (error) {
      console.error("Error fetching saved exercises:", error);
    }
  };

  return (
    <button
      onClick={savedExercises}
      className="text-center bg-yellow-400 text-black dark:bg-white dark:text-black text-xl sm:text-3xl shadow-lg rounded-md sm:px-4 px-1 sm:mx-2 mx-1 mt-1 hover:bg-yellow-300 hover:text-white dark:hover:bg-yellow-400 transition"
    >
      My Saved Exercises
    </button>
  );
}
