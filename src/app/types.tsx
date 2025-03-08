export type Exercise = {
  id: string;
  name: string;
  equipment: string;
  target: string;
  gifUrl: string;
  instructions: string[];
};

export type Exercises = {
  exercise: Exercise;
};

export type MuscleCategory = {
  name: string;
};

export type EquipmentCategory = {
  name: string;
};

export type FilterCategory = {
  muscle: string;
  equipment: string;
};

export type WorkoutDay = {
  day: string;
  exercises: string[];
};

export type WorkoutState = {
  workoutDays: WorkoutDay[];
  loading: boolean;
  error: string | null;
};
