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
