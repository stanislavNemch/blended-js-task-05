// API для роботи з localStorage
const storageAPI = {
  /**
   * Зберігає дані у localStorage.
   * @param {string} key - Ключ для збереження.
   * @param {any} value - Значення для збереження.
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
   * Завантажує дані з localStorage.
   * @param {string} key - Ключ для завантаження.
   * @returns {any | undefined} - Розпарсені дані або undefined, якщо сталася помилка.
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

// Ключі для localStorage
const TASKS_STORAGE_KEY = 'todo-tasks';
const THEME_STORAGE_KEY = 'theme';
