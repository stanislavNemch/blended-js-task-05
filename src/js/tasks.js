import iziToast from 'izitoast'; // Імпорт бібліотеки для сповіщень
import './css/styles.css'; // Імпорт стилів iziToast

// Логіка управління завданнями
import { storageAPI, TASKS_STORAGE_KEY } from './localStorageApi.js';
import renderModule from './renderTasks.js';

const tasksModule = {
  tasks: storageAPI.load(TASKS_STORAGE_KEY) || [],

  /**
   * Ініціалізує список завдань під час завантаження сторінки.
   */
  init() {
    renderModule.renderTasks(this.tasks);
  },
  /**
   * Додає нове завдання.
   * @param {string} title - Назва задачі.
   * @param {string} text - Текст завдання.
   * @returns {boolean} - Повертає true, якщо завдання додано, інакше false.
   */
  addTask(title, text) {
    if (!title.trim() || !text.trim()) {
      iziToast.error({
        title: 'Помилка',
        message: 'Назва та опис завдання не можуть бути порожніми!',
        position: 'topRight',
      });
      return false;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      text: text.trim(),
    };

    this.tasks.push(newTask);
    this.saveAndRerender();
    iziToast.success({
      title: 'Успіх',
      message: 'Завдання додано!',
      position: 'topRight',
    });
    return true;
  },
  /**
   * Видаляє завдання з її ID.
   * @param {number} taskId - ID завдання видалення.
   */
  deleteTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveAndRerender();
    iziToast.success({
      title: 'Успіх',
      message: 'Завдання видалено!',
      position: 'topRight',
    });
  },
  /**
   * Зберігає поточний стан завдань у localStorage і перемальовує список.
   */
  saveAndRerender() {
    storageAPI.save(TASKS_STORAGE_KEY, this.tasks);
    renderModule.renderTasks(this.tasks);
  },
};

export default tasksModule;
