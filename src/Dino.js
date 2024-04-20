import React, { useState, useEffect } from 'react';
import ChromeDinoGame from 'react-chrome-dino';
import './Dino.css';
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { FaCircleCheck } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

function Dino({ walletId }) {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highestScore, setHighestScore] = useState(0);
  const [show, setShow] = useState(false);
  const [startTime, setStartTime] = useState(null); // Initialize start time state

  // Set start time when component mounts
  useEffect(() => {
    setStartTime(new Date());
  }, []);


  const redirectTwitter = () => {
    if (gameOver) {
      window.location.href = 'https://twitter.com';
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setShow(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);



  async function handleReload(e) {
    e.preventDefault();

    try {
      const endTime = new Date();
      const durationMilliseconds = endTime.getTime() - startTime.getTime();
      const durationSeconds = durationMilliseconds / 1000;

      const response = await fetch('http://localhost:5000/score', {
        method: 'POST',
        body: JSON.stringify({ walletId, duration: durationSeconds }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Score submitted successfully');
      } else {
        console.error('Failed to submit score:', response.status);
      }
    } catch (error) {
      console.error('Error submitting score:', error.message);
    }

    // Redirect to Twitter page
    window.location.href = 'https://twitter.com';
  }




  return (
    <div className='dino' >
      <div className='game'>
        {!gameOver && <ChromeDinoGame />}
      </div>
      <div className='details'>
        <h1 style={{ fontWeight: '500' }}>No internet</h1>
        <div>
          <p className='p'>Try:</p>
        </div>
        <ul>
          <li>Checking the network cables, modem, and router</li>
          <li>Reconnecting to Wi-Fi</li>
          <li style={{ color: 'blue' }}><a>Running Windows Network Diagnostics</a></li>
        </ul>
        <div style={{ display: 'flex', gap: '20px' }}>
          <p className='err'>ERR_INTERNET_DISCONNECTED</p>
          <button className='btn1' onClick={handleReload}>Reload</button>
        </div>
      </div>
      <div className='details-mobile'>
        <div className='upper'>
          <h2 style={{ fontWeight: '500' }}>No internet</h2>
          <HiOutlineQuestionMarkCircle size={24} />
        </div>
        <div className='upper'>
          <p>Chrome will let you know when this page is ready<a className='link' href='https://twitter.com'>Reload</a></p>
          <FaCircleCheck size={44} />
        </div>
      </div>
      <div className='star' >
        {show && <GoDotFill size={24} />}
      </div>
    </div>
  );
}

export default Dino;
