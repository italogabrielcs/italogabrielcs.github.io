const slides = document.querySelectorAll('.slide');
const navDotsContainer = document.querySelector('.nav-dots');

slides.forEach((slide, index) => {
    const dot = document.createElement('div');
    dot.classList.add('nav-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        slide.scrollIntoView({ behavior: 'smooth' });
    });
    navDotsContainer.appendChild(dot);
});

const navDots = document.querySelectorAll('.nav-dot');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            const slideIndex = Array.from(slides).indexOf(entry.target);
            navDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
        }
    });
}, observerOptions);

slides.forEach(slide => observer.observe(slide));

document.addEventListener('keydown', (e) => {
    const currentSlide = document.querySelector('.slide.active');
    const currentIndex = Array.from(slides).indexOf(currentSlide);
    
    if (e.key === 'ArrowDown' && currentIndex < slides.length - 1) {
        slides[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        slides[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
    }
});
