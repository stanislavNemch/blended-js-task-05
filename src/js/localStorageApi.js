// API для роботи з localStorage
export const storageAPI = {
  /**
   * Сохраняет данные в localStorage.
   * @param {string} key - Ключ для сохранения.
   * @param {any} value - Значение для сохранения.
   */
  save(key, value) {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  },
  /**
   * Загружает данные из localStorage.
   * @param {string} key - Ключ для загрузки.
   * @returns {any | undefined} - Распарсенные данные или undefined, если произошла ошибка.
   */
  load(key) {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
      return undefined;
    }
  },
};

// Ключи для localStorage
export const TASKS_STORAGE_KEY = 'todo-tasks';
export const THEME_STORAGE_KEY = 'theme';
