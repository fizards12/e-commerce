import React, { useState, useEffect } from 'react';
const TimeBubble = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center">
        <div className="text-center">
          <p className="font-bold text-lg m-0">{value}</p>
          <p className="text-xs text-blue-600 m-0">{label}</p>
        </div>
      </div>
    </div>
  );
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    days: 5,
    minutes: 59,
    seconds: 35
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, days, minutes, seconds } = prevTime;
        
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
          if (minutes < 0) {
            minutes = 59;
            hours -= 1;
            if (hours < 0) {
              hours = 23;
              days -= 1;
              if (days < 0) {
                // Timer complete
                clearInterval(timer);
                return prevTime;
              }
            }
          }
        }
        
        return { hours, days, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-900 p-8 rounded-lg text-white">
      <h1 className="text-4xl font-bold mb-8">Enhance Your <br />Music Experience</h1>
      
      <div className="flex space-x-4 mb-8">
        <TimeBubble value={timeLeft.hours} label="Hours" />
        <TimeBubble value={timeLeft.days} label="Days" />
        <TimeBubble value={timeLeft.minutes} label="Minutes" />
        <TimeBubble value={timeLeft.seconds} label="Seconds" />
      </div>
      
      <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-md">
        Buy Now!
      </button>
    </div>
  );
};

export default CountdownTimer;