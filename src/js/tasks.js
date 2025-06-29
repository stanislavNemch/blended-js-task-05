// Логіка управління завданнями
const tasksModule = {
  tasks: storageAPI.load(TASKS_STORAGE_KEY) || [],

  /**
   * Ініціалізує список завдань при завантаженні сторінки.
   */
  init() {
    renderModule.renderTasks(this.tasks);
  },
  /**
   * Додає нове завдання.
   * @param {string} title - Назва завдання.
   * @param {string} text - Текст завдання.
   */
  addTask(title, text) {
    if (!title.trim() || !text.trim()) {
      alert('Назва та опис завдання не можуть бути порожніми!');
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
   * Видаляє завдання за його ID.
   * @param {number} taskId - ID завдання для видалення.
   */
  deleteTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveAndRerender();
  },
  /**
   * Зберігає поточний стан завдань у localStorage та перерендерить список.
   */
  saveAndRerender() {
    storageAPI.save(TASKS_STORAGE_KEY, this.tasks);
    renderModule.renderTasks(this.tasks);
  },
};
