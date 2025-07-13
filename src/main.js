import './css/vendors.css'; // Імпорт стилів iziToast

import './css/main.css';
import './css/styles.css';

import refs from './js/refs.js';
import {
  storageAPI,
  THEME_STORAGE_KEY,
  FORM_INPUT_TITLE_KEY,
  FORM_INPUT_TEXT_KEY,
} from './js/localStorageApi.js';
import tasksModule from './js/tasks.js';
import './js/renderTasks.js';

// --- Ініціалізація теми---
const savedTheme = storageAPI.load(THEME_STORAGE_KEY);
if (savedTheme === 'dark') {
  refs.body.classList.add('dark');
  refs.themeSwitcher.textContent = '🌙';
} else {
  refs.themeSwitcher.textContent = '☀️';
}

// --- Завантаження збережених значень полів форми ---
const savedTitle = storageAPI.load(FORM_INPUT_TITLE_KEY);
const savedText = storageAPI.load(FORM_INPUT_TEXT_KEY);

if (savedTitle) {
  refs.titleInput.value = savedTitle;
}
if (savedText) {
  refs.textInput.value = savedText;
}

// --- Ініціалізація завдань ---
tasksModule.init();

// --- Обробник додавання завдання ---
refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const isSuccess = tasksModule.addTask(
    refs.titleInput.value,
    refs.textInput.value
  );

  // Очищаємо форму та localStorage тільки якщо завдання було успішно додано
  if (isSuccess) {
    refs.form.reset();
    localStorage.removeItem(FORM_INPUT_TITLE_KEY);
    localStorage.removeItem(FORM_INPUT_TEXT_KEY);
    refs.titleInput.focus();
  }
});

// --- Збереження значень полів форми під час введення ---
refs.titleInput.addEventListener('input', event => {
  storageAPI.save(FORM_INPUT_TITLE_KEY, event.target.value);
});

refs.textInput.addEventListener('input', event => {
  storageAPI.save(FORM_INPUT_TEXT_KEY, event.target.value);
});

// --- Обробник видалення завдання (делегування подій) ---
refs.taskList.addEventListener('click', event => {
  if (event.target.classList.contains('btn-delete')) {
    const taskId = Number(event.target.dataset.id);
    tasksModule.deleteTask(taskId);
  }
});

// --- Обробник перемикання теми ---
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
