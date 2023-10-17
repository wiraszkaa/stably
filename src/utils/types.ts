export type Entry = {
  horse: string;
  date: string;
  id?: string;
  training?: Training;
  warning?: boolean;
  comment?: string;
};

export enum Training {
  DRESSAGE = "Dressage",
  JUMPING = "Jumping",
}
