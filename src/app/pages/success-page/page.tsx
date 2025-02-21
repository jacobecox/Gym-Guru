"use client";
import NavBar from "@/app/components/navBar";
import ExploreExercisesButton from "@/app/components/buttons/exploreExercisesButton";
import SavedExercisesButton from "@/app/components/buttons/savedExercisesButton";
import WorkoutPlanButton from "@/app/components/buttons/workoutPlanButton";
import Image from "next/image";

export default function SuccessPage() {
  return (
    <div>
      <NavBar />
      <div>
        <p className="text-center bg-gradient-to-r from-red-400 via-yellow-500 to-red-400 bg-clip-text text-transparent font-extrabold text-7xl pt-12 sm:pt-2 uppercase tracking-wide">
          Exercise Saved!
        </p>
        <div className="flex justify-evenly">
          <ExploreExercisesButton />
          <SavedExercisesButton />
          <WorkoutPlanButton />
        </div>
        <div className="flex items-center justify-center pt-10">
          <Image
            src="/success-page.svg"
            alt="workout image"
            width={450}
            height={450}
          />
        </div>
      </div>
    </div>
  );
}
