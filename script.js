// Questions Data (you can modify or extend it)
const questions = [
  { level: 1, question: "What is 2 + 2?", answer: "4" },
  { level: 2, question: "What is the capital of France?", answer: "Paris" },
  { level: 3, question: "What is the largest planet in our solar system?", answer: "Jupiter" },
  { level: 4, question: "What is the chemical symbol for water?", answer: "H2O" },
  { level: 5, question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee" }
];

// Get user data from localStorage
let currentUserName = localStorage.getItem('currentUser');
let users = JSON.parse(localStorage.getItem('users')) || [];

// Find the current user
let currentUser = users.find(user => user.name === currentUserName);

// If the user is not found, redirect to registration
if (!currentUser) {
  window.location.href = 'register.html';
}

// Display welcome message
const welcomeMessage = document.getElementById('welcome-message');
welcomeMessage.textContent = `Welcome, ${currentUser.name}! Level: ${currentUser.level}, Points: ${currentUser.points}`;

// DOM Elements
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const submitBtn = document.getElementById('submit-btn');
const feedbackElement = document.getElementById('feedback');
const leaderboardElement = document.getElementById('leaderboard-list');

// Load the current question based on the user's level
function loadQuestion() {
  const currentQuestion = questions.find(q => q.level === currentUser.level);
  if (currentQuestion) {
    questionElement.textContent = currentQuestion.question;
    answerElement.value = '';
    feedbackElement.classList.add('hidden');
  } else {
    questionElement.textContent = 'Congratulations! You completed the quiz!';
    answerElement.disabled = true;
    submitBtn.disabled = true;
  }
}

// Submit answer and update user points and level
submitBtn.addEventListener('click', () => {
  const userAnswer = answerElement.value.trim();
  const currentQuestion = questions.find(q => q.level === currentUser.level);

  if (currentQuestion && userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
    // Correct answer
    currentUser.points += 10;
    currentUser.level += 1;
    feedbackElement.textContent = 'Correct! +10 points!';
    feedbackElement.classList.remove('hidden');
    updateUser();
    loadQuestion();
  } else {
    // Wrong answer
    feedbackElement.textContent = 'Incorrect. Try again!';
    feedbackElement.classList.remove('hidden');
  }
});

// Update user data in localStorage
function updateUser() {
  // Update the current user data in the users array
  let updatedUsers = users.map(user => {
    if (user.name === currentUser.name) {
      return currentUser;
    }
    return user;
  });

  // Save updated users data in localStorage
  localStorage.setItem('users', JSON.stringify(updatedUsers));

  // Update leaderboard and reflect changes
  updateLeaderboard();
}

// Update leaderboard with all users
function updateLeaderboard() {
  // Sort users by points in descending order
  users.sort((a, b) => b.points - a.points);

  // Clear the leaderboard list and render the updated one
  leaderboardElement.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name}: ${user.points} points`;
    leaderboardElement.appendChild(li);
  });
}

// Load initial question and leaderboard
loadQuestion();
updateLeaderboard();
