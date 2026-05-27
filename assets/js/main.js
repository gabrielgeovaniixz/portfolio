document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Navbar scroll effect
    const navbar = document.querySelector('#navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
                document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
            } else {
                icon.setAttribute('data-lucide', 'menu');
                document.body.style.overflow = 'auto';
            }
            lucide.createIcons();
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                document.body.style.overflow = 'auto';
                lucide.createIcons();
            }
        });
    });

    // Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.service-card, .project-card, .timeline-item, .education-card, .certificate-card, .about-text, .about-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // Certificate Modal Logic
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');
    const closeBtn = document.getElementsByClassName('close-modal')[0];

    document.querySelectorAll('.view-cert-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const certSrc = this.getAttribute('data-cert');
            const certTitle = this.closest('.certificate-card').querySelector('h3').innerText;
            
            modal.style.display = 'block';
            modalImg.src = certSrc;
            captionText.innerHTML = certTitle;
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Close modal on click outside image
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80; // Navbar height
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetElement.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
});
