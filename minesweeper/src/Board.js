function Board(props) {
  const board = props.board;

  function handleClick(e, x, y) {
    if (e.type === 'click') {
      props.onClick(x,y);
    } else if (e.type === 'contextmenu') {
      e.preventDefault();
      props.onFlag(x,y);
    }
  }

  return (
    <table>
      <tr>
        <th colSpan={board.length}>Minesweeper</th>
      </tr>
      <tr>
        <td colSpan={board.length}>{props.children}</td>
      </tr>
      {board.map(row => {
        return (
          <tr>
          {row.map(cell => {
            return <td
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
    </table>
  );
}

export default Board;
