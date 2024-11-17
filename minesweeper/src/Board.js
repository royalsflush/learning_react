function calculateBombPosition(board_size, bomb_count) {
  const bomb_pos = [];
  while (bomb_pos.length < bomb_count) {
    let x = Math.floor(Math.random() * board_size * board_size)
    if (bomb_pos.indexOf(x) === -1) bomb_pos.push(x)
  }

  return bomb_pos;
}

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

export const initialiseBoard = (board_size, bomb_count) => {
  const board = Array(board_size);
  const bomb_pos = calculateBombPosition(board_size, bomb_count);


  for (let i=0; i<board_size; i++) {
    board[i] = Array(board_size);

    for (let j=0; j<board_size; j++)
      board[i][j] = {
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
    board[x][y].content = 'B'
  }

  for (let i=0; i<board_size; i++) {
    for (let j=0; j<board_size; j++) {
      if (board[i][j].content === 'B') continue;
      const bomb_count = countAdjacentBombs(board, i, j);
      board[i][j].content = bomb_count === 0? '' : bomb_count; 
    }
  }

  return board;
}

function Board(props) {
  const [board, setBoard] = [props.board, props.setBoard];

  function handleClick(e, x, y) {
    let newBoard = board.slice();
    if (e.type === 'click') {
      newBoard[x][y].clicked = true;
    } else if (e.type === 'contextmenu') {
      e.preventDefault();
      newBoard[x][y].flagged = !board[x][y].flagged;
    }
    setBoard(newBoard);
  }

  return (
    <table>
      <tr>
        <th colSpan={board.length}>Minesweeper</th>
      </tr>
      {board.map(row => {
        return (
          <tr>
          {row.map(cell => {
            return <td
                onClick={(e) => handleClick(e, cell.x, cell.y)}
                onContextMenu={(e) => handleClick(e, cell.x, cell.y)}
                className={cell.clicked? "clicked" : ""}
              >
              {cell.clicked? cell.content : cell.flagged? 'F' : ''}
              </td>
          })}
          </tr>
        );
      })}
    </table>
  );
}

export default Board;
