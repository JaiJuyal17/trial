// Questions Data (you can modify or extend it)
const questions = [
    { level: 1, question: "What is 2 + 2?", answer: "4" },
    { level: 2, question: "What is the capital of France?", answer: "Paris" },
    { level: 3, question: "What is the largest planet in our solar system?", answer: "Jupiter" },
    { level: 4, question: "What is the chemical symbol for water?", answer: "H2O" },
    { level: 5, question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee" }
  ];
  
  // Get user data from localStorage
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  // If user is not logged in, redirect to registration page
  if (!currentUser || !currentUser.name) {
    window.location.href = 'register.html';
  }
  
  // Display welcome message
  const welcomeMessage = document.getElementById('welcome-message');
  welcomeMessage.textContent = `Welcome, ${currentUser.name}! Level: ${currentUser.level}, Points: ${currentUser.points}`;
  
  // Leaderboard
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  
  // DOM Elements
  const questionElement = document.getElementById('question');
  const answerElement = document.getElementById('answer');
  const submitBtn = document.getElementById('submit-btn');
  const feedbackElement = document.getElementById('feedback');
  const leaderboardElement = document.getElementById('leaderboard-list');
  
  // Load question
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
  
  // Submit answer
  submitBtn.addEventListener('click', () => {
    const userAnswer = answerElement.value.trim();
    const currentQuestion = questions.find(q => q.level === currentUser.level);
  
    if (currentQuestion && userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      // Correct answer
      currentUser.points += 10;
      currentUser.level += 1;
      feedbackElement.textContent = 'Correct! +10 points!';
      feedbackElement.classList.remove('hidden');
      updateLeaderboard();
      loadQuestion();
    } else {
      // Wrong answer
      feedbackElement.textContent = 'Incorrect. Try again!';
      feedbackElement.classList.remove('hidden');
    }
  });
  
  // Update leaderboard
  function updateLeaderboard() {
    // Check if user exists in leaderboard
    const userIndex = leaderboard.findIndex(user => user.name === currentUser.name);
    if (userIndex >= 0) {
      leaderboard[userIndex] = currentUser;
    } else {
      leaderboard.push(currentUser);
    }
  
    // Sort leaderboard by points
    leaderboard.sort((a, b) => b.points - a.points);
  
    // Save to localStorage
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
    // Render leaderboard
    renderLeaderboard();
  }
  
  // Render leaderboard
  function renderLeaderboard() {
    leaderboardElement.innerHTML = '';
    leaderboard.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.name}: ${user.points} points`;
      leaderboardElement.appendChild(li);
    });
  }
  
  // Load initial data
  loadQuestion();
  renderLeaderboard();
  