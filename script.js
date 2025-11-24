// Particles (a bit buggy rn)
const canvas = document.getElementById("particles"),
    ctx = canvas.getContext("2d");
let canvasWidth = window.innerWidth,
    canvasHeight = window.innerHeight,
    particlesArray = [];
canvas.width = canvasWidth;
canvas.height = canvasHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 4 + 2;
        this.speedY = Math.random() * -1 - 0.5;
        this.color = "rgba(255, 85, 85, 0.4)";
    }
    update() {
        this.y += this.speedY;
        if (this.y < -this.size) {
            this.y = canvasHeight + this.size;
            this.x = Math.random() * canvasWidth;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

function initParticles(num = 80) {
    particlesArray = [];
    for (let i = 0; i < num; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    particlesArray.forEach((p) => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
window.addEventListener("resize", () => {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    initParticles(80);
});
initParticles();
animateParticles();

// Animated Gradient Background
document.addEventListener("DOMContentLoaded", () => {
    const ultraGradientWrapper = document.querySelector('.ultra-gradient-wrapper');
    if (ultraGradientWrapper) {
        const shape3 = ultraGradientWrapper.querySelector('.shape-3');

        function animateGradient() {
            const time = Date.now() * 0.0001;
            const rotation = 6.0192 + Math.sin(time) * 10;
            const translateX = 23.1974 + Math.cos(time * 0.7) * 15;
            if (shape3) {
                shape3.style.transform = `translate3d(${translateX}vw, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(${rotation}deg) skew(0deg, 0deg)`;
            }
            requestAnimationFrame(animateGradient);
        }
        animateGradient();
    }
});

// Player Counter
const playerCountEl = document.getElementById("player-count"),
    SERVER_IP = "nexthrixsmp.fun";
async function fetchPlayerCount() {
    try {
        const e = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`),
            t = await e.json();
        playerCountEl.textContent = t.online ?
            `${t.players.online} / ${t.players.max} Players Online` :
            "Server Offline";
    } catch (e) {
        console.error("Error fetching player count:", e);
        playerCountEl.textContent = "Cannot load data";
    }
}
fetchPlayerCount();
setInterval(fetchPlayerCount, 15000);

// Mobile Menu
const menuBtn = document.getElementById("menu-btn"),
    mobileMenu = document.getElementById("mobile-menu");
menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
});
mobileMenu.querySelectorAll("a").forEach((e) => {
    e.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
    });
});

// Scroll Animation
document.querySelectorAll(".card").forEach((card) => {
    new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add("visible");
            });
        }, {
            threshold: 0.1
        }
    ).observe(card);
});

// Copy Server IP
function copyIP() {
    const e = document.getElementById("server-ip");
    navigator.clipboard
        .writeText(e.textContent)
        .then(() => alert("Server IP copied!"))
        .catch(() => alert("Failed to copy IP"));
}

// Music
let musicPlaying = !1;
const musicBtn = document.getElementById("music-toggle"),
    bgMusic = new Audio("assets/background-music.mp3");
bgMusic.loop = !0;
musicBtn.addEventListener("click", () => {
    musicPlaying ?
        (bgMusic.pause(), (musicPlaying = !1), (musicBtn.textContent = "🎵")) :
        (bgMusic.play(), (musicPlaying = !0), (musicBtn.textContent = "🔊"));
});
