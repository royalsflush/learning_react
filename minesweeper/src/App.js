import './App.css';

function Board() {
  const board_size = 10;
  const board = Array(board_size);
  
  for (let i=0; i<board_size; i++) {
    board[i] = Array(board_size);

    for (let j=0; j<board_size; j++)
      board[i][j] = '_';
  }

  return (
    <table>
      <tr>
        <th colspan={board_size}>Minesweeper</th>
      </tr>
      {board.map(row => {
        return (
          <tr>
          {row.map(cell => {
            return <td>{cell}</td>
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
