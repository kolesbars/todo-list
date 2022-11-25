import { configureStore } from '@reduxjs/toolkit';
import { firebaseApp } from '../services/firebase';
import { tasksData } from './tasks-data/tasks-data';

export const store = configureStore({
  reducer: tasksData,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: firebaseApp,
      },
    }),
});
