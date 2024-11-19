function ChooseDifficulty(props) {
    function setEasy() {
      props.setBoardParams({width: 10, height: 10, bombCount: 10});
    } 
  
    function setMedium() {
      props.setBoardParams({width: 15, height: 15, bombCount: 40});
    }
  
    function setHard() {
      props.setBoardParams({width: 20, height: 20, bombCount: 120});
    }

    function setExpert() {
        props.setBoardParams({width: 30, height: 20, bombCount: 200});
    }
  
    return (
      <div className="sidePanel">
        <div className="chooseDifficulty">
          Choose Difficulty:
          <button className="chooseDifficultyButton" onClick={setEasy}>Easy</button>
          <button className="chooseDifficultyButton" onClick={setMedium}>Medium</button>
          <button className="chooseDifficultyButton" onClick={setHard}>Hard</button>
          <button className="chooseDifficultyButton" onClick={setExpert}>Expert</button>
        </div>
        <table className="leaderboard">
          <tr>
            <th colSpan="2">Leaderboard</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </table>
      </div>
    );
  }

export default ChooseDifficulty;
