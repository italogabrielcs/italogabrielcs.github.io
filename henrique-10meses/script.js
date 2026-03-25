const revealItems = document.querySelectorAll('.reveal');
const daysCounter = document.querySelector('#daysCounter');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 120}ms`;
  observer.observe(item);
});

// Define a data de inicio para calcular os dias de namoro.
const datingStartDate = new Date('2025-05-24T00:00:00');
const now = new Date();
const diffInMs = now - datingStartDate;
const totalDays = Math.max(0, Math.floor(diffInMs / (1000 * 60 * 60 * 24)));

if (daysCounter) {
  daysCounter.textContent = String(totalDays);
}

const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!isReducedMotion) {
  let rafId = null;

  window.addEventListener('pointermove', (event) => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }

    rafId = requestAnimationFrame(() => {
      const x = ((event.clientX / window.innerWidth) - 0.5) * 28;
      const y = ((event.clientY / window.innerHeight) - 0.5) * 28;

      document.documentElement.style.setProperty('--mx', `${x.toFixed(2)}px`);
      document.documentElement.style.setProperty('--my', `${y.toFixed(2)}px`);
    });
  });
}

const silentVideos = document.querySelectorAll('.tile video');

silentVideos.forEach((video) => {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.addEventListener('loadeddata', () => {
    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {});
    }
  });
});

if ('IntersectionObserver' in window && silentVideos.length > 0) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          const playAttempt = video.play();
          if (playAttempt && typeof playAttempt.catch === 'function') {
            playAttempt.catch(() => {});
          }
        } else {
          video.pause();
        }
      });
    },
    {
      threshold: 0.35,
    }
  );

  silentVideos.forEach((video) => videoObserver.observe(video));
}

const faviconLink = document.querySelector('#dynamic-favicon');

if (faviconLink) {
  const blueHeartFavicon = "data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20viewBox%3D%270%200%2064%2064%27%3E%3Cpath%20fill%3D%27%231f79b8%27%20d%3D%27M32%2058C29.5%2055.9%2013%2042.8%206%2031.8C-1.1%2020.7%206.1%207%2019.4%207c5.1%200%209.9%202.4%2012.6%206.4C34.7%209.4%2039.5%207%2044.6%207C57.9%207%2065.1%2020.7%2058%2031.8C51%2042.8%2034.5%2055.9%2032%2058z%27/%3E%3C/svg%3E";
  const greenHeartFavicon = "data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20viewBox%3D%270%200%2064%2064%27%3E%3Cpath%20fill%3D%27%231f9d76%27%20d%3D%27M32%2058C29.5%2055.9%2013%2042.8%206%2031.8C-1.1%2020.7%206.1%207%2019.4%207c5.1%200%209.9%202.4%2012.6%206.4C34.7%209.4%2039.5%207%2044.6%207C57.9%207%2065.1%2020.7%2058%2031.8C51%2042.8%2034.5%2055.9%2032%2058z%27/%3E%3C/svg%3E";
  const faviconFrames = [blueHeartFavicon, greenHeartFavicon];
  let currentFaviconFrame = 0;

  setInterval(() => {
    currentFaviconFrame = (currentFaviconFrame + 1) % faviconFrames.length;
    faviconLink.href = faviconFrames[currentFaviconFrame];
  }, 900);
}
