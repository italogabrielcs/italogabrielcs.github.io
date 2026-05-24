// ── FAVICON ANIMADO ──
(function () {
  const emojis = ['💙', '💚', '💙💚', '💚💙'];
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const favicon = document.getElementById('favicon');
  let i = 0;

  function drawFavicon(emoji) {
    ctx.clearRect(0, 0, 64, 64);
    ctx.font = emoji.length > 2 ? '28px serif' : '48px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 32, 36);
    favicon.href = canvas.toDataURL('image/png');
  }

  drawFavicon(emojis[0]);
  setInterval(() => { i = (i + 1) % emojis.length; drawFavicon(emojis[i]); }, 800);
})();

// ── CONTADOR DE TEMPO JUNTOS ──
// Altere a data abaixo para a data de início do namoro (AAAA, MM-1, DD)
const startDate = new Date(2025, 4, 24); // 24 de Maio de 2025

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent    = days;
  document.getElementById('hours').textContent   = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

updateCounter();
setInterval(updateCounter, 1000);

// ── ANIMAÇÃO DE ENTRADA NAS SEÇÕES ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline-item, .gallery-item, .message-box, .counter-item')
  .forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
  });

document.addEventListener('animationend', () => {}, { once: true });

// Adiciona classe visible via CSS
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
