const addBtn = document.getElementById('btn1');
const container = document.getElementById('input-container');
const delBtn = document.getElementById('btn2');
const toggleBtn = document.getElementById('lightDark');
const doneSelect = document.getElementById('mark-as-done');
const halfDoneSelect = document.getElementById('mark-as-half-done');

let selectedInput = null;
let darkMode = true; 


function applyTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  document.body.classList.toggle('light-mode', !isDark);
}

// Save all tasks to localStorage
function saveTasks() {
  const inputs = container.querySelectorAll('.task-input');
  const data = Array.from(inputs).map(input => ({
    text: input.value,
    status: input.classList.contains('done') ? 'done' :
            input.classList.contains('half-done') ? 'half-done' : ''
  }));
  localStorage.setItem('tasks', JSON.stringify(data));
}

// Load tasks from localStorage
function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (!saved) return;

  const data = JSON.parse(saved);
  data.forEach(task => createInput(task.text, task.status));
}

// Create and append a new input
function createInput(value = '', status = '') {
  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'task';
  input.placeholder = 'New Task';
  input.classList.add('task-input');
  input.value = value;

  if (status) input.classList.add(status);

  input.addEventListener('focus', () => {
    if (selectedInput) selectedInput.classList.remove('selected');
    selectedInput = input;
    input.classList.add('selected');
  });

  input.addEventListener('input', saveTasks);
  container.appendChild(input);
  saveTasks();
}


addBtn.addEventListener('click', () => {
  createInput();
});


delBtn.addEventListener('click', () => {
  if (selectedInput) {
    container.removeChild(selectedInput);
    selectedInput = null;
    saveTasks();
  }
});

toggleBtn.addEventListener('click', () => {
  darkMode = !darkMode;
  applyTheme(darkMode);
});


doneSelect.addEventListener('click', () => {
  if (selectedInput) {
    selectedInput.classList.remove('half-done');
    selectedInput.classList.add('done');
    saveTasks();
  }
});

halfDoneSelect.addEventListener('click', () => {
  if (selectedInput) {
    selectedInput.classList.remove('done');
    selectedInput.classList.add('half-done');
    saveTasks();
  }
});

applyTheme(darkMode);
loadTasks();
