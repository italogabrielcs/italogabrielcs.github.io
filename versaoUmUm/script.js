// ── FAVICON ANIMADO ──
(function () {
  const emojis = ['💚', '💙', '💚💙', '💙💚'];
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const favicon = document.getElementById('favicon');
  let i = 0;

  function draw(emoji) {
    ctx.clearRect(0, 0, 64, 64);
    ctx.font = emoji.length > 2 ? '28px serif' : '48px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 32, 36);
    favicon.href = canvas.toDataURL('image/png');
  }

  draw(emojis[0]);
  setInterval(() => { i = (i + 1) % emojis.length; draw(emojis[i]); }, 800);
})();

// ── TELA DE PINTURA ──
(function () {
  const canvas  = document.getElementById('paint-canvas');
  const ctx     = canvas.getContext('2d');
  let painting  = false;
  let tool      = 'brush';
  let color     = '#a8d8b9';
  let brushSize = 8;

  function resizeCanvas() {
    const wrapper = canvas.parentElement;
    const maxW = Math.min(wrapper.clientWidth - 260, 680);
    canvas.width  = Math.max(maxW, 300);
    canvas.height = Math.round(canvas.width * 0.65);
    ctx.fillStyle = '#f8fffe';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function getPos(e) {
    const r = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - r.left, y: src.clientY - r.top };
  }

  function startDraw(e) {
    e.preventDefault();
    painting = true;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function draw(e) {
    e.preventDefault();
    if (!painting) return;
    const { x, y } = getPos(e);
    ctx.lineWidth   = tool === 'eraser' ? brushSize * 3 : brushSize;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#f8fffe' : color;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function stopDraw() { painting = false; ctx.beginPath(); }

  canvas.addEventListener('mousedown',  startDraw);
  canvas.addEventListener('mousemove',  draw);
  canvas.addEventListener('mouseup',    stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove',  draw,      { passive: false });
  canvas.addEventListener('touchend',   stopDraw);

  // Paleta
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      color = btn.dataset.color;
      tool  = 'brush';
      document.getElementById('btn-brush').classList.add('active');
      document.getElementById('btn-eraser').classList.remove('active');
    });
  });

  // Tamanho
  const sizeInput = document.getElementById('brush-size');
  const sizeLabel = document.getElementById('brush-size-label');
  sizeInput.addEventListener('input', () => {
    brushSize = +sizeInput.value;
    sizeLabel.textContent = brushSize;
  });

  // Ferramentas
  document.getElementById('btn-brush').addEventListener('click', () => {
    tool = 'brush';
    document.getElementById('btn-brush').classList.add('active');
    document.getElementById('btn-eraser').classList.remove('active');
  });
  document.getElementById('btn-eraser').addEventListener('click', () => {
    tool = 'eraser';
    document.getElementById('btn-eraser').classList.add('active');
    document.getElementById('btn-brush').classList.remove('active');
  });

  // Limpar
  document.getElementById('btn-clear').addEventListener('click', () => {
    ctx.fillStyle = '#f8fffe';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  // Salvar
  document.getElementById('btn-download').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'desenho-1ano1mes-💚💙.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
})();
