import React, { useState, useEffect } from 'react';
import './App.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import increment from './images/increment.jpg';
import decrement from './images/decrement.jpg';
import audioFile from './images/tune.mp3';

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [buttonText, setButtonText] = useState('Start');

  const audio = new Audio(audioFile);

  const incrementTime = (type) => {
    switch (type) {
      case 'hours':
        setHours((prevHours) => (prevHours < 24 ? prevHours + 1 : prevHours));
        break;
      case 'minutes':
        setMinutes((prevMinutes) => (prevMinutes < 59 ? prevMinutes + 1 : prevMinutes));
        break;
      case 'seconds':
        setSeconds((prevSeconds) => (prevSeconds < 59 ? prevSeconds + 1 : prevSeconds));
        break;
      default:
        break;
    }
  };

  const decrementTime = (type) => {
    switch (type) {
      case 'hours':
        setHours((prevHours) => (prevHours > 0 ? prevHours - 1 : prevHours));
        break;
      case 'minutes':
        setMinutes((prevMinutes) => (prevMinutes > 0 ? prevMinutes - 1 : prevMinutes));
        break;
      case 'seconds':
        setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : prevSeconds));
        break;
      default:
        break;
    }
  };

  const startTimer = () => {
    if (!timerStarted) {
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      setRemainingTime(totalSeconds);
      setTimerStarted(true);
      setButtonText('Stop');
    } else {
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      setRemainingTime(0);
      setTimerStarted(false);
      setButtonText('Start');
    }
  };

  const playSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (!timerStarted) {
      playSound();
    }
  }, [timerStarted]);

  

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="value">00:00:00</div>;
    }

    const formattedHours = Math.floor(remainingTime / 3600);
    const formattedMinutes = Math.floor((remainingTime % 3600) / 60);
    const formattedSeconds = remainingTime % 60;

    return (
      <div className="timer">
        <div className="value">
          {formattedHours < 10 ? `0${formattedHours}` : formattedHours}:
          {formattedMinutes < 10 ? `0${formattedMinutes}` : formattedMinutes}:
          {formattedSeconds < 10 ? `0${formattedSeconds}` : formattedSeconds}
        </div>
      </div>
    );
  };

  return (
    <div className="countdown-container">
      <div className='circle_count_down'>
        <div className='outerCircle'>
          <div className="timer-wrapper">
            <CountdownCircleTimer
              isPlaying={timerStarted}
              duration={remainingTime}
              colors={"#FF6A6A"}
              colorsTime={[remainingTime, remainingTime * 0.66, remainingTime * 0.33, 0]}
              onComplete={() => {
                setTimerStarted(false);
                setButtonText('Start');
                return [true, 0];
              }}
  
              size={150}
              trailColor={"#191E39"}>
              {renderTime}
            </CountdownCircleTimer>
          </div>
        </div>
      </div>
      <div className='countdown-inputs'>
        <div className='time_spinner'>
          <div className='hours'>
            <p className='head'>Hours</p>
            <img src={increment} className='increment' onClick={() => incrementTime('hours')} alt="Increment Hours" />
            <p className='set'>{hours < 10 ? `0${hours}` : hours}</p>
            <img src={decrement} className='decrement' onClick={() => decrementTime('hours')} alt="Decrement Hours" />
          </div>
          <div className='colon'>:</div>
          <div className='hours'>
            <p className='head'>Minutes</p>
            <img src={increment} className='increment' onClick={() => incrementTime('minutes')} alt="Increment Minutes" />
            <p className='set'>{minutes < 10 ? `0${minutes}` : minutes}</p>
            <img src={decrement} className='decrement' onClick={() => decrementTime('minutes')} alt="Decrement Minutes" />
          </div>
          <div className='colon'>:</div>
          <div className='hours'>
            <p className='head'>Seconds</p>
            <img src={increment} className='increment' onClick={() => incrementTime('seconds')} alt="Increment Seconds" />
            <p className='set'>{seconds < 10 ? `0${seconds}` : seconds}</p>
            <img src={decrement} className='decrement' onClick={() => decrementTime('seconds')} alt="Decrement Seconds" />
          </div>
        </div>
        <button className='start' onClick={startTimer}>{buttonText}</button>
      </div>
    </div>
  );
};

export default CountdownTimer;
