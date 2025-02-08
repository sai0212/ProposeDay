const gridElement = document.getElementById('grid');
const messageElement = document.getElementById('message');
const totalHearts = 12; // Total number of hearts in the grid
let revealedHearts = 0; // To track how many hearts have been revealed

// Generate hearts
function generateHearts() {
  for (let i = 0; i < totalHearts; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = '❤️';
    
    // Add event listener to each heart
    heart.addEventListener('click', () => revealHeart(heart));
    
    gridElement.appendChild(heart);
  }
}

// Reveal heart and check for game completion
function revealHeart(heart) {
  if (!heart.classList.contains('revealed')) {
    heart.classList.add('revealed');
    revealedHearts++;

    // Add burst animation
    heart.classList.add('burst');
  }

  // If all hearts are revealed, show the message
  if (revealedHearts === totalHearts) {
    messageElement.classList.remove('hidden');
  }
}

// Start the game
generateHearts();
