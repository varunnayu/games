const cardContainer = document.getElementById('cardContainer');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartBtn');
const rewardMessage = document.getElementById('rewardMessage');

let cardSymbols = ['😅', '🫀', '🫰🏻', '🐶', '🍉', '🏏', '🚔', '💔'];
cardSymbols = [...cardSymbols, ...cardSymbols]; // Duplicate the symbols for pairs
let shuffledCards = [];
let flippedCards = [];
let matchedPairs = 0;

restartButton.addEventListener('click', restartGame);

function startGame() {
  shuffledCards = shuffleArray(cardSymbols);
  createCards(shuffledCards);
  message.textContent = "Try to match all the pairs!";
  rewardMessage.textContent = ''; // Clear reward message
}

function shuffleArray(array) {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createCards(cards) {
  cardContainer.innerHTML = ''; // Clear any previous cards
  cardContainer.classList.remove('animate'); // Remove animation class to reset

  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-symbol', symbol);
    card.setAttribute('data-index', index);
    card.addEventListener('click', flipCard);
    cardContainer.appendChild(card);
  });

  setTimeout(() => cardContainer.classList.add('animate'), 100); // Add animation to cards
}

function flipCard(event) {
  const card = event.target;

  if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    card.textContent = card.getAttribute('data-symbol');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.getAttribute('data-symbol') === card2.getAttribute('data-symbol')) {
    matchedPairs++;
    message.textContent = `Matched pairs: ${matchedPairs}`;
    flippedCards = [];

    if (matchedPairs === cardSymbols.length / 2) {
      message.textContent = "You won! All pairs matched!";
      rewardMessage.textContent = "Congratulations! 🎉";
      restartButton.style.display = 'block';
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      flippedCards = [];
    }, 1000);
  }
}

function restartGame() {
  matchedPairs = 0;
  flippedCards = [];
  restartButton.style.display = 'none';
  startGame();
}

startGame(); // Start the game when the page loads
