export type TaskType = {
  title: string;
  text: string;
  createdDate: number;
  id?: string;
  deadline: number;
  fileURL?: string;
  isCompleted: boolean;
};
