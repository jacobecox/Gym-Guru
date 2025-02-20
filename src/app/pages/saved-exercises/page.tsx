"use client";
import NavBar from "@/app/components/navBar";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useEffect } from "react";
import { fetchSavedExercises } from "@/app/store/slices/savedExerciseAcions";

export default function SavedExercises() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("fetching saved exercises");
    dispatch(fetchSavedExercises());
  }, [dispatch]);

  // const savedExercises = useSelector((state: RootState) => state.savedExercise);

  return (
    <div>
      <NavBar />
      <p className="text-white text-center p-8">Saved Exercises Here</p>
      <div></div>
    </div>
  );
}
