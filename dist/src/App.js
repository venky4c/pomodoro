//2 things I learnt:
// 1. About useState: using the arrow fn syntax to capture prevstate and set the present state correctly based on that.
// 2. UseRef hook helps us

import React, { useState, useRef } from "react";
import "./App.css";
function padTime(time) {
  return time.toString().padStart(2, "0");
}
function App() {
  const [title, setTitle] = useState("Let the Task Begin!");
  const [timeLeft, setTimeLeft] = useState(11);
  const intervalRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  //This fn teaches the power of useState hook.
  //To begin with, use setTimeLeft(timeLeft -1); we can see that the time comes down from 10 to 9 and stops there.
  // adding the line setTimeLeft(timeLeft => timeLeft-1), makes the counter work as expected to take prev time and decrement it.
  // After one second, the prev time is at 9 and then it decrements it to 8 and so on.
  function startTimer() {
    if (intervalRef.current !== null) return;
    setTitle(`You're doing Great!`);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;
        resetTimer();
        return 0;
      });
    }, 1000);

    console.log("startTimer:", intervalRef.current);
  }
  function stopTimer() {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle("Keep it Up!");
    setIsRunning(false);
    console.log("STOPTimer:", intervalRef.current);
  }
  function resetTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeLeft(11);
    setTitle("Wanna try another Round??");
    setIsRunning(false);
  }
  return (
    <div className="app">
      <h2>{title}</h2>
      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
export default App;

// import React, { useState, useRef } from "react";
// import "./App.css";

// function padTime(time) {
//   return time.toString().padStart(2, "0");
// }

// export default function App() {
//   const [timeLeft, setTimeLeft] = useState(120);
//   const [title, setTitle] = useState("Let the task begin!");
//   const [isRunning, setIsRunning] = useState(false);
//const intervalRef = useRef(null);
