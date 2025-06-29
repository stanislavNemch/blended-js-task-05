// Функції для рендерингу завдань у DOM
import refs from './refs.js';

const renderModule = {
  /**
   * Создает HTML-разметку для одной задачи.
   * @param {object} task - Объект задачи {id, title, text}.
   * @returns {string} - HTML-строка элемента списка.
   */
  createTaskMarkup({ id, title, text }) {
    return `
            <li class="task-item" data-id="${id}">
                <div class="task-content">
                    <h3>${title}</h3>
                    <p>${text}</p>
                </div>
                <button class="btn btn-delete" data-id="${id}">Удалить</button>
            </li>
        `;
  },
  /**
   * Отображает все задачи в списке.
   * @param {Array<object>} tasks - Массив задач.
   */
  renderTasks(tasks) {
    if (tasks.length === 0) {
      refs.taskList.innerHTML =
        '<p class="placeholder-text">Список задач пуст. Добавьте что-нибудь!</p>';
    } else {
      const markup = tasks.map(this.createTaskMarkup).join('');
      refs.taskList.innerHTML = markup;
    }
  },
};

export default renderModule;
