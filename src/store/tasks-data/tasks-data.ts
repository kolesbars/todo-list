import { createReducer } from '@reduxjs/toolkit';
import { emptyTask } from '../../const';
import { TaskListData } from '../../types/state';
import {
  updateTaskList,
  setIsTaskListLoading,
  setIsCurrentTaskLoading,
  updateCurrentTask,
  addNewTask,
  changeCompletedStatus,
  deleteTask,
  updateTask,
} from '../action';

const initialState: TaskListData = {
  isTaskListLoading: false,
  taskList: [],
  isCurrentTaskLoading: false,
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
    .addCase(setIsTaskListLoading, (state, action) => {
      state.isTaskListLoading = action.payload;
    })
    .addCase(updateCurrentTask, (state, action) => {
      state.currentTask = action.payload;
    })
    .addCase(setIsCurrentTaskLoading, (state, action) => {
      state.isCurrentTaskLoading = action.payload;
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
