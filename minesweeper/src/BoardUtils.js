// private
function calculateBombPosition(width, height, bomb_count) {
    const total_cells = width * height;
    const bomb_pos = [];
    while (bomb_pos.length < bomb_count) {
        let pos = Math.floor(Math.random() * total_cells);
        if (bomb_pos.indexOf(pos) === -1) bomb_pos.push(pos);
    }
    return bomb_pos;
}

// private
function countAdjacentBombs(board, i, j) {
    const pos = [[-1, -1], [-1, 0], [-1, 1], [0, -1],
          [0, 1], [1, 0], [1, 1], [1, -1]];
  
    // This should be an assertion, but I think that's it's bad form to
    // fail so disruptively during a live application
    if (board.length <= i || board[i].length <= j) {
      console.log("Invalid coordinates passed to countAdjacentBombs");
      return 0;
    }   
  
    let cnt=0;
    for (let k=0; k<pos.length; k++) {
      const ni = i+pos[k][0];
      const nj = j+pos[k][1];
  
      if (ni<0 || ni>=board.length) continue;
      if (nj<0 || nj>=board[i].length) continue;
  
      if (board[ni][nj].content === 'B') cnt++;
    }
  
    return cnt;
}

// public
function initialiseBoard(width, height, bomb_count) {
    if (!width || !height || width < 1 || height < 1) return [];
    
    // First create the board
    let newBoard = new Array(height);
    for (let i = 0; i < height; i++) {
        newBoard[i] = new Array(width);
        for (let j = 0; j < width; j++) {
            newBoard[i][j] = {
                x: i,
                y: j,
                content: '',
                clicked: false,
                flagged: false
            }
        }
    }

    // Then place bombs
    const bomb_pos = calculateBombPosition(width, height, bomb_count);
    for (let pos of bomb_pos) {
        const x = Math.floor(pos / width);
        const y = pos % width; 
        newBoard[x][y].content = 'B';
    }

    // Then calculate the number of adjacent bombs for each cell and
    // add that to the cell's content.
    for (let i=0; i<height; i++) {
      for (let j=0; j<width; j++) {
        if (newBoard[i][j].content === 'B') continue;
        const bomb_count = countAdjacentBombs(newBoard, i, j);
        newBoard[i][j].content = bomb_count === 0? '' : bomb_count; 
      }
    }

    return newBoard;
}

function countRemainingBombs(board, bomb_count) {
  return bomb_count - board.flat().filter(cell => cell.flagged).length;
}

function checkWin(board) {
  for (let i=0; i<board.length; i++) {
    for (let j=0; j<board[i].length; j++) {
      if (board[i][j].content === 'B' && board[i][j].flagged === false)
        return false;
      if (board[i][j].flagged === true && board[i][j].content !== 'B')
        return false;
      if (board[i][j].content !== 'B' && board[i][j].clicked === false)
        return false;
    }
  }
  return true;
}

function splashBoard(newBoard, x, y) {
  const pos = [[1,0], [0,1], [-1, 0], [0,-1]];
  let queue = [[x,y]];

  while (queue.length > 0) {
    const cx = queue[0][0];
    const cy = queue[0][1];
    newBoard[cx][cy].clicked = true;
    queue.splice(0,1); // pop front.

    for (let i=0; i<pos.length; i++) {
      let nx = cx+pos[i][0];
      let ny = cy+pos[i][1];

      if (nx<0 || nx>=newBoard.length) continue;
      if (ny<0 || ny>=newBoard[nx].length) continue;
      if (newBoard[nx][ny].clicked) continue;
      if (newBoard[nx][ny].flagged) continue;

      if (newBoard[nx][ny].content === '') {
        newBoard[nx][ny].clicked = true;
        queue.push([nx,ny]);
      } else if (newBoard[nx][ny].content !== 'B') {
        newBoard[nx][ny].clicked = true;
      }
    }
  }

  return newBoard;
}

export { initialiseBoard, countRemainingBombs, checkWin, splashBoard };
