"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  fetchEquipmentCategories,
  fetchMuscleCategories,
} from "../store/slices/allCategories";

// Wraps useEffect around entire layout to fetch all categories as soon as app loads. This allows categories to be globally stored and used across the app from initial load.
export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMuscleCategories());
    dispatch(fetchEquipmentCategories());
  }, [dispatch]);

  return <>{children}</>;
}
