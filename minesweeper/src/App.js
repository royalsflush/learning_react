import './App.css';

function Board() {
  const board_size = 10;
  const bomb_count = 30;
  const board = Array(board_size);
  
  const bomb_pos = [];

  for (let i=0; i<board_size; i++) {
    board[i] = Array(board_size);

    for (let j=0; j<board_size; j++)
      board[i][j] = {
        content: '_'
      }
  }

  while (bomb_pos.length < bomb_count) {
    let x = Math.floor(Math.random() * board_size * board_size)
    if (bomb_pos.indexOf(x) == -1) bomb_pos.push(x)
  }

  for (let i=0; i<bomb_count; i++) {
    let x = Math.floor(bomb_pos[i]/board_size);
    let y = bomb_pos[i]%board_size;
    board[x][y].content = 'B'
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
            return <td>{cell.content}</td>
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
