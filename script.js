document.addEventListener('DOMContentLoaded', () => {
    // expose header height to CSS so hero min-height/padding can account for the sticky header
    const setHeaderHeightVar = () => {
        const header = document.querySelector('.site-header');
        const h = header ? header.getBoundingClientRect().height : 64;
        document.documentElement.style.setProperty('--header-height', Math.round(h) + 'px');
    };
    setHeaderHeightVar();
    window.addEventListener('resize', () => setHeaderHeightVar());

    // --- Theme Toggle Logic ---
    const themeToggleButton = document.getElementById('themeToggle');
    if (themeToggleButton) {
        const STORAGE_KEY = 'site-theme';
        const body = document.body;

        const applyTheme = (theme) => {
            if (theme === 'light') {
                body.classList.add('light-mode');
                themeToggleButton.textContent = '🌙'; // Moon for light mode
                themeToggleButton.setAttribute('aria-pressed', 'true');
            } else {
                body.classList.remove('light-mode');
                themeToggleButton.textContent = '☀️'; // Sun for dark mode
                themeToggleButton.setAttribute('aria-pressed', 'false');
            }
        };

        themeToggleButton.addEventListener('click', () => {
            const isLight = body.classList.toggle('light-mode');
            const theme = isLight ? 'light' : 'dark';
            localStorage.setItem(STORAGE_KEY, theme);
            applyTheme(theme);
        });

        // Apply saved theme or detect OS preference
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            applyTheme('light');
        } else {
            applyTheme('dark'); // Default
        }
    }

    // --- Dual Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    if (cursorDot && cursorRing) {
        const clickableElements = document.querySelectorAll('a, button');
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const followMouse = () => {
            cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
            ringX += (mouseX - ringX) * 0.2;
            ringY += (mouseY - ringY) * 0.2;
            cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
            requestAnimationFrame(followMouse);
        };
        followMouse();

        clickableElements.forEach(el => {
            el.addEventListener('mouseover', () => cursorRing.classList.add('hover-effect'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover-effect'));
        });
    }

        // --- Contact Form (validation + simulated submit) ---
        (function contactForm(){
            const form = document.getElementById('contactForm');
            if (!form) return;

            const statusEl = form.querySelector('.form-status');

            // Helper: create or return an inline error element for a given input
            function getErrorEl(input){
                let id = input.id + '-error';
                let existing = form.querySelector('#' + id);
                if (existing) return existing;
                const el = document.createElement('div');
                el.className = 'field-error';
                el.id = id;
                el.setAttribute('aria-hidden', 'true');
                input.insertAdjacentElement('afterend', el);
                return el;
            }

            function clearError(input){
                input.removeAttribute('aria-invalid');
                const err = form.querySelector('#' + input.id + '-error');
                if (err) { err.textContent = ''; err.setAttribute('aria-hidden', 'true'); }
            }

            function showError(input, message){
                input.setAttribute('aria-invalid', 'true');
                const err = getErrorEl(input);
                err.textContent = message;
                err.setAttribute('aria-hidden', 'false');
            }

            function validate(){
                const name = form.querySelector('#name');
                const email = form.querySelector('#email');
                const message = form.querySelector('#message');
                let ok = true;
                // clear previous
                [name, email, message].forEach(i => clearError(i));

                if (!name.value.trim()){
                    showError(name, 'Please enter your name');
                    ok = false;
                }

                if (!email.value.trim()){
                    showError(email, 'Please enter your email');
                    ok = false;
                } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())){
                    showError(email, 'Please enter a valid email address');
                    ok = false;
                }

                if (!message.value.trim()){
                    showError(message, 'Please enter a message');
                    ok = false;
                } else if (message.value.trim().length < 10){
                    showError(message, 'Message must be at least 10 characters');
                    ok = false;
                }

                return ok;
            }

            async function fakeSubmit(formData){
                // Simulate network latency and success/failure
                await new Promise(r => setTimeout(r, 850));
                // For demo we always succeed. In real use replace with fetch() to backend.
                return { ok: true, message: 'Thanks — your message has been sent.' };
            }

            form.addEventListener('submit', async (ev) => {
                ev.preventDefault();
                if (!validate()){
                    statusEl.textContent = 'Please fix the highlighted fields.';
                    statusEl.classList.remove('success');
                    statusEl.classList.add('error');
                    return;
                }

                // build FormData for potential real submission
                const fd = new FormData(form);
                statusEl.textContent = 'Sending message…';
                statusEl.classList.remove('error');
                statusEl.classList.remove('success');

                try {
                    const res = await fakeSubmit(fd);
                    if (res && res.ok){
                        statusEl.textContent = res.message || 'Message sent.';
                        statusEl.classList.add('success');
                        // clear form fields and errors
                        form.reset();
                        ['name','email','message'].forEach(id => {
                            const el = form.querySelector('#' + id);
                            if (el) clearError(el);
                        });
                    } else {
                        throw new Error(res && res.message ? res.message : 'Submission failed');
                    }
                } catch(err){
                    statusEl.textContent = err.message || 'Unable to send message. Try again later.';
                    statusEl.classList.remove('success');
                    statusEl.classList.add('error');
                }
            });

            // real-time clearing of errors as user edits
            ['name','email','message'].forEach(id => {
                const el = form.querySelector('#' + id);
                if (!el) return;
                el.addEventListener('input', () => {
                    clearError(el);
                    statusEl.textContent = '';
                    statusEl.classList.remove('error');
                    statusEl.classList.remove('success');
                });
            });
    })();

});





