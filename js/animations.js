/* ================================================
   PARALLEL FUTURES — GSAP Animations
   ================================================ */

function initAnimations() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    /*  MASTER SCROLL ARCHITECTURE
        ===========================
        One single pinned container (#heroContainer) = 4000px of scroll distance.
        
        Stage 1 — Title Morph (0–1200px / duration 0–1.2):
            Title text shrinks, backgrounds cross-fade, "1990" appears.
        
        Stage 2 — Box Reveal (1200–1600px / duration 1.2–1.6):
            Data boxes fade in independently. Year, backgrounds stay fixed.
        
        Stage 3 — Year Progression (1600–4000px / duration 1.6–4.0):
            Years advance 2000→2026, images/cards swap.
    */
    const masterHeroTL = gsap.timeline({
        scrollTrigger: {
            trigger: '#heroContainer',
            start: 'top top',
            end: '+=4000',
            pin: true,
            scrub: 1,
            anticipatePin: 1
        }
    });

    // ===== STAGE 1: CINEMATIC TITLE MORPH =====
    buildStage1_TitleMorph(masterHeroTL);

    // ===== STAGE 2: BOX REVEAL =====
    buildStage2_BoxReveal(masterHeroTL);

    // ===== STAGE 3: YEAR PROGRESSION =====
    buildStage3_YearProgression(masterHeroTL);

    // ===== REMAINING SECTIONS =====
    animateIntro();
    animateTimeline2005();
    animateTimeline2015();
    animatePandemic();
    animatePresent2026();
    animateNumbers();
    animateHumanStory();
    animateSolutions();
    animateFinal();
    animateDataCards();
    animateCounters();
}

// =========================================================================
//  STAGE 1: Title text morphs, gradient fades out to reveal hero backgrounds
//  Total scroll window: 0 → 4000
//  Stage duration: 0 → 0.4 (approx 10% of total scroll)
// =========================================================================
function buildStage1_TitleMorph(tl) {
    const label = document.getElementById('titleLabel');
    const heading = document.getElementById('titleHeading');
    const subheading = document.getElementById('titleSubheading');
    const scrollPrompt = document.getElementById('titleScrollPrompt');
    const titleBg = document.getElementById('titleBg');
    const morphYear = document.getElementById('yearDisplayAnchor');

    if (!label) return;

    // --- Initial entry animation (page load, no scroll) ---
    const entryTL = gsap.timeline({ delay: 0.5 });
    entryTL
        .to(label, { opacity: 1, duration: 0.8, ease: 'power2.out' })
        .to('#titleHeading .word', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
        .to(subheading, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .to(scrollPrompt, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2');

    // --- Scroll-driven morph ---

    // 0–0.1: Supporting text fades out fast
    tl.to([label, scrollPrompt], { opacity: 0, duration: 0.1, ease: 'power1.in' }, 0);

    // 0–0.4: Heading shrinks and moves to TOP position (above year)
    // We move it to -35vh so it sits clearly above the year at 28vh
    tl.to(heading, { scale: 0.35, y: '-35vh', duration: 0.4, ease: 'power2.inOut' }, 0);

    // 0–0.4: Subheading fades out
    tl.to(subheading, { opacity: 0, duration: 0.2 }, 0);

    // 0.05–0.35: Title gradient bg fades out to reveal the #hero backgrounds already sitting behind it
    tl.to(titleBg, { opacity: 0, filter: 'blur(12px)', duration: 0.3, ease: 'power2.in' }, 0.05);

    // 0.25–0.4: morphYear "1990" settles at 28vh (controlled by CSS)
    tl.fromTo(morphYear, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.15, ease: 'back.out(1.7)' }, 0.25);

    // Disable pointer events so we can interact with hero timeline below
    tl.set('#titleIntro', { pointerEvents: 'none' }, 0.4);
}

// =========================================================================
//  STAGE 2: Data boxes fade in independently while everything stays put
//  Stage duration: 0.4 → 1.2 (approx 10% → 30% of total scroll)
// =========================================================================
function buildStage2_BoxReveal(tl) {
    const urbanStates = document.querySelector('#thUrbanStates');
    const ruralStates = document.querySelector('#thRuralStates');

    if (!urbanStates || !ruralStates) return;

    // Reset initial state
    gsap.set([urbanStates, ruralStates], { opacity: 0, y: 40 });

    // 0.5–0.9: Urban box fades in independently
    tl.to(urbanStates, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.5);

    // 0.7–1.1: Rural box fades in independently (staggered)
    tl.to(ruralStates, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.7);

    // 1.1–1.2: Hold — confirm setup before year progression
    tl.to({}, { duration: 0.1 }, 1.1);
}

// =========================================================================
//  STAGE 3: Year progression 2000 → 2026 with image/card swaps
//  Stage duration: 1.2 → 4.0 (30% → 100% of total scroll)
// =========================================================================
function buildStage3_YearProgression(tl) {
    const section = document.getElementById('hero');
    if (!section) return;

    const yearAnchor = document.getElementById('yearDisplayAnchor');
    const urbanStates = section.querySelectorAll('#thUrbanStates .th-state');
    const ruralStates = section.querySelectorAll('#thRuralStates .th-state');
    const divider = document.getElementById('thDivider');
    const progressFill = document.getElementById('thProgressFill');
    const progressLabels = section.querySelectorAll('.th-progress-labels span');
    const scrollIndicator = section.querySelector('.th-scroll-indicator');
    const urbanEraImgs = section.querySelectorAll('#thUrban .hero__era-image');
    const ruralEraImgs = section.querySelectorAll('#thRural .hero__era-image');

    // Milestones adjusted for stage timings
    const yearMilestones = [
        { year: '2000', progress: 0.15, urbanState: 1, ruralState: 0 },
        { year: '2005', progress: 0.32, urbanState: 1, ruralState: 1 },
        { year: '2010', progress: 0.48, urbanState: 2, ruralState: 1 },
        { year: '2015', progress: 0.65, urbanState: 3, ruralState: 2 },
        { year: '2020', progress: 0.82, urbanState: 4, ruralState: 3 },
        { year: '2026', progress: 1.00, urbanState: 4, ruralState: 4 }
    ];

    let currentYearIndex = -1;
    let currentUrbanState = 0;
    let currentRuralState = 0;

    function setActiveState(states, index) {
        states.forEach((s, i) => {
            s.classList.toggle('th-state--active', i === index);
        });
    }

    function setActiveEra(eraImgs, index) {
        eraImgs.forEach((img, i) => {
            img.classList.toggle('era-active', i === index);
        });
    }

    function getNearestMilestone(progress) {
        let best = -1;
        for (let i = 0; i < yearMilestones.length; i++) {
            if (progress >= yearMilestones[i].progress - 0.05) {
                best = i;
            }
        }
        return best;
    }

    const dummy = { p: 0 };
    tl.to(dummy, {
        p: 1,
        duration: 2.8, // 1.2 to 4.0
        ease: 'none',
        onUpdate: () => {
            const progress = dummy.p;
            if (scrollIndicator) scrollIndicator.classList.toggle('visible', progress > 0.01);

            const milestoneIdx = getNearestMilestone(progress);
            if (milestoneIdx !== currentYearIndex) {
                currentYearIndex = milestoneIdx;

                if (yearAnchor) {
                    const newYearText = milestoneIdx >= 0 ? yearMilestones[milestoneIdx].year : '1990';
                    // Text swap effect on an inner element to prevent GSAP overwrite conflicts with the master timeline
                    if (yearAnchor.innerText.trim() !== newYearText) {
                        let innerSpan = yearAnchor.querySelector('.year-inner');
                        if (!innerSpan) {
                            innerSpan = document.createElement('span');
                            innerSpan.className = 'year-inner';
                            // display inline-block is required to animate scale on a span
                            innerSpan.style.display = 'inline-block';
                            innerSpan.innerText = yearAnchor.innerText;
                            yearAnchor.innerHTML = '';
                            yearAnchor.appendChild(innerSpan);
                        }

                        gsap.to(innerSpan, {
                            opacity: 0,
                            scale: 1.05,
                            duration: 0.15,
                            ease: 'power1.in',
                            onComplete: () => {
                                innerSpan.innerText = newYearText;
                                gsap.fromTo(innerSpan,
                                    { opacity: 0, scale: 1.1 },
                                    { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(1.5)', overwrite: true }
                                );
                            }
                        });
                    }
                }
            }

            if (milestoneIdx >= 0) {
                const m = yearMilestones[milestoneIdx];
                if (m.urbanState !== currentUrbanState) {
                    currentUrbanState = m.urbanState;
                    setActiveState(urbanStates, currentUrbanState);
                    setActiveEra(urbanEraImgs, currentUrbanState);
                }
                if (m.ruralState !== currentRuralState) {
                    currentRuralState = m.ruralState;
                    setActiveState(ruralStates, currentRuralState);
                    setActiveEra(ruralEraImgs, currentRuralState);
                }
            } else {
                if (currentUrbanState !== 0) {
                    currentUrbanState = 0;
                    setActiveState(urbanStates, 0);
                    setActiveEra(urbanEraImgs, 0);
                }
                if (currentRuralState !== 0) {
                    currentRuralState = 0;
                    setActiveState(ruralStates, 0);
                    setActiveEra(ruralEraImgs, 0);
                }
            }

            const activeUrban = section.querySelector('#thUrban .hero__era-image.era-active');
            const activeRural = section.querySelector('#thRural .hero__era-image.era-active');
            if (activeUrban) activeUrban.style.transform = `scale(${1.05 + progress * 0.08}) translate3d(0,${-progress * 20}px,0)`;
            if (activeRural) activeRural.style.transform = `scale(${1.05 + progress * 0.04}) translate3d(0,${-progress * 8}px,0)`;

            if (divider) divider.style.left = (50 + progress * 3) + '%';
            if (progressFill) progressFill.style.width = (progress * 100) + '%';
            progressLabels.forEach((lbl, i) => lbl.classList.toggle('active', i <= milestoneIdx));
        }
    }, 1.2);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.body.classList.contains('reduced-motion')) {
        // Reduced motion handles gracefully natively with this approach
    }
}

// ———————— Introduction ————————
function animateIntro() {
    const paragraphs = document.querySelectorAll('#intro .editorial-text p');
    paragraphs.forEach((p, i) => {
        gsap.to(p, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: p,
                start: 'top 80%',
                end: 'top 60%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// ———————— 2005: Digital Divide ————————
function animateTimeline2005() {
    const section = document.getElementById('year-2005');
    if (!section) return;

    // Trigger chart creation
    ScrollTrigger.create({
        trigger: '#chartInternet2005',
        start: 'top 80%',
        onEnter: () => {
            if (window.PFCharts) window.PFCharts.createInternetChart2005();
        },
        once: true
    });
}

// ———————— 2015: Expanding Gap ————————
function animateTimeline2015() {
    const section = document.getElementById('year-2015');
    if (!section) return;

    // Trigger chart
    ScrollTrigger.create({
        trigger: '#chartGap2015',
        start: 'top 80%',
        onEnter: () => {
            if (window.PFCharts) window.PFCharts.createGapChart2015();
        },
        once: true
    });
}

// ———————— 2020: Pandemic ————————
function animatePandemic() {
    const section = document.getElementById('year-2020');
    if (!section) return;

    // Quote reveal
    const quote = document.getElementById('pandemicQuote');
    if (quote) {
        gsap.to(quote, {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: quote,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // Darken rural side on scroll
    gsap.to('#year-2020 .split-content__side--rural', {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        scrollTrigger: {
            trigger: '#year-2020 .split-content',
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: 1
        }
    });
}

// ———————— 2026: Present Day ————————
function animatePresent2026() {
    const section = document.getElementById('year-2026');
    if (!section) return;

    // Symbolic shift — urban side grows slightly
    const splitEl = document.getElementById('splitShift2026');
    if (splitEl) {
        gsap.to('#splitShift2026', {
            scrollTrigger: {
                trigger: splitEl,
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: 1
            },
            gridTemplateColumns: '1.2fr 0.8fr',
            ease: 'none'
        });
    }
}

// ———————— By The Numbers ————————
function animateNumbers() {
    const chartMap = {
        'chartDropout': 'createDropoutChart',
        'chartTeacher': 'createTeacherChart',
        'chartInternet': 'createInternetAccessChart',
        'chartEnrollment': 'createEnrollmentChart'
    };

    Object.entries(chartMap).forEach(([id, fn]) => {
        ScrollTrigger.create({
            trigger: `#${id}`,
            start: 'top 85%',
            onEnter: () => {
                if (window.PFCharts && window.PFCharts[fn]) {
                    window.PFCharts[fn]();
                }
            },
            once: true
        });
    });

    // Stat panels fade in staggered
    gsap.from('.stat-panel', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#numbers .stats-grid',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
}

// ———————— Human Story ————————
function animateHumanStory() {
    // Parallax on photo items
    document.querySelectorAll('.photo-essay__item').forEach(item => {
        gsap.from(item, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Quote fade-in
    document.querySelectorAll('.photo-essay__caption .quote').forEach(q => {
        gsap.to(q, {
            opacity: 1,
            duration: 1,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: q,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// ———————— Solutions ————————
function animateSolutions() {
    document.querySelectorAll('.solution-card').forEach((card, i) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// ———————— Final Spread ————————
function animateFinal() {
    const finalSection = document.getElementById('final');
    if (!finalSection) return;

    gsap.from('#finalHeadline', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: finalSection,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.from('.final-section__closing', {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: finalSection,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.from('.cta-button', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: finalSection,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
        }
    });
}

// ———————— Data Cards — Clip-path Reveal ————————
function animateDataCards() {
    document.querySelectorAll('.data-card[data-reveal]').forEach((card) => {
        gsap.to(card, {
            opacity: 1,
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// ———————— Animated Counters ————————
function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.dataset.target, 10);

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            onEnter: () => {
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: () => {
                        counter.textContent = Math.round(obj.val).toLocaleString();
                    }
                });
            },
            once: true
        });
    });
}

// Export
window.initAnimations = initAnimations;
