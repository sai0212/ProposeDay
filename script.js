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

    // Add burst animation to heart
    heart.classList.add('burst');

    // Delay the removal of the heart after animation
    setTimeout(() => {
      heart.style.display = 'none'; // Hide heart after burst
    }, 600); // Match this delay with the burst animation duration (600ms)
  }

  // If all hearts are revealed and popped, show the message
  if (revealedHearts === totalHearts) {
    setTimeout(() => {
      messageElement.classList.remove('hidden');
      messageElement.style.opacity = 1;  // Fade in the message
    }, 700); // Delay message appearance slightly after all hearts are popped
  }
}

// Start the game
generateHearts();
