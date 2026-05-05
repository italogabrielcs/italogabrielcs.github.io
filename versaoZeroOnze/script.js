// Contador de tempo juntos
function updateCounter() {
    const startDate = new Date(2025, 4, 24); // 24 de maio de 2025 (mês é 0-indexed)
    const now = new Date();
    
    const diff = now - startDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

document.addEventListener('DOMContentLoaded', function() {
    // Atualizar contador imediatamente e a cada segundo
    updateCounter();
    setInterval(updateCounter, 1000);
    
    const present = document.getElementById('present');
    const message = document.getElementById('message');

    present.addEventListener('click', function() {
        present.classList.add('open');
        message.style.display = 'block';

        // Lançar confetes
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    });

    const startGameBtn = document.getElementById('startGame');
    const gameArea = document.getElementById('gameArea');
    const gameScore = document.getElementById('game-score');
    const gameTimer = document.getElementById('game-timer');
    const gameOverlay = document.querySelector('.game-overlay');
    let score = 0;
    let timer = 20;
    let gameInterval = null;
    let countdownInterval = null;

    function randomPosition(max) {
        return Math.floor(Math.random() * max) + 10;
    }

    function createPacoca() {
        const pacoca = document.createElement('div');
        pacoca.className = 'pacoca';
        pacoca.textContent = '🥜';
        const areaRect = gameArea.getBoundingClientRect();

        const x = randomPosition(areaRect.width - 40);
        const y = randomPosition(areaRect.height - 40);
        pacoca.style.left = `${x}px`;
        pacoca.style.top = `${y}px`;

        pacoca.addEventListener('click', function() {
            score += 1;
            gameScore.textContent = score;
            pacoca.remove();
        });

        gameArea.appendChild(pacoca);

        setTimeout(() => {
            if (pacoca.parentNode) {
                pacoca.remove();
            }
        }, 1800);
    }

    function startGame() {
        if (gameInterval) return;

        score = 0;
        timer = 20;
        gameScore.textContent = score;
        gameTimer.textContent = timer;
        gameArea.querySelectorAll('.pacoca').forEach(el => el.remove());
        gameOverlay.textContent = 'Boa sorte!';

        gameInterval = setInterval(() => {
            createPacoca();
        }, 900);

        countdownInterval = setInterval(() => {
            timer -= 1;
            gameTimer.textContent = timer;
            if (timer <= 0) {
                clearInterval(gameInterval);
                clearInterval(countdownInterval);
                gameInterval = null;
                countdownInterval = null;
                gameOverlay.textContent = `Fim de jogo! Pontos: ${score}`;
            }
        }, 1000);
    }

    startGameBtn.addEventListener('click', startGame);
});