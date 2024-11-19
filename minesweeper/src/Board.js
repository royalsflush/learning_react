function Board(props) {
  const board = props.board;
  const boardParams = props.boardParams;
  const bomb = require('./assets/bomb.png');
  const flag = require('./assets/flag.png');

  function handleClick(e, x, y) {
    if (board[x][y].clicked) return;

    if (e.type === 'click') {
      props.onClick(x,y);
    } else if (e.type === 'contextmenu') {
      e.preventDefault();
      props.onFlag(x,y);
    }
  }

  function getCellClass(cell) {
    if (cell.clicked) return 'clicked';
    return 'blank';
  }

  function getCellContent(cell) {
    if (cell.clicked) {
      if (cell.content === 'B')
        return <img src={bomb} alt="bomb" width="16px" height="24px"/>;
      return cell.content;
    }
    if (cell.flagged) {
      return <img src={flag} alt="flag" width="16px" height="24px"/>;
    }
    return '';
  }

  return (
    <div className="board">
    <table>
      <tbody>
        <tr>
          <th colSpan={boardParams.width}>Minesweeper</th>
        </tr>
        <tr>
          <td colSpan={boardParams.width}>{props.children}</td>
        </tr>
        {board.map((row, rowIndex) => {
          return (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => {
                return <td className={getCellClass(cell)}
                    key={`cell-${cell.x}-${cell.y}`}
                    onClick={(e) => handleClick(e, cell.x, cell.y)}
                    onContextMenu={(e) => handleClick(e, cell.x, cell.y)}
                  >
                  {getCellContent(cell)}
                  </td>
              })}
            </tr>
          );
        })}
      </tbody>
      </table>
    </div>
  );
}

export default Board;
