export type Exercise = {
  id: number;
  name: string;
  equipment: string;
  target: string;
  gifUrl: string;
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
