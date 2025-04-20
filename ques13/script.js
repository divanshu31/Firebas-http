const dbUrl = 'https://demoproject-6dcc4-default-rtdb.firebaseio.com/users';

// ADD USER
document.getElementById('userForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  await fetch(`${dbUrl}.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  });

  document.getElementById('userForm').reset();
  loadUsers();
});

// LOAD USERS
async function loadUsers() {
  const res = await fetch(`${dbUrl}.json`);
  const data = await res.json();

  const table = document.getElementById('userTable');
  table.innerHTML = '<tr><th>Name</th><th>Email</th><th>Actions</th></tr>';

  for (const id in data) {
    const user = data[id];
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <button onclick="editUser('${id}', '${user.name}', '${user.email}')">Edit</button>
      </td>
    `;

    table.appendChild(row);
  }
}

// EDIT USER (SHOW FORM)
let currentEditId = null;

window.editUser = function (id, name, email) {
  currentEditId = id;
  document.getElementById('editName').value = name;
  document.getElementById('editEmail').value = email;
  document.getElementById('editSection').style.display = 'block';
};

// UPDATE USER (PATCH)
document.getElementById('editForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('editName').value.trim();
  const email = document.getElementById('editEmail').value.trim();

  await fetch(`${dbUrl}/${currentEditId}.json`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  });

  document.getElementById('editSection').style.display = 'none';
  loadUsers();
});

// INITIAL LOAD
loadUsers();
