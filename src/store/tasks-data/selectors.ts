import { TaskType } from '../../types/task';
import { TaskListData } from '../../types/state';
/**
 * Получает отсортированный по дате добавления список задач из store
 * @param {TaskListData} state
 * @returns {TaskType[]} Cписок задач
 */
export const getTaskList = (state: TaskListData): TaskType[] =>
  [...state.taskList].sort((a, b) => b.createdDate - a.createdDate);
/**
 * Получает данные текущей задачи из store
 * @param {TaskListData} state
 * @returns {TaskType} Объект с данными задачи
 */
export const getCurrentTaskData = (state: TaskListData): TaskType =>
  state.currentTask;
/**
 * Получает статус загрузки списка задач с сервера из store
 * @param {TaskListData} state
 * @returns {boolean} Статус загрузки
 */
export const getIsTaskListLoading = (state: TaskListData): boolean =>
  state.isTaskListLoading;
/**
 * Получает статус загрузки текущей задачи с сервера из store
 * @param {TaskListData} state
 * @returns {boolean} Статус загрузки
 */
export const getIsCurrentTaskLoading = (state: TaskListData): boolean =>
  state.isCurrentTaskLoading;
