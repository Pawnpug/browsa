(function () {
    'use strict';

    const canvas = document.getElementById('waves');
    const ctx    = canvas.getContext('2d');

    const PX = 5;

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const MAROON = 'rgba(51, 20, 20, 0.86)';
    const GREEN  = 'rgba(0, 255, 127, 0.90)';

    const WAVES = [
        { yRatio: 0.26,  amp: 65,  freq: 0.011, speed: 0.27, thick: 3, step: 1, phase: 1.40, color: GREEN  },
        { yRatio: 0.48,  amp: 74,  freq: 0.009, speed: 0.17, thick: 4, step: 1, phase: 2.90, color: MAROON },
        { yRatio: 0.72,  amp: 50,  freq: 0.015, speed: 0.40, thick: 3, step: 2, phase: 0.65, color: GREEN  },
    ];

    function drawWave(w, t) {
        ctx.fillStyle = w.color;
        const baseY  = w.yRatio * canvas.height;
        const cols   = Math.ceil(canvas.width / PX) + 2;

        for (let col = 0; col < cols; col += w.step) {
            const rawY = baseY + Math.sin(col * w.freq + t * w.speed + w.phase) * w.amp;
            const py   = Math.round(rawY / PX) * PX;

            for (let row = 0; row < w.thick; row++) {
                ctx.fillRect(col * PX, py + row * PX, PX - 1, PX - 1);
            }
        }
    }

    function frame(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const t = timestamp * 0.001;
        for (const w of WAVES) {
            drawWave(w, t);
        }
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}());
