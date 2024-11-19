
// private
function calculateBombPosition(board_size, bomb_count) {
    const bomb_pos = [];
    while (bomb_pos.length < bomb_count) {
      let x = Math.floor(Math.random() * board_size * board_size)
      if (bomb_pos.indexOf(x) === -1) bomb_pos.push(x)
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
function initialiseBoard(board_size, bomb_count) {
    let newBoard = new Array(board_size);
    const bomb_pos = calculateBombPosition(board_size, bomb_count);
  
    for (let i=0; i<board_size; i++) {
      newBoard[i] = new Array(board_size);
  
      for (let j=0; j<board_size; j++)
        newBoard[i][j] = {
          x: i,
          y: j,
          content: '',
          clicked: false,
          flagged: false
        }
    }
  
    for (let i=0; i<bomb_pos.length; i++) {
      let x = Math.floor(bomb_pos[i]/board_size);
      let y = bomb_pos[i]%board_size;
      newBoard[x][y].content = 'B'
    }
  
    for (let i=0; i<board_size; i++) {
      for (let j=0; j<board_size; j++) {
        if (newBoard[i][j].content === 'B') continue;
        const bomb_count = countAdjacentBombs(newBoard, i, j);
        newBoard[i][j].content = bomb_count === 0? '' : bomb_count; 
      }
    }
  
    return newBoard;
}

function countRemainingBombs(board) {
  return board.flat().filter(cell => cell.content === 'B' && !cell.flagged).length;
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

export { initialiseBoard, countRemainingBombs, checkWin  };
