import { useState, useRef, useEffect } from 'react';
import Board from './Board.js';
import { initialiseBoard, countRemainingBombs } from './BoardInit.js';
import GameState, { GAME_STATE } from './GameState.js';
import './App.css';

function BombCounter(props) {
  return <div className="tableUtils bombCounter">{props.bombCount}</div> 
}

function Timer(props) {
  return <div className="timer">{props.timer}</div>;
}

function App() {
  const [boardParams, setBoardParams] = useState({
    size: 10,
    bombCount: 2,
  });
  const [board, setBoard] = useState(initialiseBoard(boardParams.size, boardParams.bombCount));
  const [gameState, setGameState] = useState(GAME_STATE.NOT_STARTED);
  const [timer, setTimer] = useState(0);

  const gameStartSeconds = useRef(Math.floor(Date.now()/1000));
  const intervalCallback = useRef(null);

  useEffect(() => {
    console.log('Board updated:', board);
  }, [board]);

  function resetGame() {
    console.log("Game reset");
    
    // Clear the timer interval if it exists
    if (intervalCallback.current) {
      clearInterval(intervalCallback.current);
      intervalCallback.current = null;
    }

    // Create new board with fresh state
    const newBoard = initialiseBoard(boardParams.size, boardParams.bombCount);
    
    // Update all states at once
    setTimer(0);
    setGameState(GAME_STATE.NOT_STARTED);
    setBoard(newBoard);

    // For debugging
    console.log('New board created:', newBoard);
  }

  function startGame() {
    console.log("Game started");
    gameStartSeconds.current = Math.floor(Date.now()/1000);

    intervalCallback.current = setInterval(() => {
      let timeNow = Math.floor(Date.now()/1000);
      setTimer(Math.floor(timeNow - gameStartSeconds.current));
    }, 1000, [gameStartSeconds]);

    setGameState(GAME_STATE.ACTIVE);
  }

  function stopGame(newGameState) {
    console.log("Game ended");

    clearInterval(intervalCallback.current);
    setGameState(newGameState);
  }

  function checkWin() {
    for (let i=0; i<boardParams.size; i++) {
      for (let j=0; j<boardParams.size; j++) {
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

  function onBoardFlag(x, y) {
    let newBoard = board.slice();
    newBoard[x][y].flagged = !board[x][y].flagged;

    setBoard(newBoard);
    if (checkWin()) stopGame(GAME_STATE.WIN);
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

  function onBoardClick(x, y) {
    let newBoard = board.slice();

    if (gameState === GAME_STATE.NOT_STARTED) {
      startGame();
    } else if (gameState !== GAME_STATE.ACTIVE) {
      // Nothing should happen when you click a finish game
      return;
    }

    newBoard[x][y].clicked = true;
    if (board[x][y].content === 'B') {
      stopGame(GAME_STATE.LOSE);
    } else if (board[x][y].content === '') {
      newBoard = splashBoard(newBoard, x, y);
    }

    setBoard(newBoard);
    if (checkWin()) stopGame(GAME_STATE.WIN);
  }

  return (
    <div className="App">
      <Board
          board={board}
          onFlag={onBoardFlag}
          onClick={onBoardClick}>
        <BombCounter bombCount={countRemainingBombs(board)} />
        <GameState gameState={gameState} handleClick={resetGame} />
        <Timer gameState={gameState} timer={timer} setTimer={setTimer} />
      </Board>
    </div>
  );
}

export default App;