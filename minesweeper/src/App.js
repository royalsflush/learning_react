import { useState } from 'react';
import Board, { initialiseBoard } from './Board.js';
import './App.css';

function App() {
  const [boardSize, setBoardSize] = useState(10);
  const [bombCount, setBombCount] = useState(20);
  const [board, setBoard] = useState(initialiseBoard(boardSize, bombCount));
  
  const board_params = {
    board_size: boardSize,
    bomb_count: bombCount,
  }
 
  return (
    <div className="App">
      <Board board={board} setBoard={setBoard} params={board_params} />          
    </div>
  );
}

export default App;
