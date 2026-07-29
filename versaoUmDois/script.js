// ── FAVICON ANIMADO ──
(function () {
  const frames = ['💚', '💙', '💚💙', '💙💚'];
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d');
  const fav = document.getElementById('favicon');
  let i = 0;

  function draw(e) {
    x.clearRect(0, 0, 64, 64);
    x.font = '48px serif';
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.fillText(e, 32, 36);
    fav.href = c.toDataURL();
  }

  draw(frames[0]);
  setInterval(() => { i = (i + 1) % frames.length; draw(frames[i]); }, 1200);
})();

// ── PLAYER DE MÚSICA ──
(function () {
  const audio    = document.getElementById('audio');
  const playBtn  = document.getElementById('play-btn');
  const iconPlay = document.getElementById('icon-play');
  const iconPause= document.getElementById('icon-pause');
  const progress = document.getElementById('player-progress');
  const title    = document.querySelector('.player-title');

  // Tenta tocar automaticamente (pode ser bloqueado pelo browser)
  audio.volume = 0.5;
  const tryAutoplay = () => {
    audio.play().then(() => {
      iconPlay.style.display  = 'none';
      iconPause.style.display = '';
    }).catch(() => {});
  };
  document.addEventListener('click', tryAutoplay, { once: true });
  tryAutoplay();

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      iconPlay.style.display  = 'none';
      iconPause.style.display = '';
    } else {
      audio.pause();
      iconPlay.style.display  = '';
      iconPause.style.display = 'none';
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    progress.style.width = (audio.currentTime / audio.duration * 100) + '%';
  });

  // Mostra nome real do arquivo no player
  if (audio.src) {
    const name = decodeURIComponent(audio.src.split('/').pop());
    title.textContent = name;
  }
})();

// ── CONTADOR ──
const startDate = new Date(2025, 4, 24); // 24 de Maio de 2025

function updateCounter() {
  const diff = new Date() - startDate;
  document.getElementById('days').textContent    = Math.floor(diff / 86400000);
  document.getElementById('hours').textContent   = Math.floor((diff % 86400000) / 3600000);
  document.getElementById('minutes').textContent = Math.floor((diff % 3600000) / 60000);
  document.getElementById('seconds').textContent = Math.floor((diff % 60000) / 1000);
}
updateCounter();
setInterval(updateCounter, 1000);

// ── ANIMAÇÃO DE ENTRADA ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.track-content, .gallery-item, .tracklist li, .counter-item')
  .forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
    observer.observe(el);
  });

const s = document.createElement('style');
s.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(s);
