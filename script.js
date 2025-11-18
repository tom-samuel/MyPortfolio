// Scroll reveal animation
const elements = document.querySelectorAll(".fade");

function reveal() {
    elements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);


// Animate skill bars on load
window.addEventListener("load", () => {
    document.querySelectorAll(".fill").forEach(bar => {
        const width = bar.style.width;
        bar.style.width = "0";
        setTimeout(() => bar.style.width = width, 300);
    });
});
