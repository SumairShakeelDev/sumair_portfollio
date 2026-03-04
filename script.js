/**
 * Muhammad Sumair - Portfolio
 * Entry-Level Web & Computer Professional
 * GSAP + AOS + theme, navbar, form, filters, timeline
 */

(function() {
    'use strict';

    var lastScrollY = 0;

    // ========== DOM Ready ==========
    document.addEventListener('DOMContentLoaded', function() {
        initPageLoadAnimations();
        initTyped();
        initAOS();
        initNavbar();
        initSmoothScroll();
        initHeroParallax();
        initRippleButtons();
        initCounters();
        initSkillBars();
        initSkillCardTilt();
        initProjectFilters();
        initTimelineDraw();
        initBackToTop();
        initContactForm();
        initDownloadCV();
    });

    // ========== GSAP Page load + section transitions ==========
    function initPageLoadAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        var nav = document.getElementById('mainNav');
        var heroReveals = document.querySelectorAll('.hero-reveal');
        var heroBtns = document.querySelectorAll('.hero-btns .btn-cta');
        var heroImg = document.querySelector('.hero-parallax-wrap');

        gsap.registerPlugin(ScrollTrigger);

        if (nav) {
            gsap.fromTo(nav, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
        }
        if (heroReveals.length) {
            gsap.fromTo(heroReveals, { y: 40, opacity: 0 }, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.12,
                delay: 0.2,
                ease: 'power3.out'
            });
        }
        if (heroBtns.length) {
            gsap.fromTo(heroBtns, { scale: 0.8, opacity: 0 }, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                delay: 0.9,
                ease: 'back.out(1.4)'
            });
        }
        if (heroImg) {
            gsap.fromTo(heroImg, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power3.out' });
        }

        gsap.utils.toArray('.section').forEach(function(section) {
            gsap.fromTo(section.querySelectorAll('.section-title, .title-underline'), { y: 20, opacity: 0 }, {
                scrollTrigger: { trigger: section, start: 'top 85%' },
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            });
        });
    }

    // ========== Hero mouse parallax ==========
    function initHeroParallax() {
        var hero = document.querySelector('.hero-section');
        var wrap = document.querySelector('.hero-parallax-wrap');
        if (!hero || !wrap) return;

        hero.addEventListener('mousemove', function(e) {
            var w = hero.offsetWidth;
            var h = hero.offsetHeight;
            var x = (e.clientX - w / 2) / w * 15;
            var y = (e.clientY - h / 2) / h * 15;
            wrap.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        });
        hero.addEventListener('mouseleave', function() {
            wrap.style.transform = 'translate(0, 0)';
        });
    }

    // ========== Button ripple effect ==========
    function initRippleButtons() {
        document.querySelectorAll('.btn-ripple').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.cssText = 'left:' + x + 'px;top:' + y + 'px;';
                btn.appendChild(ripple);
                setTimeout(function() { ripple.remove(); }, 600);
            });
        });
    }

    // ========== Project filter (GSAP) ==========
    function initProjectFilters() {
        var btns = document.querySelectorAll('.project-filter-btn');
        var items = document.querySelectorAll('.project-item');
        if (!btns.length || !items.length) return;

        if (typeof gsap !== 'undefined') {
            btns.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var filter = btn.getAttribute('data-filter');
                    btns.forEach(function(b) { b.classList.remove('active'); });
                    btn.classList.add('active');

                    items.forEach(function(item) {
                        var cat = item.getAttribute('data-category');
                        var show = filter === 'all' || cat === filter;
                        gsap.to(item, {
                            duration: 0.35,
                            opacity: show ? 1 : 0.3,
                            scale: show ? 1 : 0.95,
                            filter: show ? 'blur(0)' : 'blur(4px)',
                            pointerEvents: show ? 'auto' : 'none',
                            ease: 'power2.out'
                        });
                    });
                });
            });
        } else {
            btns.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var filter = btn.getAttribute('data-filter');
                    btns.forEach(function(b) { b.classList.remove('active'); });
                    btn.classList.add('active');
                    items.forEach(function(item) {
                        var cat = item.getAttribute('data-category');
                        item.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
                    });
                });
            });
        }
    }

    // ========== Experience timeline line draw ==========
    function initTimelineDraw() {
        var line = document.getElementById('expTimelineLine');
        var section = document.getElementById('experience');
        if (!line || !section) return;

        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.set(line, { scaleY: 0, transformOrigin: 'top' });
            gsap.to(line, {
                scaleY: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: section, start: 'top 80%' }
            });
        } else {
            line.style.height = '100%';
        }
    }

    // ========== Typed.js - Hero title typing ==========
    function initTyped() {
        var el = document.getElementById('typedElement');
        if (!el || typeof Typed === 'undefined') return;

        new Typed('#typedElement', {
            strings: [
                'Entry-Level Web & Computer Professional',
                'Web Designer',
                'Graphic Designer'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2500,
            startDelay: 600,
            loop: true,
            showCursor: true
        });
    }

    // ========== AOS scroll animations ==========
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 700,
                easing: 'ease-out',
                once: true,
                offset: 80
            });
        }
    }

    // ========== Navbar scroll + active link ==========
    function initNavbar() {
        var nav = document.getElementById('mainNav');
        var links = document.querySelectorAll('.nav-link[href^="#"]');
        if (!nav) return;

        function onScroll() {
            var y = window.scrollY;
            if (y > 60) {
                nav.classList.add('scrolled');
                if (y > lastScrollY && y > 120) nav.classList.add('navbar-hidden');
                else nav.classList.remove('navbar-hidden');
            } else {
                nav.classList.remove('scrolled', 'navbar-hidden');
            }
            lastScrollY = y;

            var sections = document.querySelectorAll('section[id]');
            var current = '';
            var scrollY = y + 120;
            sections.forEach(function(section) {
                var top = section.offsetTop;
                var height = section.offsetHeight;
                if (scrollY >= top && scrollY < top + height) current = section.id;
            });
            links.forEach(function(link) {
                if (link.getAttribute('href') === '#' + current) link.classList.add('active');
                else link.classList.remove('active');
            });
        }
        window.addEventListener('scroll', onScroll);
        onScroll();
    }

    // ========== Smooth scroll for anchor links ==========
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (href === '#') return;

                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    var collapse = document.querySelector('.navbar-collapse');
                    if (collapse && collapse.classList.contains('show')) {
                        collapse.classList.remove('show');
                    }
                }
            });
        });
    }

    // ========== Animated counters (About section) ==========
    function initCounters() {
        var counters = document.querySelectorAll('.counter[data-target]');
        var aboutSection = document.getElementById('about');
        var done = false;

        function animateCounter(el) {
            var target = parseInt(el.getAttribute('data-target'), 10);
            var duration = 1500;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var ease = 1 - Math.pow(1 - progress, 3);
                var value = Math.floor(ease * target);
                el.textContent = value;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            }

            window.requestAnimationFrame(step);
        }

        function check() {
            if (!aboutSection || done) return;
            var rect = aboutSection.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                done = true;
                counters.forEach(animateCounter);
            }
        }

        window.addEventListener('scroll', check);
        check();
    }

    // ========== Skill bars animate on scroll + percentage count-up ==========
    function initSkillBars() {
        var bars = document.querySelectorAll('.skill-bar[data-skill]');
        var section = document.getElementById('skills');
        var done = false;

        function animatePct(el, target, duration) {
            var start = 0;
            var startTime = null;
            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var ease = 1 - Math.pow(1 - progress, 2);
                el.textContent = Math.floor(ease * target) + '%';
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }

        function run() {
            if (!section || done) return;
            var rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                done = true;
                bars.forEach(function(bar) {
                    var pct = parseInt(bar.getAttribute('data-skill'), 10);
                    var card = bar.closest('.skill-card');
                    var pctEl = card ? card.querySelector('.skill-pct') : null;
                    if (pctEl) pctEl.textContent = '0%';
                    bar.style.width = pct + '%';
                    if (card && pctEl) animatePct(pctEl, pct, 1200);
                });
            }
        }

        window.addEventListener('scroll', run);
        run();
    }

    // ========== Skill card tilt on mouse move ==========
    function initSkillCardTilt() {
        document.querySelectorAll('.skill-card').forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
                var rect = card.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width - 0.5;
                var y = (e.clientY - rect.top) / rect.height - 0.5;
                var tiltX = Math.max(-8, Math.min(8, -y * 12));
                var tiltY = Math.max(-8, Math.min(8, x * 12));
                card.style.transform = 'perspective(800px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) translateY(-6px)';
                card.style.boxShadow = '0 12px 40px rgba(99, 102, 241, 0.2)';
            });
            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }

    // ========== Back to top button ==========
    function initBackToTop() {
        var btn = document.getElementById('backToTop');
        if (!btn) return;

        function toggle() {
            if (window.scrollY > 400) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        }

        window.addEventListener('scroll', toggle);
        toggle();
    }

    // ========== Contact form validation ==========
    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;

        var nameInput = document.getElementById('formName');
        var emailInput = document.getElementById('formEmail');
        var messageInput = document.getElementById('formMessage');
        var nameError = document.getElementById('nameError');
        var emailError = document.getElementById('emailError');
        var messageError = document.getElementById('messageError');

        function validateName() {
            var v = (nameInput && nameInput.value.trim()) || '';
            if (v.length < 2) {
                if (nameError) nameError.textContent = 'Name must be at least 2 characters';
                if (nameInput) { nameInput.classList.add('is-invalid'); shakeEl(nameInput); }
                return false;
            }
            if (nameError) nameError.textContent = '';
            if (nameInput) nameInput.classList.remove('is-invalid');
            return true;
        }

        function validateEmail() {
            var v = (emailInput && emailInput.value.trim()) || '';
            var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!v) {
                if (emailError) emailError.textContent = 'Email is required';
                if (emailInput) { emailInput.classList.add('is-invalid'); shakeEl(emailInput); }
                return false;
            }
            if (!re.test(v)) {
                if (emailError) emailError.textContent = 'Please enter a valid email address';
                if (emailInput) { emailInput.classList.add('is-invalid'); shakeEl(emailInput); }
                return false;
            }
            if (emailError) emailError.textContent = '';
            if (emailInput) emailInput.classList.remove('is-invalid');
            return true;
        }

        function validateMessage() {
            var v = (messageInput && messageInput.value.trim()) || '';
            if (v.length < 10) {
                if (messageError) messageError.textContent = 'Message must be at least 10 characters';
                if (messageInput) { messageInput.classList.add('is-invalid'); shakeEl(messageInput); }
                return false;
            }
            if (messageError) messageError.textContent = '';
            if (messageInput) messageInput.classList.remove('is-invalid');
            return true;
        }

        function shakeEl(el) {
            el.classList.add('shake');
            setTimeout(function() { el.classList.remove('shake'); }, 500);
        }

        if (nameInput) nameInput.addEventListener('blur', validateName);
        if (emailInput) emailInput.addEventListener('blur', validateEmail);
        if (messageInput) messageInput.addEventListener('blur', validateMessage);

        function updateFloatingLabel(input) {
            var wrap = input && input.closest('.form-floating-wrap');
            if (wrap) {
                if (input.value.trim()) wrap.classList.add('has-value');
                else wrap.classList.remove('has-value');
            }
        }
        [nameInput, emailInput, messageInput].forEach(function(input) {
            if (input) {
                input.addEventListener('input', function() { updateFloatingLabel(input); });
                input.addEventListener('change', function() { updateFloatingLabel(input); });
                updateFloatingLabel(input);
            }
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var ok = validateName() && validateEmail() && validateMessage();
            if (!ok) return;

            var btn = document.getElementById('contactSubmitBtn');
            if (!btn) return;

            btn.classList.add('loading');
            btn.classList.remove('success');
            btn.disabled = true;

            setTimeout(function() {
                btn.classList.remove('loading');
                btn.classList.add('success');
                btn.disabled = false;
                form.reset();
                if (nameError) nameError.textContent = '';
                if (emailError) emailError.textContent = '';
                if (messageError) messageError.textContent = '';
                if (nameInput) nameInput.classList.remove('is-invalid');
                if (emailInput) emailInput.classList.remove('is-invalid');
                if (messageInput) messageInput.classList.remove('is-invalid');

                var toast = document.getElementById('toast');
                if (toast) {
                    toast.classList.add('show');
                    setTimeout(function() { toast.classList.remove('show'); }, 3000);
                }

                setTimeout(function() {
                    btn.classList.remove('success');
                }, 2500);
            }, 1200);
        });
    }

    // ========== Download CV ==========
    function initDownloadCV() {
        var btn = document.getElementById('downloadCV');
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                // Replace with your CV file path when ready:
                 window.location.href = 'M_Sumair_CV.zip';

            });
        }
    }
})();
