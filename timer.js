document.addEventListener("DOMContentLoaded", () => {
  const timerList = document.getElementById("timerList");
  const addTimerBtn = document.getElementById("addTimerBtn");

  addTimerBtn.addEventListener("click", addTimer);

  function addTimer() {
    const timerId = `timer-${Date.now()}`;
    const timerComponent = document.createElement("div");
    timerComponent.setAttribute("id", timerId);
    timerComponent.innerHTML = `
            <input type="text" placeholder="Timer Title" class="timer-title"/>
            <input type="text" value="00:01:00" class="timer-value"/>
            <button class="start-pause-btn">Start</button>
            <button class="remove-btn">Remove</button>
        `;
    timerList.appendChild(timerComponent);

    const startPauseBtn = timerComponent.querySelector(".start-pause-btn");
    const removeBtn = timerComponent.querySelector(".remove-btn");
    const timerValue = timerComponent.querySelector(".timer-value");
    let intervalId = null;
    let wasRunningBeforeFocus = false; // Tracks if the timer was running before the timer value was focused

    function toggleTimer() {
      if (intervalId === null) {
        startTimer();
      } else {
        clearInterval(intervalId);
        intervalId = null;
        startPauseBtn.textContent = "Start";
      }
    }

    function startTimer() {
      let [hours, minutes, seconds] = timerValue.value.split(":").map(num => parseInt(num, 10));
      let totalSeconds = hours * 3600 + minutes * 60 + seconds;

      intervalId = setInterval(() => {
        if (totalSeconds <= 0) {
          clearInterval(intervalId);
          intervalId = null;
          startPauseBtn.textContent = "Start";
          return;
        }
        totalSeconds--;
        const hrs = Math.floor(totalSeconds / 3600)
          .toString()
          .padStart(2, "0");
        const mins = Math.floor((totalSeconds % 3600) / 60)
          .toString()
          .padStart(2, "0");
        const secs = (totalSeconds % 60).toString().padStart(2, "0");
        timerValue.value = `${hrs}:${mins}:${secs}`;
      }, 1000);

      startPauseBtn.textContent = "Pause";
    }

    startPauseBtn.addEventListener("click", toggleTimer);

    removeBtn.addEventListener("click", () => {
      clearInterval(intervalId);
      timerComponent.remove();
    });

    timerValue.addEventListener("focus", () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
        wasRunningBeforeFocus = true;
        startPauseBtn.textContent = "Start";
      } else {
        wasRunningBeforeFocus = false;
      }
    });

    timerValue.addEventListener("blur", () => {
      if (wasRunningBeforeFocus) {
        startTimer();
      }
    });
  }
});
