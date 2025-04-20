const userList = document.getElementById('userList');
const form = document.getElementById('userForm');
const messageDiv = document.getElementById('formMessage');

const API_URL = 'https://mockapi.io/users'; // Replace with actual MockAPI URL

// Load all users (GET)
async function fetchUsers() {
  userList.innerHTML = '<li>Loading users...</li>';
  try {
    const response = await fetch(API_URL);
    const users = await response.json();

    userList.innerHTML = ''; // Clear before adding new items

    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.name} — ${user.email}`;
      userList.appendChild(li);
    });
  } catch (err) {
    userList.innerHTML = '<li>Failed to load users.</li>';
    console.error(err);
  }
}

// Add a new user (POST)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !email) {
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'Please fill in both fields.';
    return;
  }

  // Check for duplicate email
  const existingUsers = await fetch(API_URL).then(res => res.json());
  const duplicate = existingUsers.find(user => user.email === email);

  if (duplicate) {
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'Email already exists!';
    return;
  }

  messageDiv.style.color = '#555';
  messageDiv.textContent = 'Adding user...';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    if (!response.ok) throw new Error('Failed to add user.');

    const newUser = await response.json();

    messageDiv.style.color = 'green';
    messageDiv.textContent = `User "${newUser.name}" added successfully.`;

    form.reset();
    fetchUsers(); // Refresh user list
  } catch (err) {
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'Error adding user.';
    console.error(err);
  }
});

// Initial load
fetchUsers();
