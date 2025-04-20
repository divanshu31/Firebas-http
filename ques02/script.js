document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageDiv = document.getElementById('message');
  
    // Basic validation
    if (!name || !email || !password) {
      messageDiv.style.color = 'red';
      messageDiv.textContent = 'Please fill in all fields.';
      return;
    }
  
    const userData = { name, email, password };
    messageDiv.style.color = '#555';
    messageDiv.textContent = 'Registering...';
  
    try {
      const res = await fetch('https://mockapi.io/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
  
      if (!res.ok) {
        throw new Error('Registration failed. Please try again.');
      }
  
      const data = await res.json();
      messageDiv.style.color = 'green';
      messageDiv.textContent = `Registration successful! Welcome, ${data.name}.`;
      document.getElementById('registrationForm').reset();
    } catch (error) {
      messageDiv.style.color = 'red';
      messageDiv.textContent = error.message || 'Something went wrong.';
      console.error(error);
    }
  });
  