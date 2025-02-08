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

// Rendering the maze with text inside the cells
function renderMaze(maze) {
  mazeElement.innerHTML = ''; // Clear the previous maze
  maze.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      
      // Add different classes based on cell type
      if (cell === 'wall') {
        cellElement.classList.add('wall');
        cellElement.innerText = 'Wall';
      } else if (cell === 'player') {
        cellElement.classList.add('player');
        cellElement.innerText = 'Player';
  
