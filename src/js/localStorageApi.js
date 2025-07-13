// API для роботи з localStorage
import iziToast from 'izitoast'; // Імпорт бібліотеки для сповіщень
import 'izitoast/dist/css/iziToast.min.css'; // Імпорт стилів iziToast

export const storageAPI = {
  /**
   * Зберігає дані в localStorage.
   * @param {string} key - Ключ для збереження.
   * @param {any} value - Значення для збереження.
   */
  save(key, value) {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      iziToast.error({
        title: 'Помилка',
        message: `Set state error: ${error.message}`,
        position: 'topRight',
      });
    }
  },
  /**
   * Завантажує дані з  localStorage.
   * @param {string} key - Ключ для завантаження.
   * @returns {any | undefined} - Розпарені дані або undefined, якщо сталася помилка.
   */
  load(key) {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      iziToast.error({
        title: 'Помилка',
        message: `Get state error: ${error.message}`,
        position: 'topRight',
      });
      return undefined;
    }
  },
};

// Ключі для localStorage
export const TASKS_STORAGE_KEY = 'todo-tasks';
export const THEME_STORAGE_KEY = 'theme';
export const FORM_INPUT_TITLE_KEY = 'form-input-title';
export const FORM_INPUT_TEXT_KEY = 'form-input-text';
