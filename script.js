document.addEventListener("DOMContentLoaded", () => {
  const preview = document.getElementById("preview");
  const thumbs = document.querySelectorAll(".thumbnail");
  const toggleTimerButton = document.getElementById("toggle-timer");
  const refreshButton = document.getElementById("refresh-images");
  const progressBar = document.getElementById("progress-bar");

  let images = [];
  let currentIndex = 0;
  let timerId = null;

  const loadImages = () => {
    images = Array.from(
      { length: 4 },
      () => `https://loremflickr.com/660/440/nature?random=${Math.random()}`
    );
    updateThumbnails();
    updatePreview();
  };

  const updateThumbnails = () => {
    thumbs.forEach((thumb, index) => {
      thumb.src = images[index];
      thumb.addEventListener("click", () => handleUpdatePreview(index));
    });
  };

  const updatePreview = () => {
    preview.src = images[currentIndex];
  };

  const updateProgress = () => {
    progressBar.style.transition = "none";
    progressBar.style.width = "0";
    if (timerId) {
      setTimeout(() => {
        progressBar.style.transition = "width 3s linear";
        progressBar.style.width = "100%";
      }, 10);
    }
  };

  const stopTimer = () => {
    clearInterval(timerId);
    timerId = null;
    toggleTimerButton.textContent = "Play";
    updateProgress();
  };

  const startTimer = () => {
    if (timerId) return;

    timerId = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      updatePreview();
      updateProgress();
      if (currentIndex === 0) {
        loadImages();
      }
    }, 3000);

    toggleTimerButton.textContent = "Stop";
    updateProgress();
  };

  const resetTimer = () => {
    stopTimer();
    updateProgress();
    startTimer();
  };

  const handleUpdatePreview = (index) => {
    currentIndex = index;
    updatePreview();
    updateProgress();
    if (timerId) {
      resetTimer();
    }
  };

  const handleToggleTimerButton = () => {
    if (timerId) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const handleRefreshButton = () => {
    loadImages();
    handleUpdatePreview(0);
    if (!timerId) {
      updateProgress();
    }
  };

  toggleTimerButton.addEventListener("click", handleToggleTimerButton);
  refreshButton.addEventListener("click", handleRefreshButton);

  loadImages();
  startTimer();
});
