let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    taskList.innerHTML += `
      <tr>
        <td>${task.title}</td>
        <td>${task.desc}</td>
        <td>
          <button class="edit" onclick="editTask(${index})">Editar</button>
          <button class="delete" onclick="deleteTask(${index})">Eliminar</button>
        </td>
      </tr>`;
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('task-id').value;
  const title = document.getElementById('task-title').value;
  const desc = document.getElementById('task-desc').value;

  if (id === '') {
    tasks.push({ title, desc });
  } else {
    tasks[id] = { title, desc };
    document.getElementById('task-id').value = '';
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  form.reset();
  renderTasks();
});

renderTasks();
function editTask(index) {
  document.getElementById('task-id').value = index;
  document.getElementById('task-title').value = tasks[index].title;
  document.getElementById('task-desc').value = tasks[index].desc;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}