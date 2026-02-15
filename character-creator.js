const SPRITES = [
    'Character creation/Body.png',
    'Character creation/Body (1).png',
    'Character creation/Body (2).png',
    'Character creation/Body (3).png'
];

let selectedIndex = -1;
const canvases = document.querySelectorAll('.character-option');
const startButton = document.getElementById('start-button');

async function init() {
    // Load all sprites and draw into canvases
    const loads = SPRITES.map((src, i) => {
        const img = new Image();
        img.src = src;
        return new Promise((resolve, reject) => {
            img.onload = () => {
                const ctx = canvases[i].getContext('2d');
                ctx.drawImage(img, 0, 0, canvases[i].width, canvases[i].height);
                resolve();
            };
            img.onerror = reject;
        });
    });
    await Promise.all(loads);

    // Restore saved selection
    const saved = localStorage.getItem('playerCharacter');
    if (saved !== null) selectCharacter(parseInt(saved));
}

function selectCharacter(index) {
    selectedIndex = index;
    canvases.forEach((c, i) => c.classList.toggle('selected', i === index));
    startButton.disabled = false;
}

canvases.forEach(canvas => {
    canvas.addEventListener('click', () => {
        selectCharacter(parseInt(canvas.dataset.index));
    });
});

startButton.addEventListener('click', () => {
    if (selectedIndex < 0) return;
    localStorage.setItem('playerCharacter', selectedIndex.toString());
    window.location.href = 'index.html';
});

init();
