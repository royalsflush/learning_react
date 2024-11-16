import './App.css';

function calculateBombPosition(board_size, bomb_count) {
  const bomb_pos = [];
  while (bomb_pos.length < bomb_count) {
    let x = Math.floor(Math.random() * board_size * board_size)
    if (bomb_pos.indexOf(x) == -1) bomb_pos.push(x)
  }

  return bomb_pos;
}

function initialiseBoard(board_size, bomb_pos) {
  const board = Array(board_size);

  for (let i=0; i<board_size; i++) {
    board[i] = Array(board_size);

    for (let j=0; j<board_size; j++)
      board[i][j] = {
        x: i,
        y: j,
        content: '_',
        hide: false
      }
  }

  for (let i=0; i<bomb_pos.length; i++) {
    let x = Math.floor(bomb_pos[i]/board_size);
    let y = bomb_pos[i]%board_size;
    board[x][y].content = 'B'
  }

  return board;
}

function Board() {
  const board_size = 10;
  const bomb_count = 30;
  const bomb_pos = calculateBombPosition(board_size, bomb_count);
  const board = initialiseBoard(board_size, bomb_pos);
  
  function handleClick(x, y) {
    board[x][y].hide = false;
  }

  return (
    <table>
      <tr>
        <th colSpan={board_size}>Minesweeper</th>
      </tr>
      {board.map(row => {
        return (
          <tr>
          {row.map(cell => {
            return <td onClick={() => handleClick(cell.x, cell.y)}>
              {cell.hide? '_' : cell.content}
              </td>
          })}
          </tr>
        );
      })}
    </table>
  );
}

function App() {
  return (
    <div className="App">
      <Board />          
    </div>
  );
}

export default App;
