function Board(props) {
  const board = props.board;

  function handleClick(e, x, y) {
    if (board[x][y].clicked) return;

    if (e.type === 'click') {
      props.onClick(x,y);
    } else if (e.type === 'contextmenu') {
      e.preventDefault();
      props.onFlag(x,y);
    }
  }

  return (
    <table>
      <tbody>
        <tr>
          <th colSpan={board.length}>Minesweeper</th>
        </tr>
        <tr>
          <td colSpan={board.length}>{props.children}</td>
        </tr>
        {board.map((row, rowIndex) => {
          return (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => {
                return <td
                    key={`cell-${cell.x}-${cell.y}`}
                    onClick={(e) => handleClick(e, cell.x, cell.y)}
                    onContextMenu={(e) => handleClick(e, cell.x, cell.y)}
                    className={cell.clicked? "clicked" : "blank"}
                  >
                  {cell.clicked? cell.content : cell.flagged? 'F' : ''}
                  </td>
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Board;
