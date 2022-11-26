import { TaskType } from './task';
import { store } from '../store/store';

export type TaskListData = {
  taskList: TaskType[];
  isTaskListLoading: boolean;
  currentTask: TaskType,
  isCurrentTaskLoading: boolean,
};

export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof store.getState>;
