const choices = document.querySelectorAll('.choice');
const playerImage = document.getElementById('playerImage');
const computerImage = document.getElementById('computerImage');
const outcomeMessage = document.getElementById('outcomeMessage');
const restartBtn = document.getElementById('restartBtn');

const images = {
  stone: 'images/stone.png.jpg',
  paper: 'images/paper.png.jpg',
  scissors: 'images/s.png.jpg',
};

const outcomes = {
  win: 'You Win! 🎉',
  lose: 'You Lose! 😢',
  draw: "It's a Draw! 🤝",
};

// Randomly select computer's choice
function getComputerChoice() {
  const choices = ['stone', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Determine game result
function determineOutcome(player, computer) {
  if (player === computer) return 'draw';
  if (
    (player === 'stone' && computer === 'scissors') ||
    (player === 'paper' && computer === 'stone') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'win';
  }
  return 'lose';
}

// Handle player's choice
choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    const playerChoice = e.currentTarget.dataset.choice;
    const computerChoice = getComputerChoice();

    // Set images
    playerImage.src = images[playerChoice];
    computerImage.src = images[computerChoice];

    // Determine outcome
    const result = determineOutcome(playerChoice, computerChoice);
    outcomeMessage.textContent = outcomes[result];

    // Show restart button
    restartBtn.style.display = 'block';
  });
});

// Restart game
restartBtn.addEventListener('click', () => {
  playerImage.src = '';
  computerImage.src = '';
  outcomeMessage.textContent = '';
  restartBtn.style.display = 'none';
});
