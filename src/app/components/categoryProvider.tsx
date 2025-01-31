"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  fetchEquipmentCategories,
  fetchMuscleCategories,
} from "../store/slices/allCategories";

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMuscleCategories());
    dispatch(fetchEquipmentCategories());
  }, [dispatch]);

  return <>{children}</>;
}
