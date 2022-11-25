import { Action } from 'redux';
import { ThunkAction } from '@reduxjs/toolkit';
import { FirebaseType } from '../services/firebase';
import { State } from './state';

export enum ActionType {
  UpdateTaskList = 'tasks/updateTaskList',
  AddNewTask = 'tasks/addNewTask',
  ChangeCompletedStatus = 'tasks/changeCompletedStatus',
  DeleteTask = 'tasks/deleteTask',
  UpdateTask = 'tasks/updateTask',
  setIsLoading = 'tasks/setIsLoading',
  UpdateCurrentTask = 'tasks/updateCurrentTask'
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  State,
  FirebaseType,
  Action
>;
