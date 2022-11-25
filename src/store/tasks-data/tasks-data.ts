import { createReducer } from '@reduxjs/toolkit';
import { emptyTask } from '../../const';
import { TaskListData } from '../../types/state';
import {
  updateTaskList,
  setIsLoading,
  updateCurrentTask,
  addNewTask,
  changeCompletedStatus,
  deleteTask,
  updateTask,
} from '../action';

const initialState: TaskListData = {
  isLoading: false,
  taskList: [],
  currentTask: emptyTask,
};

const tasksData = createReducer(initialState, (builder) => {
  builder
    .addCase(updateTaskList, (state, action) => {
      state.taskList = action.payload;
    })
    .addCase(addNewTask, (state, action) => {
      state.taskList = [...state.taskList, action.payload];
    })
    .addCase(deleteTask, (state, action) => {
      state.taskList = [
        ...state.taskList.filter((task) => task.id !== action.payload),
      ];
    })
    .addCase(updateTask, (state, action) => {
      state.taskList = [
        ...state.taskList.filter((task) => task.id !== action.payload.id),
        action.payload.data,
      ];
      state.currentTask = action.payload.data;
    })
    .addCase(setIsLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(updateCurrentTask, (state, action) => {
      state.currentTask = action.payload;
    })
    .addCase(changeCompletedStatus, (state, action) => {
      state.taskList.forEach((task) => {
        if (task.id === action.payload) {
          task.isCompleted = !task.isCompleted;
        }
      });
    });
});

export { tasksData };
