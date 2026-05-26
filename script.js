/* =============================================================
   ANIRUDH GOYAL — BENTO PORTFOLIO (multi-page)
   ============================================================= */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initTheme();
        initActiveDock();
        initClock();
        initTypingEffect();
        initTileGlow();
        initTileReveal();
        initContactForm();
    }

    /* ─── Theme ─── */
    function initTheme() {
        const btn = document.getElementById('theme-toggle');
        const stored = localStorage.getItem('theme');
        if (stored === 'light') document.body.classList.add('light');
        updateIcon();

        if (!btn) return;
        btn.addEventListener('click', () => {
            document.body.classList.toggle('light');
            localStorage.setItem('theme',
                document.body.classList.contains('light') ? 'light' : 'dark');
            updateIcon();
        });

        function updateIcon() {
            if (!btn) return;
            const isLight = document.body.classList.contains('light');
            btn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            btn.setAttribute('aria-label', isLight ? 'Switch to dark' : 'Switch to light');
        }
    }

    /* ─── Active dock state ─── */
    function initActiveDock() {
        const path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
        document.querySelectorAll('.dock a').forEach(a => {
            const href = (a.getAttribute('href') || '').toLowerCase();
            if (href === path || (path === '' && href === 'index.html')) {
                a.classList.add('active');
            }
        });
    }

    /* ─── Live IST clock ─── */
    function initClock() {
        const el = document.getElementById('clock');
        if (!el) return;

        function update() {
            const now = new Date();
            // Render in IST (Asia/Kolkata)
            const fmt = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            el.textContent = fmt.format(now);
        }
        update();
        setInterval(update, 30000);
    }

    /* ─── Typing effect ─── */
    function initTypingEffect() {
        const el = document.getElementById('typed');
        if (!el) return;

        const phrases = [
            'forecasting systems',
            'CV pipelines',
            'RAG tools',
            'XGBoost models',
            'things that ship'
        ];
        let p = 0, c = 0, deleting = false;

        function tick() {
            const phrase = phrases[p];
            if (!deleting) {
                el.textContent = phrase.slice(0, c + 1);
                c++;
                if (c === phrase.length) {
                    deleting = true;
                    setTimeout(tick, 1800);
                    return;
                }
            } else {
                el.textContent = phrase.slice(0, c - 1);
                c--;
                if (c === 0) {
                    deleting = false;
                    p = (p + 1) % phrases.length;
                }
            }
            setTimeout(tick, deleting ? 35 : 65);
        }
        // initial: show first char immediately so layout is stable
        el.textContent = phrases[0][0];
        c = 1;
        setTimeout(tick, 700);
    }

    /* ─── Tile cursor glow ─── */
    function initTileGlow() {
        document.querySelectorAll('.tile.interactive').forEach(tile => {
            tile.addEventListener('mousemove', e => {
                const r = tile.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                tile.style.setProperty('--mx', x + '%');
                tile.style.setProperty('--my', y + '%');
            });
        });
    }

    /* ─── Staggered tile reveal on intersection ─── */
    function initTileReveal() {
        const tiles = document.querySelectorAll('.tile');

        // Fail-safe: if anything goes wrong, reveal all tiles after 1.5s
        const failSafe = setTimeout(() => {
            tiles.forEach(t => t.classList.add('in-view'));
        }, 1500);

        if (!('IntersectionObserver' in window)) {
            clearTimeout(failSafe);
            tiles.forEach(t => t.classList.add('in-view'));
            return;
        }

        const revealed = new WeakSet();
        let revealCount = 0;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !revealed.has(entry.target)) {
                    revealed.add(entry.target);
                    // Stagger the reveal
                    const delay = Math.min(revealCount * 50, 600);
                    revealCount++;
                    setTimeout(() => entry.target.classList.add('in-view'), delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -50px 0px', threshold: 0.05 });

        tiles.forEach(tile => observer.observe(tile));

        // Clear failsafe once everything is set up
        // (it'll still fire if a tile is below the fold and never scrolled to,
        //  but those tiles ARE observed and will reveal on scroll)
    }

    /* ─── Contact form (mailto) ─── */
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        const status = form.querySelector('.form-status');

        form.addEventListener('submit', e => {
            e.preventDefault();
            const data = new FormData(form);
            const first = (data.get('first_name') || '').toString().trim();
            const last = (data.get('last_name') || '').toString().trim();
            const email = (data.get('email') || '').toString().trim();
            const message = (data.get('message') || '').toString().trim();

            const subject = `Hello from ${first} ${last}`.trim();
            const body = `${message}\n\n— ${first} ${last}\n${email}`;
            const mailto = `mailto:anirudhgoyal.iitd@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailto;
            if (status) {
                status.textContent = '✓ Opening your email client…';
                setTimeout(() => { status.textContent = ''; }, 4000);
            }
        });
    }
})();
