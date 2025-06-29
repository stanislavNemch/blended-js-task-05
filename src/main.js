import './css/main.css';
import './css/styles.css';

// Основний файл: ініціалізація та обробники подій
document.addEventListener('DOMContentLoaded', () => {
  // --- Ініціалізація теми ---
  const savedTheme = storageAPI.load(THEME_STORAGE_KEY);
  if (savedTheme === 'dark') {
    refs.body.classList.add('dark');
    refs.themeSwitcher.textContent = '🌙';
  } else {
    refs.themeSwitcher.textContent = '☀️';
  }

  // --- Ініціалізація завдань ---
  tasksModule.init();

  // --- Обробник додавання завдання ---
  refs.form.addEventListener('submit', event => {
    event.preventDefault();
    tasksModule.addTask(refs.titleInput.value, refs.textInput.value);
    refs.form.reset();
    refs.titleInput.focus();
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
      refs.themeSwitcher.textContent = '�';
    } else {
      storageAPI.save(THEME_STORAGE_KEY, 'light');
      refs.themeSwitcher.textContent = '☀️';
    }
  });
});
