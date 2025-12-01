// -------- Digital Clock --------
function updateClock() {
    let t = new Date();
    let h = String(t.getHours()).padStart(2, '0');
    let m = String(t.getMinutes()).padStart(2, '0');
    let s = String(t.getSeconds()).padStart(2, '0');

    document.getElementById("clock").innerHTML = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// -------- Countdown Timer --------
let countdown;
function startCountdown() {
    clearInterval(countdown);

    let target = document.getElementById("targetTime").value;
    if (!target) {
        alert("⚠ Please select a date & time!");
        return;
    }

    let targetTime = new Date(target).getTime();

    countdown = setInterval(() => {
        let now = Date.now();
        let diff = targetTime - now;

        if (diff <= 0) {
            document.getElementById("timer").innerHTML = "⏰ Time's Up!";
            clearInterval(countdown);
            return;
        }

        let d = Math.floor(diff / (1000 * 60 * 60 * 24));
        let h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML =
            `${d}d : ${h}h : ${m}m : ${s}s`;
    }, 1000);
}

// -------- Floating Glow Particles Background --------
const canvas = document.getElementById('bg-animation');
const ctx = canvas.getContext('2d');
let W, H;
function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let particles = [];
for (let i = 0; i < 80; i++) {
    particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#00eaff88";
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();
