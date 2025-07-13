// Об'єкт для зберігання посилань на DOM-елементи
const refs = {
  form: document.getElementById('task-form'),
  titleInput: document.getElementById('task-title-input'),
  textInput: document.getElementById('task-text-input'),
  taskList: document.getElementById('task-list'),
  themeSwitcher: document.getElementById('theme-switcher'),
  body: document.body,
};

export default refs;
