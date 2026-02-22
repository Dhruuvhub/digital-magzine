/* ================================================
   PARALLEL FUTURES — Main Application
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ===== CUSTOM CURSOR =====
    initCursor();

    // ===== PROGRESS BAR =====
    initProgressBar();

    // ===== SECTION NAVIGATION =====
    initSectionNav();

    // ===== ACCESSIBILITY TOGGLES =====
    initA11y();

    // ===== CALCULATOR =====
    initCalculator();

    // Wait for GSAP to be loaded, then init animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        window.initAnimations();
    } else {
        // Fallback: wait for scripts to load
        window.addEventListener('load', () => {
            if (typeof gsap !== 'undefined') {
                window.initAnimations();
            }
        });
    }
});

// ———————— Custom Cursor ————————
function initCursor() {
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');
    if (!cursor || !cursorDot) return;

    // Check if touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth lag effect using requestAnimationFrame
    function updateCursor() {
        // Cursor ring follows with lag
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Dot follows more closely
        dotX += (mouseX - dotX) * 0.6;
        dotY += (mouseY - dotY) * 0.6;
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, select, input, .section-nav__dot, .solution-card, .stat-panel');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

// ———————— Progress Bar ————————
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ———————— Section Navigation ————————
function initSectionNav() {
    const nav = document.getElementById('sectionNav');
    const dots = document.querySelectorAll('.section-nav__dot');
    const sections = document.querySelectorAll('.page-section[data-section]');
    if (!nav || !dots.length || !sections.length) return;

    // Show nav after scrolling past hero
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 0.5) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }
    });

    // Update active dot on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                const sectionIndex = entry.target.dataset.section;
                dots.forEach(d => d.classList.remove('active'));
                dots[sectionIndex]?.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));

    // Click to scroll to section
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetId = dot.dataset.target;
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ———————— Accessibility ————————
function initA11y() {
    const contrastToggle = document.getElementById('contrastToggle');
    const motionToggle = document.getElementById('motionToggle');

    if (contrastToggle) {
        contrastToggle.addEventListener('click', () => {
            const isHigh = document.documentElement.getAttribute('data-theme') === 'high-contrast';
            document.documentElement.setAttribute('data-theme', isHigh ? '' : 'high-contrast');
            contrastToggle.textContent = isHigh ? '◑' : '◐';
        });
    }

    if (motionToggle) {
        motionToggle.addEventListener('click', () => {
            document.body.classList.toggle('reduced-motion');
            const isReduced = document.body.classList.contains('reduced-motion');
            motionToggle.textContent = isReduced ? '▶' : '⏸';
        });
    }
}

// ———————— Education Access Index Calculator ————————
function initCalculator() {
    const form = document.getElementById('calcForm');
    const result = document.getElementById('calcResult');
    const scoreEl = document.getElementById('calcScore');
    const labelEl = document.getElementById('calcLabel');
    const comparisonEl = document.getElementById('calcComparison');
    const teacherRange = document.getElementById('teacherRatio');
    const teacherValEl = document.getElementById('teacherRatioVal');

    if (!form) return;

    // Update range display
    if (teacherRange && teacherValEl) {
        teacherRange.addEventListener('input', () => {
            teacherValEl.textContent = '1:' + teacherRange.value;
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Gather inputs
        const location = document.getElementById('locationType').value;
        const device = document.getElementById('deviceAccess').value;
        const internet = document.getElementById('internetAccess').value;
        const teacherRatio = parseInt(document.getElementById('teacherRatio').value, 10);
        const distance = document.getElementById('schoolDistance').value;

        if (!location || !device || !internet || !distance) {
            alert('Please fill all fields to calculate your score.');
            return;
        }

        // Scoring logic
        let score = 0;

        // Location scoring (0-25)
        const locationScores = { 'metro': 25, 'urban': 20, 'semi-urban': 14, 'rural': 8, 'remote': 3 };
        score += locationScores[location] || 0;

        // Device scoring (0-25)
        const deviceScores = { 'multi': 25, 'single-smart': 18, 'shared': 10, 'none': 2 };
        score += deviceScores[device] || 0;

        // Internet scoring (0-25)
        const internetScores = { 'broadband': 25, 'mobile-data': 18, 'intermittent': 10, 'none': 2 };
        score += internetScores[internet] || 0;

        // Teacher ratio scoring (0-15)
        if (teacherRatio <= 20) score += 15;
        else if (teacherRatio <= 30) score += 11;
        else if (teacherRatio <= 45) score += 7;
        else if (teacherRatio <= 60) score += 4;
        else score += 1;

        // Distance scoring (0-10)
        const distanceScores = { 'nearby': 10, 'walkable': 7, 'far': 4, 'very-far': 1 };
        score += distanceScores[distance] || 0;

        // Determine color and label
        let colorClass, labelText, comparison;
        const nationalAvg = 52;

        if (score >= 75) {
            colorClass = 'score-high';
            labelText = 'High Access — Well above average';
            comparison = `Your score of ${score}/100 is ${score - nationalAvg} points above the national average of ${nationalAvg}.`;
        } else if (score >= 45) {
            colorClass = 'score-mid';
            labelText = 'Moderate Access — Near national average';
            const diff = score >= nationalAvg
                ? `${score - nationalAvg} points above`
                : `${nationalAvg - score} points below`;
            comparison = `Your score of ${score}/100 is ${diff} the national average of ${nationalAvg}.`;
        } else {
            colorClass = 'score-low';
            labelText = 'Low Access — Below national average';
            comparison = `Your score of ${score}/100 is ${nationalAvg - score} points below the national average of ${nationalAvg}. This reflects the systemic challenges faced by millions of students.`;
        }

        // Display result
        scoreEl.textContent = score + '/100';
        scoreEl.className = 'calc-result__score ' + colorClass;
        labelEl.textContent = labelText;
        comparisonEl.textContent = comparison;
        result.classList.add('visible');

        // Scroll to result
        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}
