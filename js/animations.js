document.addEventListener('DOMContentLoaded', () => {

    // nav shadow on scroll
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('nav-scrolled', window.scrollY > 10);
        }, { passive: true });
    }

    // scroll fade-in using IntersectionObserver
    const slideTargets = document.querySelectorAll('.page-section, .contact-section');
    const fadeTargets  = document.querySelectorAll('.content-box');

    slideTargets.forEach(el => el.classList.add('anim-slide'));
    fadeTargets.forEach((el, i) => {
        el.classList.add('anim-fade');
        el.style.transitionDelay = `${i * 0.08}s`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    [...slideTargets, ...fadeTargets].forEach(el => observer.observe(el));
});
