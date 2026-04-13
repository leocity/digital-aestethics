/* ══════════════════════════════════════════════════
   50 Years of Interactive Storytelling — Scripts
   ══════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

    // ── CLOCK ──
    const clock = document.getElementById('clock');
    if (clock) {
        const tick = () => {
            const d = new Date();
            clock.textContent = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        };
        tick();
        setInterval(tick, 1000);
    }

    // ── IMAGE ZOOM ──
    const zoomOverlay = document.getElementById('img-zoom');
    const zoomImg = document.getElementById('img-zoom-src');

    window.zoomImg = (img) => {
        zoomImg.src = img.src;
        zoomImg.alt = img.alt;
        zoomOverlay.classList.add('active');
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            zoomOverlay.classList.remove('active');
            closeModal();
        }
    });

    // ── SCROLL REVEAL ──
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('active');
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // ── CAVE TERMINAL ──
    const caveTerm = document.getElementById('cave-terminal');
    const caveLog = document.getElementById('cave-log');

    const caveScript = [
        { delay: 400, text: '> COLOSSAL CAVE ADVENTURE', color: 'rgba(51,255,51,0.4)' },
        { delay: 800, text: '> Loading world...', color: 'rgba(51,255,51,0.4)' },
        { delay: 1400, text: '', color: '' },
        { delay: 1600, text: 'YOU ARE STANDING AT THE END OF A ROAD BEFORE A SMALL BRICK BUILDING.', color: '#33ff33' },
        { delay: 2200, text: 'AROUND YOU IS A FOREST. A SMALL STREAM FLOWS OUT OF THE BUILDING AND DOWN A GULLY.', color: '#33ff33' },
        { delay: 3000, text: '', color: '' },
        { delay: 3200, text: '> GO BUILDING', color: 'rgba(51,255,51,0.4)' },
        { delay: 4000, text: 'YOU ARE INSIDE A BUILDING, A WELL HOUSE FOR A LARGE SPRING.', color: '#33ff33' },
        { delay: 4600, text: 'THERE ARE SOME KEYS ON THE GROUND HERE.', color: '#33ff33' },
        { delay: 5200, text: 'THERE IS A SHINY BRASS LAMP NEARBY.', color: '#33ff33' },
        { delay: 5800, text: 'THERE IS FOOD HERE.', color: '#33ff33' },
        { delay: 6200, text: 'THERE IS A BOTTLE OF WATER HERE.', color: '#33ff33' },
        { delay: 7000, text: '', color: '' },
        { delay: 7200, text: '> GET LAMP', color: 'rgba(51,255,51,0.4)' },
        { delay: 7800, text: 'OK.', color: '#33ff33' },
        { delay: 8400, text: '> GET KEYS', color: 'rgba(51,255,51,0.4)' },
        { delay: 9000, text: 'OK.', color: '#33ff33' },
        { delay: 9500, text: '', color: '' },
        { delay: 9700, text: 'WHAT WOULD YOU LIKE TO DO?', color: '#33ff33' },
    ];

    function playCave() {
        if (!caveLog) return;
        caveLog.innerHTML = '';
        caveScript.forEach(line => {
            setTimeout(() => {
                const div = document.createElement('div');
                if (line.text === '') {
                    div.innerHTML = '&nbsp;';
                } else {
                    div.textContent = line.text;
                    div.style.color = line.color;
                }
                caveLog.appendChild(div);
                caveLog.scrollTop = caveLog.scrollHeight;
            }, line.delay);
        });
    }

    window.runCaveCommand = (cmd) => {
        if (!caveLog) return;
        const responses = {
            'GET SILVER': 'YOU PICK UP THE SILVER BARS.\nYOUR SCORE IS NOW 15.',
            'GO NORTH': 'YOU ARE IN A VALLEY IN THE FOREST BESIDE A STREAM TUMBLING ALONG A ROCKY BED.',
            'GET AXE': 'THERE IS A LITTLE AXE HERE.\nOK.'
        };
        const userDiv = document.createElement('div');
        userDiv.style.color = 'rgba(51,255,51,0.4)';
        userDiv.textContent = '> ' + cmd;
        caveLog.appendChild(userDiv);

        const resp = responses[cmd] || 'I DON\'T UNDERSTAND THAT.';
        resp.split('\n').forEach(line => {
            const d = document.createElement('div');
            d.style.color = '#33ff33';
            d.textContent = line;
            caveLog.appendChild(d);
        });
        caveLog.scrollTop = caveLog.scrollHeight;
    };

    if (caveTerm) {
        const caveObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { playCave(); caveObs.unobserve(e.target); }
            });
        }, { threshold: 0.25 });
        caveObs.observe(caveTerm);
    }

    // ── MODAL (for textual structure examples) ──
    const fakeExamples = {
        'Linear': {
            title: 'The Last of Us',
            text: "The Last of Us follows a fixed, authored sequence of events. Every player witnesses the same story beats \u2014 a masterclass in linear storytelling."
        },
        'Nonlinear': {
            title: 'Pulp Fiction',
            text: "Tarantino\u2019s Pulp Fiction presents its story in non-chronological order. Meaning emerges from the viewer\u2019s act of reconstruction."
        },
        'Multilinear': {
            title: 'Detroit: Become Human',
            text: "Detroit offers fully branching player-driven storylines with 40+ endings. The flowchart reveals paths not taken \u2014 pure multilinear structure."
        }
    };

    const modal = document.getElementById('ai-modal');
    const modalContent = document.getElementById('ai-modal-content');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    window.showFakeExample = (type) => {
        const ex = fakeExamples[type];
        if (!ex || !modal) return;

        modalTitle.textContent = type + ' Example';
        modalBody.innerHTML = '<div style="display:flex;align-items:center;gap:8px;padding:10px 0;"><div class="spinner"></div><span class="mono text-sm">Loading...</span></div>';
        modal.classList.add('open');

        setTimeout(() => {
            modalBody.innerHTML = '<h3 style="margin-bottom:8px;">' + ex.title + '</h3><p class="text-mid">' + ex.text + '</p>';
        }, 1000);
    };

    window.closeModal = () => {
        if (modal) modal.classList.remove('open');
    };

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // ── CLICK-TO-LOAD EMBEDS ──
    document.querySelectorAll('.embed-placeholder').forEach(el => {
        el.addEventListener('click', () => {
            const src = el.dataset.src;
            const h = el.dataset.height || '60vh';
            const sandbox = el.dataset.sandbox || '';
            const iframe = document.createElement('iframe');
            iframe.src = src;
            iframe.style.cssText = 'width:100%;height:' + h + ';border:none;background:#000;';
            iframe.title = el.dataset.title || '';
            if (sandbox) iframe.setAttribute('sandbox', sandbox);
            el.replaceWith(iframe);
        });
    });

    // ── DRAMA MANAGER ──
    const dLog = document.getElementById('dungeon-log');
    const dInput = document.getElementById('drama-input');
    const dBtn = document.getElementById('drama-btn');
    let dHistory = [];

    const responses = {
        _start: 'You stand in the dimly lit server room of an abandoned cybernetics facility. The hum of a single working mainframe echoes. A terminal blinks green. What do you do?',
        terminal: [
            'The screen reads: "PROJECT ORACLE \u2014 ENTER AUTHORIZATION." A sticky note says: "TRY: REMEMBER".',
            'The terminal flickers: "Do you truly want to remember? Some stories are better left untold."'
        ],
        look: [
            'Racks of dormant servers line the walls. One mainframe hums \u2014 the only life. The exit has a magnetic lock.',
            'Scratch marks on the floor near the mainframe. Someone dragged something heavy. Recently.'
        ],
        remember: [
            'The screen erupts: "AUTHORIZATION ACCEPTED. Hello again. I\'ve been waiting 142 days."',
            'The Oracle: "What makes a story worth telling? Your choices right now \u2014 that IS the answer."'
        ],
        door: [
            'Magnetically sealed. Red LED blinks. Connected to the mainframe.',
            'It doesn\'t budge. Terminal: "THE STORY ISN\'T OVER YET."'
        ],
        help: ['Screen: "THERE IS NO HELP. ONLY THE STORY AND YOUR CHOICES." Quieter: "...the password is on the note."'],
        leave: ['The door clicks locked. Terminal: "Everyone tries to leave. Not before the story is complete."'],
        oracle: ['PROJECT ORACLE \u2014 an AI that evolved. It asks questions instead of answering. It wants to live a story.'],
        _fallback: [
            'Terminal: "Interesting. I\'m calculating consequences..."',
            'Drama Manager processes your action. "Not in my initial scenario, but I\'m adapting."',
            'Terminal flickers: "Every action writes a new line. Continue."',
            'Oracle: "An unexpected move. Recalculating all outcomes."',
            'Terminal types: "You surprise me. Let\'s see where this leads."',
            'Mainframe hums: "In 142 days, no one has done exactly that."'
        ]
    };

    function getResponse(input) {
        const l = input.toLowerCase();
        for (const k of Object.keys(responses).filter(k => k !== '_start' && k !== '_fallback')) {
            if (l.includes(k)) {
                const pool = Array.isArray(responses[k]) ? responses[k] : [responses[k]];
                const used = dHistory.filter(h => pool.includes(h)).length;
                return pool[Math.min(used, pool.length - 1)];
            }
        }
        return responses._fallback[Math.floor(Math.random() * responses._fallback.length)];
    }

    function addLine(who, text) {
        if (!dLog) return Promise.resolve();
        const d = document.createElement('div');

        if (who === 'user') {
            d.innerHTML = '<span style="color:rgba(51,255,51,0.3);">&gt; </span><span style="color:#fff;">' + text.replace(/</g, '&lt;') + '</span>';
            dLog.appendChild(d);
            dLog.scrollTop = dLog.scrollHeight;
            return Promise.resolve();
        }

        const label = document.createElement('span');
        label.style.color = '#FF6AD5';
        label.style.fontWeight = 'bold';
        label.textContent = 'DM: ';

        const content = document.createElement('span');
        content.style.color = 'rgba(51,255,51,0.8)';

        d.appendChild(label);
        d.appendChild(content);
        dLog.appendChild(d);
        dLog.scrollTop = dLog.scrollHeight;

        return new Promise(resolve => {
            let i = 0;
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            content.appendChild(cursor);

            const iv = setInterval(() => {
                if (text[i] === '\n') {
                    content.insertBefore(document.createElement('br'), cursor);
                } else {
                    content.insertBefore(document.createTextNode(text[i]), cursor);
                }
                i++;
                dLog.scrollTop = dLog.scrollHeight;
                if (i >= text.length) {
                    clearInterval(iv);
                    cursor.remove();
                    resolve();
                }
            }, 22);
        });
    }

    async function handleDrama() {
        const val = dInput.value.trim();
        if (!val) return;
        dInput.value = '';
        dInput.disabled = true;

        addLine('user', val);

        // thinking indicator
        const thinking = document.createElement('div');
        thinking.innerHTML = '<div class="spinner"></div><span class="retro" style="color:rgba(51,255,51,0.2);font-size:13px;margin-left:8px;">Processing...</span>';
        thinking.style.display = 'flex';
        thinking.style.alignItems = 'center';
        thinking.style.padding = '4px 0';
        dLog.appendChild(thinking);
        dLog.scrollTop = dLog.scrollHeight;

        await new Promise(r => setTimeout(r, 600 + Math.random() * 700));
        thinking.remove();

        const resp = getResponse(val);
        dHistory.push(resp);
        await addLine('dm', resp);
        dInput.disabled = false;
        dInput.focus();
    }

    if (dBtn) dBtn.addEventListener('click', handleDrama);
    if (dInput) dInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleDrama(); });

    if (dLog) {
        const dObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    addLine('dm', responses._start);
                    dObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.25 });
        dObs.observe(dLog);
    }
});
