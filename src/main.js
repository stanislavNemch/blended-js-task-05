import './css/main.css';
import './css/styles.css';

import refs from './js/refs.js';
import { storageAPI, THEME_STORAGE_KEY } from './js/localStorageApi.js';
import tasksModule from './js/tasks.js';
import './js/renderTasks.js';

// --- Инициализация темы ---
const savedTheme = storageAPI.load(THEME_STORAGE_KEY);
if (savedTheme === 'dark') {
  refs.body.classList.add('dark');
  refs.themeSwitcher.textContent = '🌙';
} else {
  refs.themeSwitcher.textContent = '☀️';
}

// --- Инициализация задач ---
tasksModule.init();

// --- Обработчик добавления задачи ---
refs.form.addEventListener('submit', event => {
  event.preventDefault();
  tasksModule.addTask(refs.titleInput.value, refs.textInput.value);
  refs.form.reset();
  refs.titleInput.focus();
});

// --- Обработчик удаления задачи (делегирование событий) ---
refs.taskList.addEventListener('click', event => {
  if (event.target.classList.contains('btn-delete')) {
    const taskId = Number(event.target.dataset.id);
    tasksModule.deleteTask(taskId);
  }
});

// --- Обработчик переключения темы ---
refs.themeSwitcher.addEventListener('click', () => {
  refs.body.classList.toggle('dark');
  const isDark = refs.body.classList.contains('dark');

  if (isDark) {
    storageAPI.save(THEME_STORAGE_KEY, 'dark');
    refs.themeSwitcher.textContent = '🌙';
  } else {
    storageAPI.save(THEME_STORAGE_KEY, 'light');
    refs.themeSwitcher.textContent = '☀️';
  }
});
