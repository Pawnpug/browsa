(function () {
    'use strict';

    const canvas = document.getElementById('waves');
    const ctx    = canvas.getContext('2d');

    // Each "pixel" in the wave is a square of this size
    const PX = 5;

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // yRatio   — vertical position as fraction of viewport height
    // amp      — wave amplitude in px
    // freq     — spatial frequency (controls wave width)
    // speed    — time-based phase velocity
    // thick    — wave thickness in pixel units
    // step     — column step (1 = solid, 2 = dotted, 3 = sparse)
    // phase    — initial phase offset
    const MAROON = 'rgba(51, 20, 20, 0.86)';
    const GREEN  = 'rgba(0, 255, 127, 0.90)';

    const WAVES = [
        { yRatio: 0.07,  amp: 26,  freq: 0.018, speed: 0.58, thick: 2, step: 1, phase: 0.00, color: MAROON },
        { yRatio: 0.26,  amp: 65,  freq: 0.011, speed: 0.27, thick: 3, step: 1, phase: 1.40, color: GREEN  },
        { yRatio: 0.48,  amp: 74,  freq: 0.009, speed: 0.17, thick: 4, step: 1, phase: 2.90, color: MAROON },
        { yRatio: 0.60,  amp: 32,  freq: 0.026, speed: 0.80, thick: 2, step: 3, phase: 1.85, color: MAROON },
        { yRatio: 0.72,  amp: 50,  freq: 0.015, speed: 0.40, thick: 3, step: 2, phase: 0.65, color: GREEN  },
        { yRatio: 0.90,  amp: 40,  freq: 0.021, speed: 0.64, thick: 2, step: 1, phase: 3.70, color: MAROON },
    ];

    function drawWave(w, t) {
        ctx.fillStyle = w.color;
        const baseY  = w.yRatio * canvas.height;
        const cols   = Math.ceil(canvas.width / PX) + 2;

        for (let col = 0; col < cols; col += w.step) {
            // Continuous y from sine, then snapped to the pixel grid
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
