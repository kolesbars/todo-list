import { FirebaseType } from '../services/firebase';
import dayjs from 'dayjs';
/**
 * Добавляет файл в хранилище firebase
 * @param {FirebaseType} api firebase
 * @param {File} file добавляемый файл
 * @returns {Promise<string>} ссылка для скачивания файла
 */
export const addFileToStorage = async (
  api: FirebaseType,
  file: File
): Promise<string> => {
  const storage = api.storage();
  const storageRef = storage.ref();
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);
  return await fileRef.getDownloadURL();
};
/**
 * Проверяет вышел ли срок выполнения задачи
 * @param {number} deadline срок выполнения задачи
 * @returns {boolean}
 */
export const checkeIsOverdue = (deadline: number) => {
  return dayjs(deadline).valueOf() <= dayjs().subtract(1, 'day').valueOf();
};
