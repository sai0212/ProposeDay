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
      if (cell === 'powerup') cellElement.classList.add('powerup');
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

// Event listener for touch movement
document.addEventListener('touchstart', (event) => {
  const touchX = event.touches[0].clientX;
  const touchY = event.touches[0].clientY;

  if (touchX < window.innerWidth / 2) movePlayer('left');
  else movePlayer('right');
});
