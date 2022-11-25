export type TaskType = {
  title: string;
  text: string;
  date: number;
  id?: string;
  deadline: number;
  fileURL?: string;
  isCompleted: boolean;
};
