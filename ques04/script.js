const API_BASE = 'https://mockapi.io/tasks'; // Replace with your actual API URL
const taskList = document.getElementById('taskList');
const modal = document.getElementById('editModal');
const editTitle = document.getElementById('editTitle');
const editStatus = document.getElementById('editStatus');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');

let currentTaskId = null;

// Load tasks (GET)
async function loadTasks() {
  taskList.innerHTML = '<li>Loading tasks...</li>';
  try {
    const res = await fetch(API_BASE);
    const tasks = await res.json();
    taskList.innerHTML = '';

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${task.title} — <strong>${task.status}</strong></span>
        <button onclick="editTask('${task.id}', '${task.title}', '${task.status}')">Edit</button>
        <button onclick="deleteTask('${task.id}')">Delete</button>
      `;
      taskList.appendChild(li);
    });
  } catch (err) {
    taskList.innerHTML = '<li>Error loading tasks</li>';
    console.error(err);
  }
}

// Edit task (open modal)
function editTask(id, title, status) {
  currentTaskId = id;
  editTitle.value = title;
  editStatus.value = status;
  modal.classList.remove('hidden');
}

// Save edits (PATCH/PUT)
saveBtn.addEventListener('click', async () => {
  const updatedTask = {
    title: editTitle.value,
    status: editStatus.value,
  };

  try {
    const res = await fetch(`${API_BASE}/${currentTaskId}`, {
      method: 'PATCH', // or 'PUT'
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });

    if (!res.ok) throw new Error('Failed to update task');
    modal.classList.add('hidden');
    await loadTasks();
  } catch (err) {
    alert('Error updating task.');
    console.error(err);
  }
});

// Cancel edit
cancelBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Delete task
async function deleteTask(id) {
  const confirmDelete = confirm('Are you sure you want to delete this task?');
  if (!confirmDelete) return;

  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) throw new Error('Failed to delete task');
    await loadTasks();
  } catch (err) {
    alert('Error deleting task.');
    console.error(err);
  }
}

// Initial load
loadTasks();
