const relationshipStart = new Date("2025-05-24T00:00:00");

const faviconEl = document.getElementById("favicon");
let heartToggle = false;

function updateFavicon() {
  const heart = heartToggle ? "💚" : "💙";
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='80'>${heart}</text></svg>`;
  faviconEl.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  heartToggle = !heartToggle;
}

setInterval(updateFavicon, 1500);

const daysEl = document.getElementById("dias");
const hoursEl = document.getElementById("horas");
const minutesEl = document.getElementById("minutos");
const secondsEl = document.getElementById("segundos");

function updateCounter() {
  const now = new Date();
  const diffMs = Math.max(now - relationshipStart, 0);

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = String(days).padStart(3, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCounter();
setInterval(updateCounter, 1000);

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((element) => observer.observe(element));

const bgMusic = document.getElementById("bgMusic");
const playPauseBtn = document.getElementById("playPauseBtn");
const lyricsToggle = document.getElementById("lyricsToggle");
const lyricsPanel = document.getElementById("lyricsPanel");
const floatingPlayer = document.getElementById("floatingPlayer");
const seekBar = document.getElementById("seekBar");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");

function formatTime(seconds) {
  const totalSeconds = Math.max(Math.floor(seconds), 0);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

if (bgMusic) {

  const tryPlayMusic = () => {
    bgMusic.play().catch(() => {});
  };

  tryPlayMusic();

  const startOnFirstInteraction = () => {
    tryPlayMusic();
    window.removeEventListener("click", startOnFirstInteraction);
    window.removeEventListener("touchstart", startOnFirstInteraction);
    window.removeEventListener("keydown", startOnFirstInteraction);
  };

  window.addEventListener("click", startOnFirstInteraction, { once: true });
  window.addEventListener("touchstart", startOnFirstInteraction, { once: true });
  window.addEventListener("keydown", startOnFirstInteraction, { once: true });

  bgMusic.addEventListener("loadedmetadata", () => {
    if (totalTimeEl) {
      totalTimeEl.textContent = formatTime(bgMusic.duration);
    }
  });

  bgMusic.addEventListener("timeupdate", () => {
    if (currentTimeEl) {
      currentTimeEl.textContent = formatTime(bgMusic.currentTime);
    }

    if (seekBar && bgMusic.duration) {
      seekBar.value = String((bgMusic.currentTime / bgMusic.duration) * 100);
    }
  });

  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", async () => {
      if (bgMusic.paused) {
        await bgMusic.play().catch(() => {});
        playPauseBtn.textContent = "❚❚";
      } else {
        bgMusic.pause();
        playPauseBtn.textContent = "▶";
      }
    });
  }

  bgMusic.addEventListener("play", () => {
    if (playPauseBtn) {
      playPauseBtn.textContent = "❚❚";
    }
  });

  bgMusic.addEventListener("pause", () => {
    if (playPauseBtn) {
      playPauseBtn.textContent = "▶";
    }
  });

  if (seekBar) {
    seekBar.addEventListener("input", () => {
      if (bgMusic.duration) {
        bgMusic.currentTime = (Number(seekBar.value) / 100) * bgMusic.duration;
      }
    });
  }

  if (lyricsToggle && lyricsPanel && floatingPlayer) {
    lyricsToggle.addEventListener("click", () => {
      const isExpanded = lyricsPanel.classList.toggle("show");
      lyricsToggle.classList.toggle("active", isExpanded);
      floatingPlayer.classList.toggle("expanded", isExpanded);
    });
  }
}