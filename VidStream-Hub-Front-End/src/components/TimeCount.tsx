import React, { useState, useEffect } from "react";

const renderCountdownCard = (value: number, label: string) => {
  return (
    <div className="relative flex flex-row inset-0">
      <div className="float-left text-center">
        <div className="relative h-36 w-36 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center h-full">
            <h2 className="text-8xl font-bold text-red-500">
              {" "}
              {value < 10 ? `0${value}` : value}
            </h2>
          </div>
          <h4 className="mb-6 uppercase font-bold">{label}</h4>
        </div>
      </div>
    </div>
  );
};

const Countdown = ({ endDate }: { endDate: number }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Change this to your desired end date
      const now: number = new Date().getTime();
      const timeDiff = new Date(endDate).getTime() - now;

      if (timeDiff > 0) {
        const days = Math.floor((timeDiff / (1000 * 60 * 60 * 24)) % 365);
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-7 justify-center">
      {renderCountdownCard(countdown.days, "Days")}
      {renderCountdownCard(countdown.hours, "Hours")}
      {renderCountdownCard(countdown.minutes, "Minutes")}
      {renderCountdownCard(countdown.seconds, "Seconds")}
    </div>
  );
};

export default Countdown;
