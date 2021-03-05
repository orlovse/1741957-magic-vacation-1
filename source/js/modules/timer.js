export const animateTimer = (duration, timerElementSec, timerElementMin) => {
  const MS_PER_SEC = 1000;
  const SEC_PER_MINUTE = 60;
  const MINUTES_PER_HOUR = 60;
  const endTime = Date.now() + duration;

  function formatTime(time) {
    return ("0" + Math.floor(time)).slice(-2);
  }

  let memoMinutes;

  const calcTime = () => {
    const remainingTime = endTime - Date.now();
    const seconds = formatTime((remainingTime / MS_PER_SEC) % SEC_PER_MINUTE);
    const minutes = formatTime(
      (remainingTime / MS_PER_SEC / SEC_PER_MINUTE) % MINUTES_PER_HOUR
    );

    if (minutes !== memoMinutes) {
      timerElementMin.innerHTML = minutes;
      memoMinutes = minutes;
    }
    timerElementSec.innerHTML = seconds;

    if (remainingTime >= MS_PER_SEC) {
      requestAnimationFrame(calcTime);
    }
  };

  requestAnimationFrame(calcTime);
};
