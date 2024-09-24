import { useState, useEffect } from "react";
import styles from "./Stopwatch.module.css";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    return (
      (hours < 10 ? "0" : "") +
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds
    );
  };

  const handleStart = () => setRunning(true);
  const handleStop = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    setTime(0);
  };

  return (
    <div className={styles.stopwatch} id="stopwatch">
      <div className={styles.display}>{formatTime(time)}</div>
      <div className={styles.controls}>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
