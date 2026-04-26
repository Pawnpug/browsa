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
        { yRatio: 0.26,  amp: 65,  freq: 0.011, speed: 0.27, thick: 3, step: 1, phase: 1.40, color: GREEN  },
        { yRatio: 0.48,  amp: 74,  freq: 0.009, speed: 0.17, thick: 4, step: 1, phase: 2.90, color: MAROON },
        { yRatio: 0.72,  amp: 50,  freq: 0.015, speed: 0.40, thick: 3, step: 2, phase: 0.65, color: GREEN  },
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

// ── Case modals ───────────────────────────────────────────────────
(function () {
    const cases = {
        automotive: {
            title:   'Fordonshandel',
            body:    'Ett skräddarsytt system som samlar hela kedjan – inköp, lager och kundärenden – i ett enda flöde. Manuella kalkylark och splittrade rutiner ersattes av en lösning byggd exakt för den här verksamheten.',
            results: ['60% kortare handläggningstid', 'Realtidsöversikt av lager och orderstatus', 'Skalbart för fler anläggningar']
        },
        service: {
            title:   'Service & Installation',
            body:    'En plattform i webb och mobil där arbetsorder, schemaläggning och kundhistorik möts i realtid. Fälttekniker och kontor arbetar nu i samma system – papper och parallella verktyg är borta.',
            results: ['Pappershantering eliminerad', 'Kortare svarstider och färre felkörningar', 'Bättre projektöverblick för ledningen']
        },
        analytics: {
            title:   'Dataanalys',
            body:    'En dashboard som hämtar och visualiserar data från ett befintligt system på ett sätt som tidigare inte var möjligt. Information som låg inlåst är nu tillgänglig och läsbar i realtid.',
            results: ['Datadrivna beslut utan externa verktyg', 'Eliminerat licensberoende för BI-verktyg', 'Anpassningsbart för nya datakällor']
        }
    };

    const modal      = document.getElementById('modal');
    const modalBox   = document.getElementById('modal-box');
    const modalLabel = document.getElementById('modal-label');
    const modalTitle = document.getElementById('modal-title');
    const modalBody  = document.getElementById('modal-body');

    var activeCard = null;

    function positionNear(cardEl) {
        var cardRect = cardEl.getBoundingClientRect();
        var vw  = window.innerWidth;
        var vh  = window.innerHeight;
        var bw  = 320;
        var gap = 40;

        var left = (cardRect.left + cardRect.width / 2 < vw / 2)
            ? cardRect.right + gap
            : cardRect.left - bw - gap;

        var top = cardRect.top - 8;

        left = Math.max(12, Math.min(vw - bw - 12, left));
        top  = Math.max(12, Math.min(vh - 420, top));

        modalBox.style.left = left + 'px';
        modalBox.style.top  = top  + 'px';
    }

    function openModal(key, cardEl) {
        activeCard = cardEl;
        var d = cases[key];
        modalTitle.textContent = d.title;
        modalBody.textContent  = d.body;
        positionNear(cardEl);
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('is-open');
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        activeCard = null;
    }

    document.querySelectorAll('.case-card').forEach(function (card) {
        card.addEventListener('click', function () { openModal(card.dataset.case, card); });
    });

    document.querySelector('.modal-overlay').addEventListener('click', closeModal);
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
}());
