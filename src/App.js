import React, { useState, useEffect } from 'react';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState();
  const [playerObj, setPlayerObj] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState({})

  const getCurrentPlayer = async () => {
    const resp = await fetch('/api/getPlayers');
    const players = await resp.json();
    let currentPlayer = players.find(player => player.data.email === 'test@tester.com');
    setPlayerObj(currentPlayer);
    setCurrentPlayer(currentPlayer.data);
  }

  const updateHighScore = async () => {
    console.log(playerObj);
    fetch('/api/updatePlayer', {
      method: 'PATCH'/* ,
      body: JSON.stringify({
        playerObj, data: 
          { high_score: 1000 }
      }) */
    })
  }

  const handleClick = () => {
    setCurrentScore(currentScore + 1);
    updateHighScore()
  }

  useEffect(() => {
    getCurrentPlayer();
  }, [])

  return (
    <div>
      <p>High score: {currentPlayer.high_score}</p>
      <span>{currentScore}</span>
      <button className="incrementer" onClick={handleClick}>+</button>
      <br/>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </div>
  );
}

export default App;
