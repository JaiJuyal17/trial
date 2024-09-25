// DOM elements
const registerForm = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');

// Event listener for form submission
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the username input
  const username = document.getElementById('username').value.trim();

  // Validate username
  if (username === '') {
    errorMessage.textContent = 'Please enter a valid name.';
    errorMessage.classList.remove('hidden');
  } else {
    // Check if the username already exists
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userExists = users.some(user => user.name === username);

    if (userExists) {
      errorMessage.textContent = 'This name is already taken. Please choose another name.';
      errorMessage.classList.remove('hidden');
    } else {
      // Add the new user to localStorage with initial points and level
      users.push({ name: username, points: 0, level: 1 });
      localStorage.setItem('users', JSON.stringify(users));

      // Save the current session user in localStorage
      localStorage.setItem('currentUser', username);

      // Redirect to the quiz page
      window.location.href = 'index.html';
    }
  }
});
