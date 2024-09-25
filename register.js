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
    // Save the username in localStorage
    localStorage.setItem('currentUser', JSON.stringify({ name: username, points: 0, level: 1 }));

    // Redirect to the quiz page
    window.location.href = 'index.html';
  }
});
