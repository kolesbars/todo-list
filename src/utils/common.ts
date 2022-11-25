import { FirebaseType } from '../services/firebase';
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
