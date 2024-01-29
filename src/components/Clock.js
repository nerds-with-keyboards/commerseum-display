import React, { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const Clock = () => {
  const [isClockOn, setIsClockOn] = useLocalStorage("isClockOn", true);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const toggleClock = () => {
    const clockDisplay = document.getElementById("clock");

    setIsClockOn((prevIsClockOn) => !prevIsClockOn);

    if (clockDisplay) {
      if (isClockOn) {
        clockDisplay.style.display = "block";
        updateTime();
      } else {
        clockDisplay.style.display = "none";
      }
    }
  };

  const updateTime = () => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  };

  useEffect(
    () => {
      if (isClockOn) {
        updateTime();
      }
    },
    [isClockOn]
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        padding: "20px",
        fontSize: "30px",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {isClockOn && <h2 id="clock">{time}</h2>}
      <button
        onClick={toggleClock}
        style={{
          backgroundColor: "rgba(51, 51, 51, 0.05)",
          borderRadius: "8px",
          borderWidth: "0",
          color: "#333333",
          cursor: "pointer",
          fontSize: "10px",
          lineHeight: "15px",
          padding: "5px 12px",
        }}
      >
        {isClockOn ? "Turn Off Clock" : "Turn On Clock"}
      </button>
    </div>
  );
};

export default Clock;
