const mazeElement = document.getElementById('maze');
const messageElement = document.getElementById('message');
const mazeSize = 10;
const player = { x: 0, y: 0 };

// Maze generation function
function createMaze() {
  let maze = Array.from({ length: mazeSize }, () => Array(mazeSize).fill('empty'));

  // Set walls (random obstacles)
  for (let i = 0; i < mazeSize; i++) {
    for (let j = 0; j < mazeSize; j++) {
      if (Math.random() < 0.2) maze[i][j] = 'wall';
      if (Math.random() < 0.1 && maze[i][j] !== 'wall') maze[i][j] = 'obstacle';
    }
  }

  maze[0][0] = 'player'; // Start position
  maze[mazeSize - 1][mazeSize - 1] = 'end'; // End position
  return maze;
}

// Rendering the maze
function renderMaze(maze) {
  mazeElement.innerHTML = ''; // Clear the previous maze
  maze.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      if (cell === 'wall') cellElement.classList.add('wall');
      if (cell === 'player') cellElement.classList.add('player');
      if (cell === 'obstacle') cellElement.classList.add('obstacle');
      if (cell === 'end') cellElement.classList.add('end');
      mazeElement.appendChild(cellElement);
    });
  });
}

// Handling player movement
function movePlayer(direction) {
  const maze = mazeData;
  let newX = player.x;
  let newY = player.y;

  if (direction === 'up' && player.x > 0) newX--;
  if (direction === 'down' && player.x < mazeSize - 1) newX++;
  if (direction === 'left' && player.y > 0) newY--;
  if (direction === 'right' && player.y < mazeSize - 1) newY++;

  if (maze[newX][newY] !== 'wall' && maze[newX][newY] !== 'obstacle') {
    player.x = newX;
    player.y = newY;
  }

  if (player.x === mazeSize - 1 && player.y === mazeSize - 1) {
    endGame();
  }

  renderMaze(maze);
}

// Ending the game
function endGame() {
  messageElement.classList.remove('hidden');
}

// Initializing the game
const mazeData = createMaze();
renderMaze(mazeData);

// Event listener for keyboard controls (arrow keys and WASD)
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' || event.key === 'w') {
    movePlayer('up');
  } else if (event.key === 'ArrowDown' || event.key === 's') {
    movePlayer('down');
  } else if (event.key === 'ArrowLeft' || event.key === 'a') {
    movePlayer('left');
  } else if (event.key === 'ArrowRight' || event.key === 'd') {
    movePlayer('right');
  }
});

// Handling swipe movement for touch
let touchStartX = 0;
let touchStartY = 0;

// Track the initial touch start position
document.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

// Detect swipe direction and move player
document.addEventListener('touchend', (event) => {
  const touchEndX = event.changedTouches[0].clientX;
  const touchEndY = event.changedTouches[0].clientY;

  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Horizontal swipe
    if (diffX > 0) {
      movePlayer('right');
    } else {
      movePlayer('left');
    }
  } else {
    // Vertical swipe
    if (diffY > 0) {
      movePlayer('down');
    } else {
      movePlayer('up');
    }
  }
});
