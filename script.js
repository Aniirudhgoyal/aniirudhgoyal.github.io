/* =============================================================
   ANIRUDH GOYAL — TERMINAL PORTFOLIO · shared JS
   ============================================================= */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        initWalks();
        initActiveNav();
        initReveal();
        initContactForm();
        initBootSequence();
    });

    /* ----------------------------------------------------------
       RANDOM-WALK BACKGROUND (subtle, behind every page)
       Green-on-black trading-desk lines.
    ---------------------------------------------------------- */
    function initWalks() {
        const canvas = document.getElementById('walks');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let W, H, dpr;

        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = canvas.clientWidth;
            H = canvas.clientHeight;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function drawGrid() {
            ctx.fillStyle = 'rgba(5, 8, 7, 0.10)';   // slower trailing fade → longer-lived lines
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(0, 255, 156, 0.04)';
            ctx.lineWidth = 1;
            const step = 40;
            ctx.beginPath();
            for (let x = step; x < W; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
            for (let y = step; y < H; y += step) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
            ctx.stroke();
        }

        // Number of walks scales with viewport but stays subtle
        let N = 6;
        const walks = [];
        function initLines() {
            walks.length = 0;
            N = Math.max(5, Math.min(9, Math.floor(W / 220)));
            for (let i = 0; i < N; i++) {
                walks.push(makeWalk(i, true));
            }
        }
        function makeWalk(i, spread) {
            return {
                x: spread ? Math.random() * W : -40,
                y: H * (0.15 + 0.7 * Math.random()),
                pts: [],
                hue: i % 5 === 0 ? 'amber' : 'green',  // mostly green, occasional amber
                speed: 0.7 + Math.random() * 0.8,
                vol: 0.7 + Math.random() * 1.3,
                width: 0
            };
        }

        function tick() {
            drawGrid();
            for (const w of walks) {
                w.x += w.speed;
                w.y += (Math.random() - 0.5) * 2 * w.vol * 2.6;
                w.y = Math.max(H * 0.06, Math.min(H * 0.94, w.y));
                w.pts.push([w.x, w.y]);
                if (w.pts.length > 360) w.pts.shift();
                if (w.x > W + 40) {
                    const fresh = makeWalk(Math.floor(Math.random() * 5), false);
                    Object.assign(w, fresh);
                }
                if (w.pts.length > 1) {
                    // line
                    ctx.beginPath();
                    ctx.moveTo(w.pts[0][0], w.pts[0][1]);
                    for (let p = 1; p < w.pts.length; p++) ctx.lineTo(w.pts[p][0], w.pts[p][1]);
                    ctx.strokeStyle = w.hue === 'amber'
                        ? 'rgba(255, 176, 0, 0.32)'
                        : 'rgba(0, 255, 156, 0.34)';
                    ctx.lineWidth = w.hue === 'amber' ? 1.4 : 1.2;
                    ctx.stroke();
                    // leading dot with glow
                    const last = w.pts[w.pts.length - 1];
                    ctx.beginPath();
                    ctx.arc(last[0], last[1], 2.4, 0, Math.PI * 2);
                    ctx.fillStyle = w.hue === 'amber' ? '#ffb000' : '#00ff9c';
                    ctx.shadowColor = w.hue === 'amber' ? '#ffb000' : '#00ff9c';
                    ctx.shadowBlur = 10;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            }
            rafId = requestAnimationFrame(tick);
        }

        function staticPaths() {
            ctx.fillStyle = 'rgba(5,8,7,1)';
            ctx.fillRect(0, 0, W, H);
            drawGrid();
            for (let i = 0; i < 7; i++) {
                let x = 0, y = H * (0.15 + 0.7 * Math.random());
                const vol = 0.7 + Math.random() * 1.3;
                ctx.beginPath(); ctx.moveTo(x, y);
                while (x < W) {
                    x += 3;
                    y += (Math.random() - 0.5) * 2 * vol * 2.6;
                    y = Math.max(H * 0.06, Math.min(H * 0.94, y));
                    ctx.lineTo(x, y);
                }
                ctx.strokeStyle = i % 5 === 0 ? 'rgba(255,176,0,0.14)' : 'rgba(0,255,156,0.15)';
                ctx.lineWidth = 1.1;
                ctx.stroke();
            }
        }

        let rafId = null;
        function start() {
            resize();
            if (reduced) {
                staticPaths();
            } else {
                // paint solid bg once so the fade trick has something to fade from
                ctx.fillStyle = 'rgba(5,8,7,1)';
                ctx.fillRect(0, 0, W, H);
                initLines();
                cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(tick);
            }
        }

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(start, 180);
        });
        start();
    }

    /* ----------------------------------------------------------
       ACTIVE NAV LINK (per page)
    ---------------------------------------------------------- */
    function initActiveNav() {
        const path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
        document.querySelectorAll('.nav-links a').forEach(a => {
            const href = (a.getAttribute('href') || '').toLowerCase();
            if (href === path || (path === '' && href === 'index.html')) {
                a.classList.add('active');
            }
        });
    }

    /* ----------------------------------------------------------
       SCROLL REVEAL
    ---------------------------------------------------------- */
    function initReveal() {
        const els = document.querySelectorAll('.reveal');
        if (!els.length) return;
        if (!('IntersectionObserver' in window)) {
            els.forEach(e => e.classList.add('in'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = Math.min(i * 60, 240) + 'ms';
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });
        els.forEach(e => io.observe(e));

        // failsafe
        setTimeout(() => els.forEach(e => e.classList.add('in')), 1800);
    }

    /* ----------------------------------------------------------
       BOOT SEQUENCE (home only — typed terminal lines)
    ---------------------------------------------------------- */
    function initBootSequence() {
        const boot = document.getElementById('boot');
        if (!boot) return;
        const lines = JSON.parse(boot.dataset.lines || '[]');
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced || !lines.length) {
            boot.innerHTML = lines.map(l => `<div class="boot-line">${l} <span class="ok">OK</span></div>`).join('');
            return;
        }
        let i = 0;
        function next() {
            if (i >= lines.length) return;
            const div = document.createElement('div');
            div.className = 'boot-line';
            boot.appendChild(div);
            const text = lines[i];
            let c = 0;
            (function type() {
                if (c <= text.length) {
                    div.textContent = text.slice(0, c);
                    c++;
                    setTimeout(type, 14);
                } else {
                    const ok = document.createElement('span');
                    ok.className = 'ok';
                    ok.textContent = ' OK';
                    div.appendChild(ok);
                    i++;
                    setTimeout(next, 120);
                }
            })();
        }
        next();
    }

    /* ----------------------------------------------------------
       CONTACT FORM (mailto)
    ---------------------------------------------------------- */
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        const status = form.querySelector('.form-status');
        form.addEventListener('submit', e => {
            e.preventDefault();
            const d = new FormData(form);
            const first = (d.get('first_name') || '').toString().trim();
            const last = (d.get('last_name') || '').toString().trim();
            const email = (d.get('email') || '').toString().trim();
            const message = (d.get('message') || '').toString().trim();
            const subject = `Portfolio contact — ${first} ${last}`.trim();
            const body = `${message}\n\n— ${first} ${last}\n${email}`;
            window.location.href = `mailto:anirudhgoyal.iitd@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            if (status) {
                status.textContent = '> opening mail client…';
                setTimeout(() => { status.textContent = ''; }, 4000);
            }
        });
    }
})();
