// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.swiper-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-advance carousel
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 4000);

// Music player functionality
const audio = document.getElementById('musicPlayer');
const playButton = document.querySelector('.play-button');
const progressBar = document.querySelector('.progress');
const progressHandle = document.querySelector('.progress-handle');
const timeDisplay = document.querySelector('.time-info span:first-child');
const totalTimeDisplay = document.querySelector('.time-info span:last-child');

let isPlaying = false;

// Update progress bar and time
function updateProgress() {
    if (audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percentage}%`;
        progressHandle.style.left = `${percentage}%`;
        
        // Update current time
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Update total time
        const totalMinutes = Math.floor(audio.duration / 60);
        const totalSeconds = Math.floor(audio.duration % 60);
        totalTimeDisplay.textContent = `-${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
    }
}

// Play/Pause functionality
playButton.addEventListener('click', async () => {
    try {
        if (isPlaying) {
            audio.pause();
            playButton.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
            isPlaying = false;
        } else {
            await audio.play();
            playButton.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
            isPlaying = true;
        }
    } catch (error) {
        console.log('Erro ao reproduzir áudio:', error);
        alert('Clique na página primeiro para permitir reprodução de áudio');
    }
});

// Update progress as audio plays
audio.addEventListener('timeupdate', updateProgress);

// Reset when audio ends
audio.addEventListener('ended', () => {
    playButton.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
    isPlaying = false;
    audio.currentTime = 0;
    updateProgress();
});

// Click on progress bar to seek
document.querySelector('.progress-bar').addEventListener('click', (e) => {
    if (audio.duration) {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        audio.currentTime = percentage * audio.duration;
    }
});

// Message expand functionality
const showMessageBtn = document.querySelector('.show-message-btn');
const messageContent = document.querySelector('.message-content');
let messageExpanded = false;

showMessageBtn.addEventListener('click', () => {
    messageExpanded = !messageExpanded;
    if (messageExpanded) {
        messageContent.style.maxHeight = 'none';
        messageContent.querySelector('.message-fade').style.display = 'none';
        showMessageBtn.textContent = 'Ocultar Mensagem';
    } else {
        messageContent.style.maxHeight = '160px';
        messageContent.querySelector('.message-fade').style.display = 'block';
        showMessageBtn.textContent = 'Mostrar Mensagem';
    }
});

// Gallery item clicks
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('span').textContent;
        alert(`tem nada aqui não, curioso kk`);
    });
});

// Stories functionality
let currentStoryIndex = 0;
let storyTimer;
const stories = document.querySelectorAll('.story');
const progressBars = document.querySelectorAll('.progress-bar-story');

function openStories() {
    document.getElementById('storiesModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    currentStoryIndex = 0;
    showStory(0);
    startStoryTimer();
}

function closeStories() {
    document.getElementById('storiesModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    clearTimeout(storyTimer);
    resetProgress();
    pauseAllVideos();
}

function showStory(index) {
    stories.forEach((story, i) => {
        story.classList.toggle('active', i === index);
    });
    
    progressBars.forEach((bar, i) => {
        bar.classList.remove('active', 'completed');
        if (i < index) {
            bar.classList.add('completed');
        } else if (i === index) {
            bar.classList.add('active');
        }
    });
    
    // Play current video
    const currentVideo = stories[index].querySelector('video');
    if (currentVideo) {
        pauseAllVideos();
        currentVideo.play();
    }
}

function nextStory() {
    clearTimeout(storyTimer);
    if (currentStoryIndex < stories.length - 1) {
        currentStoryIndex++;
        showStory(currentStoryIndex);
        startStoryTimer();
    } else {
        closeStories();
    }
}

function previousStory() {
    clearTimeout(storyTimer);
    if (currentStoryIndex > 0) {
        currentStoryIndex--;
        showStory(currentStoryIndex);
        startStoryTimer();
    }
}

function startStoryTimer() {
    storyTimer = setTimeout(() => {
        nextStory();
    }, 5000);
}

function resetProgress() {
    progressBars.forEach(bar => {
        bar.classList.remove('active', 'completed');
    });
}

function pauseAllVideos() {
    stories.forEach(story => {
        const video = story.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });
}

// Keyboard navigation for stories
document.addEventListener('keydown', (e) => {
    if (document.getElementById('storiesModal').classList.contains('active')) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextStory();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            previousStory();
        } else if (e.key === 'Escape') {
            closeStories();
        }
    }
});

// Real-time counter
const relationshipStart = new Date('2025-05-24T17:30:00'); // Data de início do relacionamento

function updateCounter() {
    const now = new Date();
    const diff = now - relationshipStart;
    
    // Calcular tempo decorrido
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Atualizar elementos
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Atualizar contador a cada segundo
setInterval(updateCounter, 1000);

// Time counter animation (para animação inicial)
function animateCounters() {
    updateCounter(); // Atualizar imediatamente
    
    const timeCards = document.querySelectorAll('.time-card .number');
    timeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    // Fade in animation
    const mobileFrame = document.querySelector('.mobile-frame');
    mobileFrame.style.opacity = '0';
    mobileFrame.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        mobileFrame.style.transition = 'all 0.8s ease';
        mobileFrame.style.opacity = '1';
        mobileFrame.style.transform = 'translateY(0)';
    }, 300);
    
    // Start counter animation after a delay
    setTimeout(animateCounters, 1500);
});