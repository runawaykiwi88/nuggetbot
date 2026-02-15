// ===========================================
// GAME CONFIGURATION
// ===========================================
const CONFIG = {
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    blastTypes: ['fireball', 'ice', 'fireworks', 'hearts', 'laser'],
    letterColors: [
        '#FFD700', '#FF4500', '#00FFCC', '#FF69B4',
        '#FFFFFF', '#00FF00', '#FFE135', '#FF6B6B'
    ],
    descentSpeed: 60,
    patrolSpeed: 80,
    patrolMargin: 40,
    characterSize: 200,
    celebrationTarget: 5,
    grassHeight: 100,
    letterSpawnY: 80,
    spawnDelay: 200
};

// ===========================================
// BACKGROUND IMAGES (cycle after each celebration)
// ===========================================
const BG_IMAGES = [
    'Backgrounds/ChatGPT Image Feb 15, 2026, 12_51_30 PM.png',
    'Backgrounds/ChatGPT Image Feb 15, 2026, 12_51_46 PM.png',
    'Backgrounds/ChatGPT Image Feb 15, 2026, 12_51_48 PM.png',
    'Backgrounds/ChatGPT Image Feb 15, 2026, 12_51_58 PM.png'
];

// ===========================================
// GAME STATE
// ===========================================
const state = {
    currentLetter: '',
    previousLetter: '',
    score: 0,
    progressCount: 0,
    letterY: CONFIG.letterSpawnY,
    lastTime: 0,
    paused: false,
    celebrating: false,
    characterX: 0,
    movingRight: true,
    themeIndex: 0,
    celebrationCount: 0,
    groundY: 0,
    groundParticles: []
};

// ===========================================
// DOM & CANVAS SETUP
// ===========================================
const letterEl = document.getElementById('letter');
const scoreEl = document.getElementById('score');
const progressEl = document.getElementById('progress');
const characterEl = document.getElementById('character');
const celebrationEl = document.getElementById('celebration');
const bgImageEl = document.getElementById('bg-image');
const fxCanvas = document.getElementById('effects-canvas');
const fxCtx = fxCanvas.getContext('2d');
const charRenderCanvas = document.getElementById('character-render');
const charRenderCtx = charRenderCanvas.getContext('2d');

function resizeCanvas() {
    fxCanvas.width = window.innerWidth;
    fxCanvas.height = window.innerHeight;
    state.groundY = window.innerHeight - CONFIG.grassHeight;
}

window.addEventListener('resize', resizeCanvas);

// ===========================================
// CHARACTER SPRITE LOADING
// ===========================================
const CHARACTER_SPRITES = [
    'Character creation/Body.png',
    'Character creation/Body (1).png',
    'Character creation/Body (2).png',
    'Character creation/Body (3).png'
];
let playerCharacterIndex = 0;

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

async function loadCharacterSprites() {
    const saved = localStorage.getItem('playerCharacter');
    if (saved !== null) playerCharacterIndex = parseInt(saved);

    const img = await loadImage(CHARACTER_SPRITES[playerCharacterIndex]);
    charRenderCtx.drawImage(img, 0, 0, charRenderCanvas.width, charRenderCanvas.height);
}

// ===========================================
// BACKGROUND MANAGEMENT
// ===========================================
function setBackground(index) {
    bgImageEl.src = BG_IMAGES[index];
}

// ===========================================
// CHARACTER MOVEMENT
// ===========================================
function initCharacter() {
    state.characterX = (window.innerWidth - CONFIG.characterSize) / 2;
    characterEl.style.left = state.characterX + 'px';
    characterEl.style.bottom = (CONFIG.grassHeight - 100) + 'px';
}

function updateCharacter(deltaTime) {
    if (state.celebrating) return;
    const dt = deltaTime / 1000;
    if (state.movingRight) {
        state.characterX += CONFIG.patrolSpeed * dt;
        if (state.characterX >= window.innerWidth - CONFIG.characterSize - CONFIG.patrolMargin) {
            state.characterX = window.innerWidth - CONFIG.characterSize - CONFIG.patrolMargin;
            state.movingRight = false;
            characterEl.classList.add('facing-left');
        }
    } else {
        state.characterX -= CONFIG.patrolSpeed * dt;
        if (state.characterX <= CONFIG.patrolMargin) {
            state.characterX = CONFIG.patrolMargin;
            state.movingRight = true;
            characterEl.classList.remove('facing-left');
        }
    }
    characterEl.style.left = state.characterX + 'px';
}

function getCharacterCenter() {
    const rect = characterEl.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function getLetterCenter() {
    const rect = letterEl.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

// ===========================================
// LETTER MANAGEMENT
// ===========================================
function spawnNewLetter() {
    let next;
    do {
        next = CONFIG.letters[Math.floor(Math.random() * CONFIG.letters.length)];
    } while (next === state.previousLetter);

    state.previousLetter = state.currentLetter;
    state.currentLetter = next;
    state.letterY = CONFIG.letterSpawnY;
    letterEl.textContent = state.currentLetter;
    letterEl.style.top = state.letterY + 'px';
    letterEl.style.color = CONFIG.letterColors[Math.floor(Math.random() * CONFIG.letterColors.length)];
    letterEl.style.display = 'block';
    letterEl.style.opacity = '1';
}

function updateLetter(deltaTime) {
    if (state.paused || state.celebrating) return;

    state.letterY += CONFIG.descentSpeed * (deltaTime / 1000);
    letterEl.style.top = state.letterY + 'px';

    // Letter hits the grass
    if (state.letterY > state.groundY - 120) {
        spawnGroundEffect();
        spawnNewLetter();
    }
}

// ===========================================
// GROUND EFFECT (letter hits grass)
// ===========================================
function spawnGroundEffect() {
    const rect = letterEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = state.groundY;
    const effectType = Math.floor(Math.random() * 3);

    if (effectType === 0) {
        for (let i = 0; i < 12; i++) {
            state.groundParticles.push({
                x: cx + (Math.random() - 0.5) * 60,
                y: cy - Math.random() * 30,
                vx: (Math.random() - 0.5) * 80,
                vy: -20 - Math.random() * 40,
                gravity: 200,
                size: 4 + Math.random() * 6,
                color: letterEl.style.color || '#FFD700',
                life: 1,
                decay: 1.2 + Math.random() * 0.5,
                type: 'square'
            });
        }
    } else if (effectType === 1) {
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i;
            state.groundParticles.push({
                x: cx, y: cy - 20,
                vx: Math.cos(angle) * (60 + Math.random() * 60),
                vy: Math.sin(angle) * 60 - 40,
                gravity: 150,
                size: 5 + Math.random() * 8,
                color: letterEl.style.color || '#FFD700',
                life: 1,
                decay: 1.5 + Math.random() * 0.5,
                type: 'triangle'
            });
        }
    } else {
        for (let i = 0; i < 6; i++) {
            state.groundParticles.push({
                x: cx + (Math.random() - 0.5) * 40,
                y: cy - 10,
                vx: (Math.random() - 0.5) * 100,
                vy: -100 - Math.random() * 80,
                gravity: 250,
                size: 6 + Math.random() * 8,
                color: letterEl.style.color || '#FFD700',
                life: 1,
                decay: 0.8 + Math.random() * 0.4,
                type: 'circle'
            });
        }
    }
}

function updateGroundParticles(deltaTime) {
    const dt = deltaTime / 1000;
    for (let i = state.groundParticles.length - 1; i >= 0; i--) {
        const p = state.groundParticles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += p.gravity * dt;
        p.life -= p.decay * dt;
        if (p.life <= 0) {
            state.groundParticles.splice(i, 1);
        }
    }
}

function drawGroundParticles() {
    state.groundParticles.forEach(p => {
        fxCtx.globalAlpha = Math.max(0, p.life);
        fxCtx.fillStyle = p.color;
        if (p.type === 'square') {
            fxCtx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        } else if (p.type === 'circle') {
            fxCtx.beginPath();
            fxCtx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
            fxCtx.fill();
        } else {
            fxCtx.beginPath();
            fxCtx.moveTo(p.x, p.y - p.size);
            fxCtx.lineTo(p.x - p.size / 2, p.y + p.size / 2);
            fxCtx.lineTo(p.x + p.size / 2, p.y + p.size / 2);
            fxCtx.closePath();
            fxCtx.fill();
        }
    });
    fxCtx.globalAlpha = 1;
}

// ===========================================
// UI UPDATES
// ===========================================
function updateUI() {
    scoreEl.textContent = 'Score: ' + state.score;
    const filled = '\u25C9'.repeat(state.progressCount);
    const empty = '\u25EF'.repeat(CONFIG.celebrationTarget - state.progressCount);
    progressEl.textContent = filled + empty;
}

// ===========================================
// BLAST EFFECTS
// ===========================================
let activeBlast = null;

function playBlastAnimation(type) {
    const from = getCharacterCenter();
    const to = getLetterCenter();
    activeBlast = { type, from, to, startTime: performance.now(), particles: null };
}

function updateAndDrawBlast(now) {
    if (!activeBlast) return;
    const b = activeBlast;
    const elapsed = now - b.startTime;

    switch (b.type) {
        case 'fireball':  drawFireball(elapsed, b.from, b.to, b); break;
        case 'ice':       drawIce(elapsed, b.from, b.to, b); break;
        case 'fireworks': drawFireworks(elapsed, b.from, b.to, b); break;
        case 'hearts':    drawHearts(elapsed, b.from, b.to, b); break;
        case 'laser':     drawLaser(elapsed, b.from, b.to, b); break;
    }

    const durations = { fireball: 400, ice: 500, fireworks: 600, hearts: 500, laser: 350 };
    if (elapsed >= durations[b.type]) activeBlast = null;
}

function drawFireball(elapsed, from, to, b) {
    const t = Math.min(elapsed / 400, 1);
    if (t < 0.25) {
        const p = t / 0.25;
        const x = from.x + (to.x - from.x) * p;
        const y = from.y + (to.y - from.y) * p;
        const r = 10 + p * 20;
        const grad = fxCtx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, '#FFD700');
        grad.addColorStop(0.6, '#FF4500');
        grad.addColorStop(1, 'rgba(255,69,0,0)');
        fxCtx.fillStyle = grad;
        fxCtx.beginPath();
        fxCtx.arc(x, y, r, 0, Math.PI * 2);
        fxCtx.fill();
    } else {
        if (!b.particles) {
            b.particles = [];
            for (let i = 0; i < 10; i++) {
                const a = (Math.PI * 2 / 10) * i + Math.random() * 0.3;
                b.particles.push({ x: to.x, y: to.y, vx: Math.cos(a) * (150 + Math.random() * 100), vy: Math.sin(a) * (150 + Math.random() * 100), r: 4 + Math.random() * 6, color: Math.random() > 0.5 ? '#FF4500' : '#FFD700' });
            }
        }
        const subT = (t - 0.25) / 0.75;
        fxCtx.globalAlpha = 1 - subT;
        b.particles.forEach(p => { fxCtx.fillStyle = p.color; fxCtx.beginPath(); fxCtx.arc(p.x + p.vx * subT * 0.4, p.y + p.vy * subT * 0.4, p.r * (1 - subT * 0.5), 0, Math.PI * 2); fxCtx.fill(); });
        fxCtx.globalAlpha = 1;
    }
}

function drawIce(elapsed, from, to, b) {
    const t = Math.min(elapsed / 500, 1);
    if (t < 0.3) {
        const p = t / 0.3;
        const x = from.x + (to.x - from.x) * p;
        const y = from.y + (to.y - from.y) * p;
        fxCtx.save(); fxCtx.translate(x, y); fxCtx.rotate(Math.atan2(to.y - from.y, to.x - from.x));
        fxCtx.fillStyle = '#00CED1'; fxCtx.beginPath(); fxCtx.moveTo(-15, -6); fxCtx.lineTo(15, 0); fxCtx.lineTo(-15, 6); fxCtx.closePath(); fxCtx.fill(); fxCtx.restore();
    } else if (t < 0.6) {
        const subT = (t - 0.3) / 0.3;
        fxCtx.globalAlpha = 0.6;
        const grad = fxCtx.createRadialGradient(to.x, to.y, 0, to.x, to.y, 80);
        grad.addColorStop(0, '#E0F7FA'); grad.addColorStop(1, 'rgba(0,206,209,0)');
        fxCtx.fillStyle = grad; fxCtx.beginPath(); fxCtx.arc(to.x, to.y, 40 + 80 * subT, 0, Math.PI * 2); fxCtx.fill(); fxCtx.globalAlpha = 1;
    } else {
        if (!b.particles) {
            b.particles = [];
            for (let i = 0; i < 8; i++) { const a = (Math.PI * 2 / 8) * i + Math.random() * 0.4; b.particles.push({ x: to.x, y: to.y, vx: Math.cos(a) * (80 + Math.random() * 60), vy: Math.sin(a) * 40 + 60, size: 6 + Math.random() * 8, rot: Math.random() * Math.PI * 2 }); }
        }
        const subT = (t - 0.6) / 0.4;
        fxCtx.globalAlpha = 1 - subT;
        b.particles.forEach(p => { fxCtx.save(); fxCtx.translate(p.x + p.vx * subT, p.y + p.vy * subT); fxCtx.rotate(p.rot + subT * 3); fxCtx.fillStyle = Math.random() > 0.5 ? '#00CED1' : '#E0F7FA'; fxCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size); fxCtx.restore(); });
        fxCtx.globalAlpha = 1;
    }
}

function drawFireworks(elapsed, from, to, b) {
    const colors = ['#FF69B4', '#FFD700', '#00CED1', '#9370DB'];
    const t = Math.min(elapsed / 600, 1);
    if (t < 0.3) {
        const p = t / 0.3;
        const x = from.x + (to.x - from.x) * p;
        const y = from.y + (to.y - from.y) * p;
        for (let i = 0; i < 4; i++) { const trailT = Math.max(0, p - i * 0.06); fxCtx.globalAlpha = 0.7 - i * 0.15; fxCtx.fillStyle = colors[i]; fxCtx.beginPath(); fxCtx.arc(from.x + (to.x - from.x) * trailT, from.y + (to.y - from.y) * trailT, 3, 0, Math.PI * 2); fxCtx.fill(); }
        fxCtx.globalAlpha = 1; fxCtx.fillStyle = '#FFFFFF'; fxCtx.beginPath(); fxCtx.arc(x, y, 5, 0, Math.PI * 2); fxCtx.fill();
    } else {
        if (!b.particles) {
            b.particles = [];
            for (let i = 0; i < 15; i++) { const a = (Math.PI * 2 / 15) * i + Math.random() * 0.2; const speed = 100 + Math.random() * 120; b.particles.push({ x: to.x, y: to.y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, color: colors[Math.floor(Math.random() * colors.length)], r: 3 + Math.random() * 4 }); }
        }
        const subT = (t - 0.3) / 0.7;
        fxCtx.globalAlpha = 1 - subT;
        b.particles.forEach(p => { fxCtx.fillStyle = p.color; fxCtx.beginPath(); fxCtx.arc(p.x + p.vx * subT * 0.5, p.y + p.vy * subT * 0.5 + 30 * subT * subT, p.r * (1 - subT * 0.5), 0, Math.PI * 2); fxCtx.fill(); });
        fxCtx.globalAlpha = 1;
    }
}

function drawHearts(elapsed, from, to, b) {
    const t = Math.min(elapsed / 500, 1);
    if (!b.particles) {
        b.particles = [];
        for (let i = 0; i < 7; i++) { b.particles.push({ offsetX: (Math.random() - 0.5) * 60, size: 10 + Math.random() * 10, color: Math.random() > 0.5 ? '#FF69B4' : '#FFB6C1', speed: 0.8 + Math.random() * 0.4, orbitR: 30 + Math.random() * 30, orbitStart: Math.random() * Math.PI * 2 }); }
    }
    function heart(cx, cy, size, color) { fxCtx.save(); fxCtx.translate(cx, cy); fxCtx.beginPath(); fxCtx.moveTo(0, size * 0.3); fxCtx.bezierCurveTo(-size, -size * 0.3, -size * 0.5, -size, 0, -size * 0.5); fxCtx.bezierCurveTo(size * 0.5, -size, size, -size * 0.3, 0, size * 0.3); fxCtx.fillStyle = color; fxCtx.fill(); fxCtx.restore(); }
    if (t < 0.4) {
        const p = t / 0.4;
        b.particles.forEach(h => { const hp = Math.min(p * h.speed, 1); heart(from.x + (to.x - from.x) * hp + h.offsetX * hp, from.y + (to.y - from.y) * hp + Math.sin(hp * Math.PI * 2) * 15, h.size, h.color); });
    } else if (t < 0.7) {
        const subT = (t - 0.4) / 0.3;
        b.particles.forEach(h => { const a = h.orbitStart + subT * Math.PI * 2; heart(to.x + Math.cos(a) * h.orbitR, to.y + Math.sin(a) * h.orbitR * 0.6, h.size, h.color); });
    } else {
        const subT = (t - 0.7) / 0.3;
        fxCtx.globalAlpha = 1 - subT;
        const scale = 1 + subT * 0.8;
        b.particles.forEach(h => { const a = h.orbitStart + Math.PI * 2; heart(to.x + Math.cos(a) * h.orbitR * scale, to.y + Math.sin(a) * h.orbitR * 0.6 * scale, h.size * scale, h.color); });
        fxCtx.globalAlpha = 1;
    }
}

function drawLaser(elapsed, from, to, b) {
    const t = Math.min(elapsed / 350, 1);
    if (t < 0.3) {
        fxCtx.globalAlpha = 0.4; fxCtx.strokeStyle = '#00FF00'; fxCtx.lineWidth = 16; fxCtx.beginPath(); fxCtx.moveTo(from.x, from.y); fxCtx.lineTo(to.x, to.y); fxCtx.stroke();
        fxCtx.globalAlpha = 1; fxCtx.strokeStyle = '#FFFFFF'; fxCtx.lineWidth = 6; fxCtx.beginPath(); fxCtx.moveTo(from.x, from.y); fxCtx.lineTo(to.x, to.y); fxCtx.stroke();
    } else if (t < 0.6) {
        const subT = (t - 0.3) / 0.3; const pulse = Math.sin(subT * Math.PI * 4) * 0.3 + 0.7;
        fxCtx.globalAlpha = pulse * 0.4; fxCtx.strokeStyle = '#00FF00'; fxCtx.lineWidth = 16 + pulse * 8; fxCtx.beginPath(); fxCtx.moveTo(from.x, from.y); fxCtx.lineTo(to.x, to.y); fxCtx.stroke();
        fxCtx.globalAlpha = pulse; fxCtx.strokeStyle = '#FFFFFF'; fxCtx.lineWidth = 6; fxCtx.beginPath(); fxCtx.moveTo(from.x, from.y); fxCtx.lineTo(to.x, to.y); fxCtx.stroke(); fxCtx.globalAlpha = 1;
    } else {
        if (!b.particles) {
            b.particles = []; const ps = 8;
            for (let px = -60; px < 60; px += ps) { for (let py = -80; py < 80; py += ps) { if (Math.random() > 0.4) { b.particles.push({ x: to.x + px, y: to.y + py, vx: (Math.random() - 0.5) * 80, vy: (Math.random() - 0.5) * 80, size: ps, delay: Math.random() * 0.3, color: Math.random() > 0.5 ? '#00FF00' : '#FFFFFF' }); } } }
        }
        const subT = (t - 0.6) / 0.4;
        b.particles.forEach(p => { const pt = Math.max(0, subT - p.delay) / (1 - p.delay); fxCtx.globalAlpha = Math.max(0, 1 - pt); fxCtx.fillStyle = p.color; fxCtx.fillRect(p.x + p.vx * pt, p.y + p.vy * pt, p.size * (1 - pt * 0.5), p.size * (1 - pt * 0.5)); });
        fxCtx.globalAlpha = 1;
    }
}

// ===========================================
// CELEBRATION & CONFETTI
// ===========================================
let confettiParticles = [];

function celebrate() {
    state.celebrating = true;
    state.paused = true;
    letterEl.style.display = 'none';

    characterEl.classList.add('celebrating');

    const confettiColors = ['#FF69B4', '#FFD700', '#00CED1', '#9370DB', '#FF4500', '#00FF00', '#FFB6C1'];
    confettiParticles = [];
    for (let i = 0; i < 40; i++) {
        confettiParticles.push({
            x: Math.random() * fxCanvas.width,
            y: -10 - Math.random() * 100,
            vx: (Math.random() - 0.5) * 80,
            vy: 120 + Math.random() * 100,
            rot: Math.random() * Math.PI * 2,
            rotSpd: (Math.random() - 0.5) * 6,
            w: 8 + Math.random() * 8,
            h: 6 + Math.random() * 4,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)]
        });
    }

    celebrationEl.textContent = 'Great Job!';
    celebrationEl.style.display = 'block';
    requestAnimationFrame(() => { celebrationEl.style.opacity = '1'; });

    setTimeout(() => {
        celebrationEl.style.opacity = '0';
        setTimeout(() => {
            celebrationEl.style.display = 'none';
            characterEl.classList.remove('celebrating');
            confettiParticles = [];

            // Cycle background
            state.celebrationCount++;
            state.themeIndex = state.celebrationCount % BG_IMAGES.length;
            setBackground(state.themeIndex);

            state.celebrating = false;
            state.paused = false;
            spawnNewLetter();
        }, 200);
    }, 1800);
}

function updateConfetti(deltaTime) {
    if (confettiParticles.length === 0) return;
    const dt = deltaTime / 1000;
    confettiParticles.forEach(c => {
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        c.rot += c.rotSpd * dt;
        c.vx *= 0.995;
    });
}

function drawConfetti() {
    if (confettiParticles.length === 0) return;
    confettiParticles.forEach(c => {
        fxCtx.save();
        fxCtx.translate(c.x, c.y);
        fxCtx.rotate(c.rot);
        fxCtx.fillStyle = c.color;
        fxCtx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        fxCtx.restore();
    });
}

// ===========================================
// INPUT HANDLING
// ===========================================
function handleCorrectPress() {
    const blastType = CONFIG.blastTypes[Math.floor(Math.random() * CONFIG.blastTypes.length)];
    state.score++;
    state.progressCount++;

    playBlastAnimation(blastType);
    letterEl.style.display = 'none';
    updateUI();

    if (state.progressCount >= CONFIG.celebrationTarget) {
        state.progressCount = 0;
        updateUI();
        setTimeout(() => celebrate(), 300);
        return;
    }

    state.paused = true;
    setTimeout(() => {
        spawnNewLetter();
        state.paused = false;
    }, CONFIG.spawnDelay);
}

document.addEventListener('keydown', (e) => {
    if (e.repeat || state.paused || state.celebrating) return;
    if (e.key.toUpperCase() === state.currentLetter) {
        handleCorrectPress();
    }
});

// ===========================================
// MAIN GAME LOOP
// ===========================================
function gameLoop(currentTime) {
    if (state.lastTime === 0) state.lastTime = currentTime;
    const deltaTime = Math.min(currentTime - state.lastTime, 100);
    state.lastTime = currentTime;

    updateLetter(deltaTime);
    updateCharacter(deltaTime);
    updateGroundParticles(deltaTime);
    updateConfetti(deltaTime);

    fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
    updateAndDrawBlast(currentTime);
    drawGroundParticles();
    drawConfetti();

    requestAnimationFrame(gameLoop);
}

// ===========================================
// INITIALIZATION
// ===========================================
async function init() {
    resizeCanvas();
    setBackground(0);
    initCharacter();
    spawnNewLetter();
    updateUI();
    requestAnimationFrame(gameLoop);

    try {
        await loadCharacterSprites();
    } catch (e) {
        console.warn('Could not load character sprites:', e);
    }
}

init();
