import React, { useState, useEffect } from "react";

const Clock = ({ showClock = true }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return showClock ? (
    <div className='clock-container'>
      <div className='clock-time'>{formatTime(time)}</div>
      <div className='clock-date'>{formatDate(time)}</div>
    </div>
  ) : null;
};

export default Clock;
