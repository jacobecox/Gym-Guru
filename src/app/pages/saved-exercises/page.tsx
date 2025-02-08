import HomeButton from "@/app/components/homeButton";
import DarkModeToggle from "@/app/components/darkModeToggle";

export default function SavedExercises() {
  return (
    <div>
      <div className="flex justify-between">
        <DarkModeToggle />
        <HomeButton />
      </div>
      <p className="text-white text-center p-8">Saved Exercises Here</p>
    </div>
  );
}
