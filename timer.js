document.addEventListener("DOMContentLoaded", () => {
  const timerList = document.getElementById("timerList");
  const addTimerBtn = document.getElementById("addTimerBtn");
  const defaultTimeInput = document.getElementById("defaultTime");

  addTimerBtn.addEventListener("click", addTimer);

  function createTimerComponent(defaultTime) {
    const timerComponent = document.createElement("div");
    timerComponent.innerHTML = `
            <input type="text" placeholder="Timer Title" class="timer-title"/>
            <input type="text" value="${defaultTime}" class="timer-value"/>
            <button class="start-pause-btn">Start</button>
            <button class="reset-btn">🔄</button>
            <button class="remove-btn">Remove</button>
        `;
    timerList.appendChild(timerComponent);
    return timerComponent;
  }

  function addTimer() {
    const defaultTime = defaultTimeInput.value;
    const timerComponent = createTimerComponent(defaultTime);
    setupTimerControls(timerComponent, defaultTime);
  }

  function setupTimerControls(timerComponent, defaultTime) {
    const startPauseBtn = timerComponent.querySelector(".start-pause-btn");
    const resetBtn = timerComponent.querySelector(".reset-btn");
    const removeBtn = timerComponent.querySelector(".remove-btn");
    const timerValue = timerComponent.querySelector(".timer-value");
    let intervalId = null;

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
          timerComponent.style.backgroundColor = "orange"; // Change background color
          playSound(); // Play sound
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

    function resetTimer() {
      clearInterval(intervalId);
      intervalId = null;
      timerValue.value = defaultTime;
      timerComponent.style.backgroundColor = ""; // Reset background color
      startPauseBtn.textContent = "Start";
    }

    startPauseBtn.addEventListener("click", toggleTimer);
    resetBtn.addEventListener("click", resetTimer);

    removeBtn.addEventListener("click", () => {
      clearInterval(intervalId);
      timerComponent.remove();
    });
  }

  function playSound() {
    const audio = new Audio("complete.mp3"); // Specify the path to your sound file
    audio.play();
  }
});
