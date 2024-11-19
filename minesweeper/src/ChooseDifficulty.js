function ChooseDifficulty(props) {
    function setEasy() {
      props.setBoardParams({width: 10, height: 10, bombCount: 10});
    } 
  
    function setMedium() {
      props.setBoardParams({width: 15, height: 15, bombCount: 20});
    }
  
    function setHard() {
      props.setBoardParams({width: 20, height: 20, bombCount: 30});
    }
  
    return (
      <div className="chooseDifficulty">
        Choose Difficulty:
        <button className="chooseDifficultyButton" onClick={setEasy}>Easy</button>
        <button className="chooseDifficultyButton" onClick={setMedium}>Medium</button>
        <button className="chooseDifficultyButton" onClick={setHard}>Hard</button>
      </div>
    );
  }

export default ChooseDifficulty;
