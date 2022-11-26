import { ThunkActionResult } from '../types/action';
import { TaskType } from '../types/task';
import dayjs from 'dayjs';
import { addFileToStorage } from '../utils/common';
import {
  updateTaskList,
  addNewTask,
  changeCompletedStatus,
  deleteTask,
  updateCurrentTask,
  updateTask,
  setIsTaskListLoading,
  setIsCurrentTaskLoading,
} from './action';
/**
 * Запрашивает список задач с firestore
 */
export const loadTaskListAction =
  (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setIsTaskListLoading(true));
    const fireStore = api.firestore();
    try {
      const resp = await fireStore.collection('tasks').get();
      const tasks = resp.docs.map(
        (task) => ({ ...task.data(), id: task.id } as TaskType)
      );
      dispatch(updateTaskList(tasks));
      dispatch(setIsTaskListLoading(false));
    } catch (error) {
      console.error(error);
    }
  };
/**
 * Добавляет новую задачу в список задач в firestore и store
 * @param {File} file прикрепленный файл
 * @param {TaskType} data данные задачи
 */
export const setNewTaskAction =
  (file: File | null, data: TaskType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const fireStore = api.firestore();
      const createdDate = dayjs().valueOf();
      const newTask: TaskType = {
        ...data,
        createdDate: createdDate,
      };

      if (file) {
        const fileURL = await addFileToStorage(api, file);
        newTask.fileURL = fileURL;
      }

      const newDoc = await fireStore.collection('tasks').add({ ...newTask });

      dispatch(addNewTask({ ...newTask, id: newDoc.id }));
    } catch (error) {
      console.error(error);
    }
  };
/**
 * Обновляет данные выбранной задачи в firestore и store
 * @param id идентификатор задачи
 * @param file прикрепленный файл
 * @param data обновленные данные задачи
 */
export const updateTaskAction =
  (id: string, file: File | null, data: TaskType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const fireStore = api.firestore();
      const newData: TaskType = {
        ...data,
      };

      if (file) {
        const fileURL = await addFileToStorage(api, file);
        newData.fileURL = fileURL;
      }

      await fireStore.collection('tasks').doc(id).update(newData);
      const updatedDoc = await fireStore.collection('tasks').doc(id).get();

      dispatch(updateTask(updatedDoc.id, updatedDoc.data() as TaskType));
    } catch (error) {
      console.error(error);
    }
  };
/**
 * Меняет статус выполнения задачи в firestore и store
 * @param id идетификатор задачи
 * @param status статус выполнения
 */
export const setCompletedStatusAction =
  (id: string, status: boolean): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const fireStore = api.firestore();
      await fireStore
        .collection('tasks')
        .doc(id)
        .update({ isCompleted: status });
      dispatch(changeCompletedStatus(id));
    } catch (error) {
      console.error(error);
    }
  };
/**
 * Удаляет задачу из списка в firestore и store
 * @param id идентификатор задачи
 */
export const deleteTaskAction =
  (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const fireStore = api.firestore();
      await fireStore.collection('tasks').doc(id).delete();
      dispatch(deleteTask(id));
    } catch (error) {
      console.error(error);
    }
  };
/**
 * Запрашивает данные текущей задачи из firesore и добавляет их в store
 * @param id идентификатор задачи
 */
export const loadCurrentTaskAction =
  (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(setIsCurrentTaskLoading(true));
      const fireStore = api.firestore();
      const resp = await fireStore.collection('tasks').doc(id).get();
      const task = resp.data() as TaskType;
      dispatch(updateCurrentTask(task));
      dispatch(setIsCurrentTaskLoading(false));
    } catch (error) {
      console.error(error);
    }
  };
