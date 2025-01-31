export type Exercise = {
  id: number;
  name: string;
  equipment: string;
  target: string;
  gifUrl: string;
};

export type Params = {
  offset: number;
};

export type CategoryFilter = {
  offset: number;
  muscleCategory: string;
  equipmentCategory: string;
};
