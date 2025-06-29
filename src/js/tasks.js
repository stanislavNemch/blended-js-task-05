// Логіка управління завданнями
import { storageAPI, TASKS_STORAGE_KEY } from './localStorageApi.js';
import renderModule from './renderTasks.js';

const tasksModule = {
  tasks: storageAPI.load(TASKS_STORAGE_KEY) || [],

  /**
   * Инициализирует список задач при загрузке страницы.
   */
  init() {
    renderModule.renderTasks(this.tasks);
  },
  /**
   * Добавляет новую задачу.
   * @param {string} title - Название задачи.
   * @param {string} text - Текст задачи.
   */
  addTask(title, text) {
    if (!title.trim() || !text.trim()) {
      alert('Название и описание задачи не могут быть пустыми!');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      text: text.trim(),
    };

    this.tasks.push(newTask);
    this.saveAndRerender();
  },
  /**
   * Удаляет задачу по её ID.
   * @param {number} taskId - ID задачи для удаления.
   */
  deleteTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveAndRerender();
  },
  /**
   * Сохраняет текущее состояние задач в localStorage и перерисовывает список.
   */
  saveAndRerender() {
    storageAPI.save(TASKS_STORAGE_KEY, this.tasks);
    renderModule.renderTasks(this.tasks);
  },
};

export default tasksModule;
