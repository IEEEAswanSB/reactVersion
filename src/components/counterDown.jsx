import { useState,useEffect } from "react";
const Countdown = () => {
  const [countdownDate, setCountdownDate] = useState(new Date('9/24/2023').getTime());
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  let style = `
  
            .countdown-wrapper {

                width: 100%;
            display: flex;
            justify-content: center;
            margin: 0 -8px 0 -8px;
            margin-top: 15%;
            }

            .time-section {
            padding: 0px 8px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            color: #004B82 !important;
            }

            .time {
                margin: 0;
            font-size: 60px !important;
            font-weight: 800 !important;
            }

            .small {
                font-size: 18px !important;
            }
  
            @media screen and (max-width: 600px) {
                .countdown-wrapper {
                margin-top: 15%;
                }
                .time {
                    margin: 0 5%;
                font-size: 30px !important;
                font-weight: 800 !important;
                }
            }
              
  `

  useEffect(() => {
    setInterval(() => setNewTime(), 1000);
  }, []);

  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();

      const distanceToDate = countdownDate - currentTime;

      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      days = `${days}`;
      if (numbersToAddZeroTo.includes(hours)) {
        hours = `0${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }

      setState({ days: days, hours: hours, minutes, seconds });
    }
  };

  return (
    <div>
      <div className='countdown-wrapper'>
        <div className='time-section'>
          <div className='time'>{state.days || '0'}</div>
          <small className="time-text">Days</small>
        </div>
        <div className='time-section'>
          <div className='time'>:</div>
        </div>
        <div className='time-section'>
          <div className='time'>{state.hours || '00'}</div>
          <small className="time-text">Hours</small>
        </div>
        <div className='time-section'>
          <div className='time'>:</div>
        </div>
        <div className='time-section'>
          <div className='time'>{state.minutes || '00'}</div>
          <small className="time-text">Minutes</small>
        </div>
        <div className='time-section'>
          <div className='time'>:</div>
        </div>
        <div className='time-section'>
          <div className='time'>{state.seconds || '00'}</div>
          <small className="time-text">Seconds</small>
        </div>
        <style>{style}</style>
      </div>
    </div>
  );
};

export {Countdown}