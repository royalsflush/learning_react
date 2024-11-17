import { useState } from 'react';
import Board from './Board.js';
import './App.css';

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

function initialiseBoard(board_size, bomb_count) {
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

const GAME_STATE = Object.freeze({
  ACTIVE: Symbol("active"),
  WIN:  Symbol("win"),
  LOSE: Symbol("lose")
});

function BombCounter(props) {
  return <div className="bombCounter">{props.bombCount}</div> 
}

function GameState(props) {
  function printState() {
    if (props.gameState === GAME_STATE.ACTIVE) {
      return "Go :)";
    } else if (props.gameState === GAME_STATE.WIN) {
      return "Yay safe :D";
    } else {
      return "Booom :(";
    }
  }

  return (
    <div>
      <button onClick={props.handleClick}>
        {printState()}
      </button>
    </div>
  );
}

function App() {
  const [boardSize, setBoardSize] = useState(10);
  const [bombCount, setBombCount] = useState(20);
  const [board, setBoard] = useState(initialiseBoard(boardSize, bombCount));
  const [gameState, setGameState] = useState(GAME_STATE.ACTIVE);

  function onBoardFlag(x, y) {
    let newBoard = board.slice();
    newBoard[x][y].flagged = !board[x][y].flagged;
   
    if (newBoard[x][y].flagged) {
      setBombCount(bombCount => bombCount - 1)
    } else {
      setBombCount(bombCount => bombCount + 1)
    }
    setBoard(newBoard);
  }

  function onBoardClick(x, y) {
    let newBoard = board.slice();

    if (board[x][y].content === 'B') {
      setGameState(GAME_STATE.LOSE);
    }

    newBoard[x][y].clicked = true;
    setBoard(newBoard);
  }

  function resetGame() {
    setGameState(GAME_STATE.ACTIVE);
    setBoard(initialiseBoard(boardSize, bombCount));
  }

  return (
    <div className="App">
      <Board
          board={board}
          onFlag={onBoardFlag}
          onClick={onBoardClick}>
        <BombCounter bombCount={bombCount} />
        <GameState gameState={gameState} handleClick={resetGame} />
      </Board>
    </div>
  );
}

export default App;
