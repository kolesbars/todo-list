import { TaskType } from '../../types/task';
import { TaskListData } from '../../types/state';
/**
 * Получает отсортированный по дате давления список задач из store
 * @param {TaskListData} state
 * @returns {TaskType[]} Cписок задач
 */
export const getTaskList = (state: TaskListData): TaskType[] =>
  [...state.taskList].sort((a, b) => b.date - a.date);
/**
 * Получает данные текущей задачи из store
 * @param {TaskListData} state
 * @returns {TaskType} Объект с данными задачи
 */
export const getCurrentTaskData = (state: TaskListData): TaskType =>
  state.currentTask;
/**
 * Получает статус загрузки данных с сервера из store
 * @param {TaskListData} state
 * @returns {boolean} Статус загрузки
 */
export const getIsLoading = (state: TaskListData): boolean => state.isLoading;
