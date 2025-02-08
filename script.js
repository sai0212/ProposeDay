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

  if (maze[newX][newY] !== 'wall' && maze[newX][newY] !== 'obsta
