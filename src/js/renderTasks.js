// Функції для рендерингу завдань у DOM
const renderModule = {
  /**
   * Створює HTML-розмітку для одного завдання.
   * @param {object} task - Об'єкт завдання {id, title, text}.
   * @returns {string} - HTML-рядок елемента списку.
   */
  createTaskMarkup({ id, title, text }) {
    return `
                    <li class="task-item" data-id="${id}">
                        <div class="task-content">
                            <h3>${title}</h3>
                            <p>${text}</p>
                        </div>
                        <button class="btn btn-delete" data-id="${id}">Видалити</button>
                    </li>
                `;
  },
  /**
   * Відображає всі завдання у списку.
   * @param {Array<object>} tasks - Масив завдань.
   */
  renderTasks(tasks) {
    if (tasks.length === 0) {
      refs.taskList.innerHTML =
        '<p class="placeholder-text">Список завдань порожній. Додайте щось!</p>';
    } else {
      const markup = tasks.map(this.createTaskMarkup).join('');
      refs.taskList.innerHTML = markup;
    }
  },
};
