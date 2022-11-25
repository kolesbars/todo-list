import { ActionType } from '../types/action';
import { TaskType } from '../types/task';
import { createAction } from '@reduxjs/toolkit';

export const updateTaskList = createAction(
  ActionType.UpdateTaskList,
  (tasks: TaskType[]) => ({
    payload: tasks,
  })
);

export const addNewTask = createAction(
  ActionType.AddNewTask,
  (task: TaskType) => ({
    payload: task,
  })
);

export const changeCompletedStatus = createAction(
  ActionType.ChangeCompletedStatus,
  (id: string) => ({
    payload: id,
  })
);

export const deleteTask = createAction(ActionType.DeleteTask, (id: string) => ({
  payload: id,
}));

export const updateTask = createAction(
  ActionType.UpdateTask,
  (id: string, data: TaskType) => ({
    payload: {
      id: id,
      data: data,
    },
  })
);

export const setIsLoading = createAction(
  ActionType.setIsLoading,
  (status: boolean) => ({
    payload: status,
  })
);

export const updateCurrentTask = createAction(
  ActionType.UpdateCurrentTask,
  (task: TaskType) => ({
    payload: task,
  })
);
