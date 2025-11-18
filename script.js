// Fade-in sections
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if(top < window.innerHeight - 100){
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        }
    });
});
sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease-out';
});

// Animate skill bars
const progressBars = document.querySelectorAll('.progress');
window.addEventListener('load', () => {
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = width; }, 500);
    });
});
