document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector('.logos')) {
        function positionLogosInCircle() {
            const logosContainer = document.querySelector(".logos");
            const logos = document.querySelectorAll(".logo");
            const numberOfLogos = logos.length;
            const containerWidth = logosContainer.offsetWidth;
            const containerHeight = logosContainer.offsetHeight;
            const centerX = containerWidth / 2;
            const centerY = containerHeight / 2;
            const screenWidth = window.innerWidth;
            let radius;
            if (screenWidth <= 480) {
                radius = 150;
            } else {
                radius = Math.min(centerX, centerY) * 0.9;
            }
            logos.forEach((logo, index) => {
                const angle = (2 * Math.PI * (index - 2)) / numberOfLogos;
                const x = centerX + radius * Math.cos(angle) - logo.clientWidth / 2;
                const y = centerY + radius * Math.sin(angle) - logo.clientHeight / 2;
                logo.style.left = `${x}px`;
                logo.style.top = `${y}px`;
                setTimeout(() => {
                    logo.style.transform = "scale(1)";
                    logo.style.opacity = "1";
                }, 100 + 40 * (index + 1));
            });
        }
        positionLogosInCircle();
        window.addEventListener("resize", positionLogosInCircle);
    }

    if (document.querySelector('.site-title')) {
        setTimeout(() => {
            document.querySelector('.site-title').style.opacity = '1';
        }, 1000);
    }
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = window.innerWidth >= 480 ? Math.random() * 5 + 2 : Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.hue = Math.random() * 60 + 180;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.03) {
            this.size -= 0.03;
        }
    }
    draw(ctx) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `hsl(${this.hue}, 100%, 50%)`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = gradient;
        ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];

const createParticles = (e) => {
    const xPos = e.x;
    const yPos = e.y;
    if (window.innerWidth >= 480) {
        particlesArray.push(new Particle(xPos, yPos));
    } else {
        for (let i = 0; i < 5; i++) {
            particlesArray.push(new Particle(xPos, yPos));
        }
    }
};

canvas.addEventListener('mousemove', createParticles);

const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw(ctx);
    }
    particlesArray = particlesArray.filter(p => p.size > 0);
    requestAnimationFrame(animateParticles);
};

animateParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const customCursor = document.getElementById("custom-cursor");
if (customCursor) {
    document.addEventListener("mousemove", (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });
    document.addEventListener("mouseenter", () => {
        customCursor.style.display = "block";
    });
    document.addEventListener("mouseleave", () => {
        customCursor.style.display = "none";
    });
}

function openModal() {
    document.getElementById('project-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('project-modal').style.display = 'none';
}

function closeModal() {
    document.getElementById('project-modal').style.display = 'none';
}

function openAboutModal() {
    document.getElementById('about-modal').style.display = 'block';
}

function closeAboutModal() {
    document.getElementById('about-modal').style.display = 'none';
}

// Close modal when clicking outside or on close button
window.onclick = function(event) {
    const projectModal = document.getElementById('project-modal');
    const aboutModal = document.getElementById('about-modal');
    if (event.target == projectModal) {
        projectModal.style.display = 'none';
    }
    if (event.target == aboutModal) {
        aboutModal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.onclick = function() {
            document.body.classList.toggle('dark');
            themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
        };
    }

    // Loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
        }, 2000);
    }

    // Interactive hover effects
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.2) rotate(5deg)';
        });
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1)';
        });
    });
});